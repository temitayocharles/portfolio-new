from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends, Query, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
import secrets
import time
import re
from html import escape
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional, Annotated
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Logging
logging.basicConfig(
    level=os.environ.get("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def _required_env(name: str) -> str:
    """Return a required environment variable or fail application startup."""
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _csv_env(name: str) -> List[str]:
    return [item.strip() for item in os.environ.get(name, "").split(",") if item.strip()]


def _positive_int_env(name: str, default: int) -> int:
    raw_value = os.environ.get(name, str(default)).strip()
    try:
        value = int(raw_value)
    except ValueError as exc:
        raise RuntimeError(f"{name} must be an integer") from exc

    if value <= 0:
        raise RuntimeError(f"{name} must be greater than zero")
    return value


# MongoDB connection
mongo_url = _required_env("MONGO_URL")
db_name = _required_env("DB_NAME")
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Resend setup
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev").strip()
CONTACT_TO_EMAILS = _csv_env("CONTACT_TO_EMAILS")
OWNER_NAME = os.environ.get("OWNER_NAME", "Portfolio Owner").strip()
ADMIN_API_KEY = os.environ.get("ADMIN_API_KEY", "").strip()

CONTACT_RATE_LIMIT_WINDOW_SECONDS = _positive_int_env(
    "CONTACT_RATE_LIMIT_WINDOW_SECONDS",
    60,
)
CONTACT_RATE_LIMIT_MAX_REQUESTS = _positive_int_env(
    "CONTACT_RATE_LIMIT_MAX_REQUESTS",
    5,
)
MAX_CONTACT_LIST_LIMIT = _positive_int_env("MAX_CONTACT_LIST_LIMIT", 500)

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="TCA Portfolio API")
api_router = APIRouter(prefix="/api")

# In-memory contact form rate limit. For multi-instance production deployments,
# use a shared store such as Redis or the platform edge/WAF rate limiter.
_contact_rate_limits: dict[str, List[float]] = {}


# ----- Models -----
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(min_length=5, max_length=4000)

    @field_validator("name", "subject", "message", mode="before")
    @classmethod
    def normalize_text(cls, value):
        if value is None:
            return value
        if not isinstance(value, str):
            return value

        # Remove ASCII control characters except tab, carriage return, and newline.
        cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", value)
        return cleaned.strip()

    @field_validator("email", mode="after")
    @classmethod
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).strip().lower()


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str = ""
    message: str
    email_status: str = "pending"  # pending | sent | failed | skipped
    email_error: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ----- Security helpers -----
async def require_admin_api_key(
    x_admin_api_key: Annotated[Optional[str], Header()] = None,
) -> None:
    """Protect administrative API endpoints with a constant-time API key check."""
    if not ADMIN_API_KEY:
        logger.error("ADMIN_API_KEY is not configured; refusing admin contact access")
        raise HTTPException(
            status_code=503,
            detail="Admin contact retrieval is not configured.",
        )

    if not x_admin_api_key or not secrets.compare_digest(x_admin_api_key, ADMIN_API_KEY):
        raise HTTPException(status_code=401, detail="Unauthorized.")


def _client_identifier(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    if request.client and request.client.host:
        return request.client.host

    return "unknown"


def _enforce_contact_rate_limit(request: Request) -> None:
    identifier = _client_identifier(request)
    now = time.monotonic()
    window_start = now - CONTACT_RATE_LIMIT_WINDOW_SECONDS

    request_times = [
        timestamp
        for timestamp in _contact_rate_limits.get(identifier, [])
        if timestamp >= window_start
    ]

    if len(request_times) >= CONTACT_RATE_LIMIT_MAX_REQUESTS:
        _contact_rate_limits[identifier] = request_times
        raise HTTPException(
            status_code=429,
            detail="Too many contact submissions. Please try again later.",
        )

    request_times.append(now)
    _contact_rate_limits[identifier] = request_times


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), payment=()",
    )
    return response


