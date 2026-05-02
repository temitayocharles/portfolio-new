# Portfolio API Contracts

## Backend
- **Tech**: FastAPI + Motor (MongoDB) + Resend
- **Base URL**: `${REACT_APP_BACKEND_URL}/api`

### Endpoints

#### POST /api/contact
Submit contact form. Stores in MongoDB + sends Resend email to owner.

Request:
```json
{ "name": "string (1-120)", "email": "EmailStr", "subject": "string (0-200)", "message": "string (5-4000)" }
```
Response 200:
```json
{ "id": "uuid", "name": "...", "email": "...", "subject": "...", "message": "...", "email_status": "sent|skipped|failed", "email_error": null, "created_at": "ISO" }
```
Response 502: saved but email failed. Response 422: validation. Response 500: storage failed.

#### GET /api/contact?limit=100
List recent messages (admin/inspection). Returns array sorted by created_at desc.

#### GET /api/health
Reports `resend_configured` and recipient count.

## Mock data → Backend integration
- `mock.js` keeps profile, skills, experience, projects, testimonials (presentation data) — **stays static**.
- Contact form: previously stored in `localStorage` (mock). Now POSTs to `/api/contact`.
- Toast messages reflect server response (sent / failed).

## Env (backend/.env)
- `RESEND_API_KEY` — Resend key
- `SENDER_EMAIL` — `onboarding@resend.dev` (sandbox) or verified domain sender
- `CONTACT_TO_EMAILS` — comma-separated recipient list
- `OWNER_NAME` — display name in email subject/header

## Sandbox limitation
With `onboarding@resend.dev`, Resend only delivers to the email address that owns the Resend account. Verify a domain in Resend to deliver to multiple recipients.
