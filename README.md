# TCA Portfolio

Full-stack portfolio application for Temitayo Charles Akinniranye, focused on DevOps, Cloud Platform Engineering, Kubernetes, GitOps, DevSecOps, SRE, FinOps, and AI infrastructure.

## Architecture

| Layer | Path | Stack |
| --- | --- | --- |
| Frontend | `frontend/` | React, CRACO, React Router, Tailwind CSS, Radix UI, Axios |
| Backend | `backend/` | FastAPI, Motor, MongoDB, Pydantic, Resend |
| API contract | `contracts.md` | Endpoint and environment documentation |
| Verification | `backend_test.py` | API smoke and security verification script |

## Backend security posture

The contact workflow is intentionally public only for submission. Administrative message retrieval is protected.

Implemented controls:

- `GET /api/contact` requires `X-Admin-API-Key`.
- Public contact submissions are rate-limited per client.
- Production CORS rejects wildcard origins when `ENVIRONMENT=production`.
- Contact email HTML escapes user-controlled form values before rendering.
- Provider failures are logged server-side and exposed only as generic delivery status text.
- Baseline HTTP response headers are added for content type, framing, referrer, and permissions policy hardening.
- Required database settings fail fast at startup.

## Required backend environment

Copy `backend/.env.example` to `backend/.env` for local development and fill in the values.

Required:

```bash
MONGO_URL=mongodb://localhost:27017
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

Generate the admin key with:

```bash
openssl rand -hex 32
```

## Required frontend environment

Copy `frontend/.env.example` to `frontend/.env` and set:

```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

The frontend automatically posts contact form submissions to `${REACT_APP_BACKEND_URL}/api/contact`.

## Local runbook

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend

```bash
cd frontend
yarn install
yarn start
```

## Verification

Run the API verification script after deployment:

```bash
PORTFOLIO_API_BASE_URL=https://your-backend-origin/api \
ADMIN_API_KEY=<same-value-as-backend> \
python backend_test.py
```

If `ADMIN_API_KEY` is not supplied locally, the script still verifies that unauthenticated contact listing is blocked.

## Operational notes

- Use a verified Resend domain sender for production. The sandbox sender is restricted.
- For horizontally scaled deployments, move the contact rate limit from in-memory storage to Redis, a gateway, or a WAF.
- Keep `GET /api/contact` private. It contains user-submitted contact data.
- Keep frontend portfolio content in `frontend/src/mock.js` until a CMS or backend content model is introduced.