# ----- Helpers -----
def _build_email_html(payload: ContactCreate) -> str:
    safe_name = escape(payload.name)
    safe_email = escape(str(payload.email))
    safe_subject = escape(payload.subject or "(no subject)")
    safe_message = escape(payload.message).replace("\n", "<br/>")

    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f14;padding:24px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#e2e8f0">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0e1620;border:1px solid #1f2937;border-radius:12px;overflow:hidden">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #1f2937">
            <div style="font-family:monospace;font-size:11px;letter-spacing:2px;color:#5eead4;text-transform:uppercase">New Portfolio Inquiry</div>
            <div style="font-size:20px;font-weight:600;color:#f1f5f9;margin-top:6px">{safe_name} just reached out</div>
          </td></tr>
          <tr><td style="padding:24px 28px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px">From</td></tr>
              <tr><td style="padding:0 0 14px 0;font-size:15px;color:#e2e8f0">{safe_name} &lt;<a href="mailto:{safe_email}" style="color:#5eead4;text-decoration:none">{safe_email}</a>&gt;</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px">Subject</td></tr>
              <tr><td style="padding:0 0 14px 0;font-size:15px;color:#e2e8f0">{safe_subject}</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px">Message</td></tr>
              <tr><td style="padding:0;font-size:15px;color:#cbd5e1;line-height:1.6;white-space:pre-wrap">{safe_message}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:16px 28px;border-top:1px solid #1f2937;font-size:11px;color:#64748b;font-family:monospace">
            Sent from {escape(OWNER_NAME)}'s portfolio contact form
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


def _build_email_text(payload: ContactCreate) -> str:
    return (
        f"New portfolio inquiry\n\n"
        f"From: {payload.name} <{payload.email}>\n"
        f"Subject: {payload.subject or '(no subject)'}\n\n"
        f"Message:\n{payload.message}\n"
    )


async def _send_resend_email(payload: ContactCreate) -> dict:
    """Send notification email via Resend. Raises on provider failure."""
    if not RESEND_API_KEY or not CONTACT_TO_EMAILS:
        return {"status": "skipped", "reason": "Resend not configured"}

    params = {
        "from": f"{OWNER_NAME} Portfolio <{SENDER_EMAIL}>",
        "to": CONTACT_TO_EMAILS,
        "reply_to": str(payload.email),
        "subject": f"Portfolio inquiry: {payload.subject or payload.name}",
        "html": _build_email_html(payload),
        "text": _build_email_text(payload),
    }
    result = await asyncio.to_thread(resend.Emails.send, params)
    return {"status": "sent", "id": result.get("id") if isinstance(result, dict) else None}


def _cors_origins() -> List[str]:
    configured_origins = _csv_env("CORS_ORIGINS")
    if configured_origins:
        environment = os.environ.get("ENVIRONMENT", "development").strip().lower()
        if environment == "production" and "*" in configured_origins:
            raise RuntimeError("CORS_ORIGINS cannot contain '*' in production")
        return configured_origins

    fallback_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    fallback_origins.extend(_csv_env("FRONTEND_URL"))
    fallback_origins.extend(_csv_env("PUBLIC_FRONTEND_URL"))

    # Preserve order while de-duplicating.
    return list(dict.fromkeys(origin for origin in fallback_origins if origin))


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "Portfolio API up", "owner": OWNER_NAME}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "resend_configured": bool(RESEND_API_KEY),
        "recipients": len(CONTACT_TO_EMAILS),
        "admin_contact_listing_configured": bool(ADMIN_API_KEY),
        "contact_rate_limit": {
            "window_seconds": CONTACT_RATE_LIMIT_WINDOW_SECONDS,
            "max_requests": CONTACT_RATE_LIMIT_MAX_REQUESTS,
        },
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [StatusCheck(**row) for row in rows]


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactCreate, request: Request):
    _enforce_contact_rate_limit(request)
    msg = ContactMessage(**payload.model_dump())

    try:
        result = await _send_resend_email(payload)
        if result.get("status") == "sent":
            msg.email_status = "sent"
        elif result.get("status") == "skipped":
            msg.email_status = "skipped"
            msg.email_error = result.get("reason")
    except Exception:
        logger.exception("Resend email failed")
        msg.email_status = "failed"
        msg.email_error = "Email delivery failed. Message was saved for follow-up."

    try:
        await db.contact_messages.insert_one(msg.model_dump())
    except Exception as exc:
        logger.exception("Mongo insert failed")
        raise HTTPException(status_code=500, detail="Storage failed.") from exc

    if msg.email_status == "failed":
        logger.warning("Contact saved but email delivery failed for message id %s", msg.id)
    return msg


@api_router.get(
    "/contact",
    response_model=List[ContactMessage],
    dependencies=[Depends(require_admin_api_key)],
)
async def list_contact_messages(
    limit: int = Query(default=100, ge=1, le=MAX_CONTACT_LIST_LIMIT),
):
    rows = (
        await db.contact_messages.find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    return [ContactMessage(**row) for row in rows]


app.include_router(api_router)

cors_origins = _cors_origins()
app.add_middleware(
    CORSMiddleware,
    allow_credentials="*" not in cors_origins,
    allow_origins=cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-Admin-API-Key"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
