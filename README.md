# TCA Portfolio

Full-stack professional portfolio platform for Temitayo Charles Akinniranye, focused on Cloud Engineering, DevOps, Platform Engineering, Kubernetes, GitOps, DevSecOps, SRE practices, FinOps awareness, AI infrastructure, automation, observability, and production operations.

This is not intended to be only a static resume site. The platform is designed to demonstrate practical engineering maturity through the application itself and the infrastructure used to operate it.

## Architecture

| Layer | Path / System | Stack / Platform |
| --- | --- | --- |
| Frontend | `frontend/` | React, CRACO, React Router, Tailwind CSS, Radix UI, Axios |
| Backend | `backend/` | FastAPI, Motor, MongoDB, Pydantic, Resend |
| Frontend hosting | Vercel | Static React build, preview and production deployments |
| Backend runtime | Homelab K3s | Always-on FastAPI container managed through GitOps |
| Container registry | GHCR | `ghcr.io/temitayocharles/portfolio-new-api` |
| Database | MongoDB Atlas | Contact submission persistence |
| Email | Resend | Contact-form email delivery |
| Secrets | Vault + External Secrets Operator | Runtime secret delivery to Kubernetes |
| Routing | Cloudflare Tunnel + Envoy Gateway | Public backend API exposure |
| API contract | `contracts.md` | Endpoint and environment documentation |
| Verification | `backend_test.py` | API smoke and security verification script |

## Current Deployment Decision

The frontend should run on Vercel. The backend should run on the homelab K3s cluster rather than Render Free or Vercel serverless.

Reason: the homelab backend stays on, avoids free-tier cold starts, and demonstrates the same platform engineering practices the portfolio is meant to showcase.

Target flow:

```text
Vercel frontend
  -> https://api.temitayocharles.online
  -> Cloudflare Tunnel
  -> Envoy Gateway
  -> portfolio-api Kubernetes Service
  -> FastAPI backend Pod
  -> MongoDB Atlas and Resend
```

Render configuration may remain as fallback only. It is not the preferred production backend target.

## Documentation

| Document | Purpose |
| --- | --- |
| `docs/architecture.md` | Target platform architecture and operating model |
| `docs/deployment.md` | Vercel and homelab K3s deployment runbook |
| `docs/security.md` | Security model, controls, approval gates, launch checklist |
| `docs/content-strategy.md` | Brand, AI positioning, project taxonomy, case-study structure |
| `docs/implementation-roadmap.md` | Phased delivery roadmap |
| `docs/image-strategy.md` | Headshot and visual asset strategy |
| `docs/task-board.md` | Implementation issue map and execution order |
| `docs/launch-checklist.md` | Final production launch checklist |
| `docs/agent-execution-log.md` | Material change execution log |
| `docs/linkedin-drafts.md` | LinkedIn drafts, not for publishing without approval |
| `docs/github-profile-readme.md` | GitHub profile README draft |

## Backend Security Posture

The contact workflow is intentionally public only for submission. Administrative message retrieval is protected.

Implemented controls:

- `GET /api/contact` requires `X-Admin-API-Key`.
- Public contact submissions are rate-limited per client.
- Production CORS rejects wildcard origins when `ENVIRONMENT=production`.
- Contact email HTML escapes user-controlled form values before rendering.
- Provider failures are logged server-side and exposed only as generic delivery status text.
- Baseline HTTP response headers are added for content type, framing, referrer, and permissions policy hardening.
- Required database settings fail fast at startup.

## Required Backend Environment

Copy `backend/.env.example` to `backend/.env` for local development and fill in the values.

Required:

```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio
```

Recommended for production:

```bash
ENVIRONMENT=production
CORS_ORIGINS=https://temitayocharles.online,https://www.temitayocharles.online,https://<vercel-production-domain>
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

For homelab production, secret values must come from Vault through External Secrets Operator. Do not commit secret values to Git.

## Required Frontend Environment

Copy `frontend/.env.example` to `frontend/.env` and set:

```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

For production Vercel:

```bash
REACT_APP_BACKEND_URL=https://api.temitayocharles.online
```

Do not include `/api` at the end. The frontend automatically posts contact form submissions to `${REACT_APP_BACKEND_URL}/api/contact`.

## Local Runbook

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

## Backend Container

Build locally from the repository root:

```bash
docker build -f backend/Dockerfile -t portfolio-new-api:local backend
```

Run locally with an env file:

```bash
docker run --rm \
  --env-file backend/.env \
  -p 8001:8001 \
  portfolio-new-api:local
```

## Verification

Run the API verification script after deployment:

```bash
PORTFOLIO_API_BASE_URL=https://your-backend-origin/api \
ADMIN_API_KEY=<same-value-as-backend> \
python backend_test.py
```

If `ADMIN_API_KEY` is not supplied locally, the script still verifies that unauthenticated contact listing is blocked.

## Operational Notes

- Use a verified Resend domain sender for production. The sandbox sender is restricted.
- For horizontally scaled backend deployments, move contact rate limiting from in-memory storage to Redis, a gateway, or a WAF.
- Keep `GET /api/contact` private. It contains user-submitted contact data.
- Keep frontend portfolio content in `frontend/src/mock.js` until a Git-managed content model, CMS, or structured content source is introduced.
- Do not modify Cloudflare public hostnames, DNS records, production secrets, or external social content without explicit approval.
