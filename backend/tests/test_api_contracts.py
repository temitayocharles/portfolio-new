import importlib
import os
import sys
from pathlib import Path

from fastapi.testclient import TestClient

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "portfolio_ci")
os.environ.setdefault("ADMIN_API_KEY", "ci-admin-key")
os.environ.setdefault("CONTACT_RATE_LIMIT_WINDOW_SECONDS", "60")
os.environ.setdefault("CONTACT_RATE_LIMIT_MAX_REQUESTS", "5")
os.environ.setdefault("MAX_CONTACT_LIST_LIMIT", "500")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
os.environ.setdefault("LOG_LEVEL", "INFO")

server = importlib.import_module("server")
client = TestClient(server.app)


def test_health_contract_exposes_runtime_controls():
    response = client.get("/api/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert "resend_configured" in body
    assert "admin_contact_listing_configured" in body
    assert body["contact_rate_limit"]["window_seconds"] == 60
    assert body["contact_rate_limit"]["max_requests"] == 5
    assert body["content"]["configured"] is True


def test_root_contract_identifies_api():
    response = client.get("/api/")

    assert response.status_code == 200
    body = response.json()
    assert body["message"] == "Portfolio API up"
    assert "owner" in body


def test_content_contract_returns_required_sections():
    response = client.get("/api/content")

    assert response.status_code == 200
    body = response.json()
    for section in ("profile", "projects", "projectArchitectures", "writings", "testimonials"):
        assert section in body
    assert body["profile"]["name"]
    assert isinstance(body["projects"], list)


def test_content_summary_exposes_operational_counts():
    response = client.get("/api/content/summary")

    assert response.status_code == 200
    body = response.json()
    assert body["project_count"] >= 1
    assert body["architecture_count"] >= 1
    assert "projects" in body["sections"]


def test_content_section_endpoint_returns_single_section():
    response = client.get("/api/content/profile")

    assert response.status_code == 200
    assert response.json()["name"]


def test_content_section_endpoint_rejects_unknown_section():
    response = client.get("/api/content/not-a-real-section")

    assert response.status_code == 404


def test_contact_rejects_invalid_payload_before_delivery_or_persistence():
    response = client.post(
        "/api/contact",
        json={
            "name": "",
            "email": "not-an-email",
            "subject": "",
            "message": "bad",
        },
    )

    assert response.status_code == 422


def test_admin_contact_listing_requires_api_key():
    response = client.get("/api/contact")

    assert response.status_code == 401
