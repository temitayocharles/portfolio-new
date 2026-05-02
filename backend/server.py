from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Resend setup
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
CONTACT_TO_EMAILS = [
    e.strip()
    for e in os.environ.get("CONTACT_TO_EMAILS", "").split(",")
    if e.strip()
]
OWNER_NAME = os.environ.get("OWNER_NAME", "Portfolio Owner")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="TCA Portfolio API")
api_router = APIRouter(prefix="/api")

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


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


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str = ""
    message: str
    email_status: str = "pending"  # pending | sent | failed | skipped
    email_error: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ----- Helpers -----
def _build_email_html(payload: ContactCreate) -> str:
    subj = payload.subject or "(no subject)"
    safe_msg = payload.message.replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f14;padding:24px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#e2e8f0">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0e1620;border:1px solid #1f2937;border-radius:12px;overflow:hidden">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #1f2937">
            <div style="font-family:monospace;font-size:11px;letter-spacing:2px;color:#5eead4;text-transform:uppercase">New Portfolio Inquiry</div>
            <div style="font-size:20px;font-weight:600;color:#f1f5f9;margin-top:6px">{payload.name} just reached out</div>
          </td></tr>
          <tr><td style="padding:24px 28px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px">From</td></tr>
              <tr><td style="padding:0 0 14px 0;font-size:15px;color:#e2e8f0">{payload.name} &lt;<a href="mailto:{payload.email}" style="color:#5eead4;text-decoration:none">{payload.email}</a>&gt;</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px">Subject</td></tr>
              <tr><td style="padding:0 0 14px 0;font-size:15px;color:#e2e8f0">{subj}</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px">Message</td></tr>
              <tr><td style="padding:0;font-size:15px;color:#cbd5e1;line-height:1.6;white-space:pre-wrap">{safe_msg}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:16px 28px;border-top:1px solid #1f2937;font-size:11px;color:#64748b;font-family:monospace">
            Sent from {OWNER_NAME}'s portfolio contact form
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
    """Send notification email via Resend. Raises on failure."""
    if not RESEND_API_KEY or not CONTACT_TO_EMAILS:
        return {"status": "skipped", "reason": "Resend not configured"}

    params = {
        "from": f"{OWNER_NAME} Portfolio <{SENDER_EMAIL}>",
        "to": CONTACT_TO_EMAILS,
        "reply_to": payload.email,
        "subject": f"Portfolio inquiry: {payload.subject or payload.name}",
        "html": _build_email_html(payload),
        "text": _build_email_text(payload),
    }
    result = await asyncio.to_thread(resend.Emails.send, params)
    return {"status": "sent", "id": result.get("id") if isinstance(result, dict) else None}


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
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.dict())
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [StatusCheck(**r) for r in rows]


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.dict())

    # Try sending email first, then persist with status
    try:
        result = await _send_resend_email(payload)
        if result.get("status") == "sent":
            msg.email_status = "sent"
        elif result.get("status") == "skipped":
            msg.email_status = "skipped"
            msg.email_error = result.get("reason")
    except Exception as e:
        logger.exception("Resend email failed")
        msg.email_status = "failed"
        msg.email_error = str(e)[:500]

    try:
        await db.contact_messages.insert_one(msg.dict())
    except Exception as e:
        logger.exception("Mongo insert failed")
        # Still return msg so caller knows email might have been sent
        raise HTTPException(status_code=500, detail=f"Storage failed: {e}")

    if msg.email_status == "failed":
        # Persisted successfully but email could not be delivered (e.g. Resend sandbox).
        # Return 200 so the UX is graceful; frontend reads email_status to decide messaging.
        logger.warning("Contact saved but email failed: %s", msg.email_error)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = 100):
    rows = (
        await db.contact_messages.find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    return [ContactMessage(**r) for r in rows]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
