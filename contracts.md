# Portfolio API Contracts

## Backend

- **Tech**: FastAPI, Motor, MongoDB, Resend
- **Base URL**: `${REACT_APP_BACKEND_URL}/api`
- **Public endpoints**: `/api`, `/api/health`, `/api/contact`, `/api/status`
- **Admin endpoints**: `/api/contact` with `GET` method

## Security Controls

### CORS

Production deployments must set `CORS_ORIGINS` to an explicit comma-separated list of trusted frontend origins.

Example:

```bash
CORS_ORIGINS=https://temitayocharles.online,https://www.temitayocharles.online
ENVIRONMENT=production
```

`CORS_ORIGINS=*` is rejected when `ENVIRONMENT=production`.

If `CORS_ORIGINS` is not set, the backend only allows local development origins and optional values from `FRONTEND_URL` and `PUBLIC_FRONTEND_URL`.

### Admin contact retrieval

`GET /api/contact` is protected by the `X-Admin-API-Key` header.

Required backend environment variable:

```bash
ADMIN_API_KEY=<strong-random-secret>
```

Example request:

```bash
curl -s \
  -H "X-Admin-API-Key: ${ADMIN_API_KEY}" \
  "${REACT_APP_BACKEND_URL}/api/contact?limit=25"
```

Responses:

- `200`: authorized request, returns recent contact messages.
- `401`: missing or invalid admin key.
- `503`: `ADMIN_API_KEY` is not configured, so admin retrieval is intentionally disabled.

### Contact form rate limiting

`POST /api/contact` applies an in-memory per-client rate limit.

Environment variables:

```bash
CONTACT_RATE_LIMIT_WINDOW_SECONDS=60
CONTACT_RATE_LIMIT_MAX_REQUESTS=5
```

For multi-instance production deployments, move this control to Redis, a gateway, or a WAF so limits are shared across replicas.

### Input and email hardening

Contact form text fields are stripped of unsafe ASCII control characters before processing. HTML email rendering escapes user-controlled values before interpolation into the email template.

Email provider errors are logged server-side and returned to users as generic delivery status messages. This avoids exposing provider internals through the public contact form response.

## Endpoints

### GET /api

Basic API status.

Response 200:

```json
{ "message": "Portfolio API up", "owner": "Portfolio Owner" }
```

### GET /api/health

Reports API status and configuration flags.

Response 200:

```json
{
  "status": "ok",
  "resend_configured": true,
  "recipients": 2,
  "admin_contact_listing_configured": true,
  "contact_rate_limit": {
    "window_seconds": 60,
    "max_requests": 5
  }
}
```

### POST /api/contact

Submit contact form. Stores in MongoDB and attempts to send a Resend email notification to the owner.

Request:

```json
{
  "name": "string, 1-120 characters",
  "email": "valid email address",
  "subject": "string, 0-200 characters",
  "message": "string, 5-4000 characters"
}
```

Response 200:

```json
{
  "id": "uuid",
  "name": "Example User",
  "email": "example@company.com",
  "subject": "Platform engineering engagement",
  "message": "Hello, I would like to discuss...",
  "email_status": "sent",
  "email_error": null,
  "created_at": "ISO-8601 timestamp"
}
```

Possible `email_status` values:

- `sent`: message persisted and email notification sent.
- `skipped`: message persisted but Resend is not configured.
- `failed`: message persisted but email delivery failed.

Responses:

- `200`: message accepted and persisted.
- `422`: validation failed.
- `429`: rate limit exceeded.
- `500`: message could not be stored.

### GET /api/contact?limit=100

Admin-only endpoint. Returns recent messages sorted by `created_at` descending.

Required header:

```http
X-Admin-API-Key: <ADMIN_API_KEY>
```

Query parameters:

- `limit`: integer from `1` to `MAX_CONTACT_LIST_LIMIT`, default `100`.

Response 200:

```json
[
  {
    "id": "uuid",
    "name": "Example User",
    "email": "example@company.com",
    "subject": "Platform engineering engagement",
    "message": "Hello, I would like to discuss...",
    "email_status": "sent",
    "email_error": null,
    "created_at": "ISO-8601 timestamp"
  }
]
```

### POST /api/status

Legacy status check endpoint.

Request:

```json
{ "client_name": "string" }
```

Response 200:

```json
{ "id": "uuid", "client_name": "string", "timestamp": "ISO-8601 timestamp" }
```

### GET /api/status

Returns recent legacy status checks.

Response 200:

```json
[
  { "id": "uuid", "client_name": "string", "timestamp": "ISO-8601 timestamp" }
]
```

## Backend environment variables

Required:

```bash
MONGO_URL=mongodb://...
DB_NAME=portfolio
```

Recommended for production:

```bash
ENVIRONMENT=production
CORS_ORIGINS=https://temitayocharles.online,https://www.temitayocharles.online
ADMIN_API_KEY=<strong-random-secret>
RESEND_API_KEY=<resend-api-key>
SENDER_EMAIL=contact@temitayocharles.online
CONTACT_TO_EMAILS=tayocharlesaki@gmail.com,temitayo_charles@yahoo.com
OWNER_NAME=Temitayo Charles Akinniranye
CONTACT_RATE_LIMIT_WINDOW_SECONDS=60
CONTACT_RATE_LIMIT_MAX_REQUESTS=5
MAX_CONTACT_LIST_LIMIT=500
LOG_LEVEL=INFO
```

## Mock data to backend integration

`frontend/src/mock.js` currently keeps profile, skills, experience, projects, writings, and testimonials as static presentation data. The contact form posts to `/api/contact` through `${REACT_APP_BACKEND_URL}/api`.

## Resend operational note

With `onboarding@resend.dev`, Resend sandbox delivery is restricted. Use a verified domain sender such as `contact@temitayocharles.online` for production delivery to multiple recipients.
