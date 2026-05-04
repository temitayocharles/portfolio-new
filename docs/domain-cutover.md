# Production Domain Cutover Runbook

## Objective

Replace the deprecated portfolio currently using `temitayocharles.online` with the new `portfolio-new` platform.

Target public routing:

```text
https://temitayocharles.online
  -> Vercel frontend

https://www.temitayocharles.online
  -> Vercel frontend

https://api.temitayocharles.online
  -> Cloudflare Tunnel
  -> Envoy Gateway
  -> homelab K3s portfolio-api backend
```

## Current Repository State

The repository already contains:

- `vercel.json` for Vercel frontend build configuration.
- Backend Dockerfile and GHCR workflow.
- Homelab GitOps ApplicationSet and values in `homelab-gitops`.
- Helm chart in `helm-charts`.
- Vault/ESO wiring in `vault-ops`.

## Vercel Frontend Import

The Vercel connector available in ChatGPT does not expose project import, domain attachment, or environment variable mutation. Import the project manually in Vercel.

Use these exact settings:

| Setting | Value |
| --- | --- |
| Team | `Charlie's projects` |
| Repository | `temitayocharles/portfolio-new` |
| Root Directory | repository root |
| Install Command | `cd frontend && yarn install` |
| Build Command | `cd frontend && yarn build` |
| Output Directory | `frontend/build` |

Required Vercel environment variable:

```bash
REACT_APP_BACKEND_URL=https://api.temitayocharles.online
```

Do not include `/api` at the end. The frontend already calls `/api/contact`.

## Vercel Domains

Attach these domains to the Vercel project:

```text
temitayocharles.online
www.temitayocharles.online
```

After Vercel displays the required DNS records, update Cloudflare DNS accordingly.

Typical Vercel domain records are usually one apex `A` record and one `www` `CNAME`, but use the exact values shown by Vercel for this project.

## Cloudflare Frontend DNS

In Cloudflare, remove or replace records pointing `temitayocharles.online` and `www.temitayocharles.online` to the deprecated portfolio.

Add the Vercel-provided records for:

```text
temitayocharles.online
www.temitayocharles.online
```

Recommended behavior:

- Keep Cloudflare proxy enabled if Vercel validates successfully with proxied records.
- If Vercel domain verification fails, temporarily set the records to DNS-only, complete verification, then re-enable proxy if desired.

## Cloudflare Tunnel API Hostname

Create or update the Cloudflare Tunnel public hostname for the backend API.

| Field | Value |
| --- | --- |
| Public hostname | `api.temitayocharles.online` |
| Service type | `HTTP` |
| Service URL | `envoy-envoy-gateway-system-homelab-gateway-00f55f79.envoy-gateway-system.svc.cluster.local:80` |

The cluster-side HTTPRoute is already declared in `homelab-gitops`:

```text
argocd/platform/resources/envoy-gateway/httproute-portfolio-api.yaml
```

It routes host `api.temitayocharles.online` to the Kubernetes Service:

```text
portfolio/portfolio-api:8080
```

## Vault Secret Seeding

Seed this Vault path before expecting the backend pod to become healthy:

```text
temitayo/staging/workloads/portfolio/api
```

Required keys:

```bash
MONGO_URL=<mongodb-atlas-connection-string>
ADMIN_API_KEY=<strong-random-secret>
RESEND_API_KEY=<resend-api-key>
SENDER_EMAIL=contact@temitayocharles.online
CONTACT_TO_EMAILS=tayocharlesaki@gmail.com,temitayo_charles@yahoo.com
```

Generate the admin key with:

```bash
openssl rand -hex 32
```

Do not commit these values to Git.

## Required Runtime Checks

### Backend health

```bash
curl -fsS https://api.temitayocharles.online/api/health
```

Expected result includes:

```json
{
  "status": "ok"
}
```

### Contact submission

```bash
curl -fsS -X POST "https://api.temitayocharles.online/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cutover Test",
    "email": "test@example.com",
    "subject": "Portfolio cutover verification",
    "message": "This is a production cutover verification message."
  }'
```

Expected result includes one of:

```text
email_status=sent
email_status=skipped
email_status=failed
```

`sent` is the production target. `skipped` means Resend is not configured. `failed` means the message persisted but delivery failed.

### Admin contact retrieval

```bash
curl -fsS \
  -H "X-Admin-API-Key: <ADMIN_API_KEY>" \
  "https://api.temitayocharles.online/api/contact?limit=5"
```

Unauthenticated requests to this endpoint must return `401` or `503`.

## Final Launch Verification

Before public announcement:

- Vercel production deployment is live.
- Apex and `www` domains load the new portfolio.
- API hostname returns healthy backend response.
- Contact form works from the live frontend.
- Admin contact endpoint is protected.
- No deprecated portfolio content remains at `temitayocharles.online`.
- LinkedIn and GitHub profile drafts are reviewed before publication.

## Production Cutover Completion Record

Date: 2026-05-04

Final production endpoints:
- Frontend apex: https://temitayocharles.online
- Frontend www redirect: https://www.temitayocharles.online -> https://temitayocharles.online
- API health: https://api.temitayocharles.online/api/health
- Contact endpoint: POST https://api.temitayocharles.online/api/contact
- Admin contact listing: GET https://api.temitayocharles.online/api/contact?limit=5 with X-Admin-API-Key

Final platform architecture:
- Frontend: Netlify, proxied by Cloudflare
- API: Cloudflare Tunnel -> Envoy Gateway -> K3s portfolio-api service
- Secrets: Vault KV -> External Secrets Operator -> Kubernetes Secret
- Database: MongoDB Atlas
- Email: Resend
- GitOps: Argo CD

Final validation:
- Apex frontend returned HTTP 200
- WWW returned HTTP 301 to apex
- API health returned HTTP 200
- Contact POST returned HTTP 200
- Resend email delivery returned sent
- MongoDB ping returned ok
- Admin contact listing returned HTTP 200
- portfolio-networking Argo CD Application reached Synced / Healthy

Important follow-up:
- Backend image currently uses mutable tag ghcr.io/temitayocharles/portfolio-new-api:main
- Move to immutable image tags or digests in the next hardening cycle
- MongoDB Atlas egress NetworkPolicy uses static shard IPs and must be reviewed if Atlas shard IPs change

## Production Cutover Completion Record

Date: 2026-05-04

Final production endpoints:
- Frontend apex: https://temitayocharles.online
- Frontend www redirect: https://www.temitayocharles.online -> https://temitayocharles.online
- API health: https://api.temitayocharles.online/api/health
- Contact endpoint: POST https://api.temitayocharles.online/api/contact
- Admin contact listing: GET https://api.temitayocharles.online/api/contact?limit=5 with X-Admin-API-Key

Final platform architecture:
- Frontend: Netlify, proxied by Cloudflare
- API: Cloudflare Tunnel -> Envoy Gateway -> K3s portfolio-api service
- Secrets: Vault KV -> External Secrets Operator -> Kubernetes Secret
- Database: MongoDB Atlas
- Email: Resend
- GitOps: Argo CD

Final validation:
- Apex frontend returned HTTP 200
- WWW returned HTTP 301 to apex
- API health returned HTTP 200
- Contact POST returned HTTP 200
- Resend email delivery returned sent
- MongoDB ping returned ok
- Admin contact listing returned HTTP 200
- portfolio-networking Argo CD Application reached Synced / Healthy

Important follow-up:
- Backend image currently uses mutable tag ghcr.io/temitayocharles/portfolio-new-api:main
- Move to immutable image tags or digests in the next hardening cycle
- MongoDB Atlas egress NetworkPolicy uses static shard IPs and must be reviewed if Atlas shard IPs change

## Production Cutover Completion Record

Date: 2026-05-04

Final production endpoints:
- Frontend apex: https://temitayocharles.online
- Frontend www redirect: https://www.temitayocharles.online -> https://temitayocharles.online
- API health: https://api.temitayocharles.online/api/health
- Contact endpoint: POST https://api.temitayocharles.online/api/contact
- Admin contact listing: GET https://api.temitayocharles.online/api/contact?limit=5 with X-Admin-API-Key

Final platform architecture:
- Frontend: Netlify, proxied by Cloudflare
- API: Cloudflare Tunnel -> Envoy Gateway -> K3s portfolio-api service
- Secrets: Vault KV -> External Secrets Operator -> Kubernetes Secret
- Database: MongoDB Atlas
- Email: Resend
- GitOps: Argo CD

Final validation:
- Apex frontend returned HTTP 200
- WWW returned HTTP 301 to apex
- API health returned HTTP 200
- Contact POST returned HTTP 200
- Resend email delivery returned sent
- MongoDB ping returned ok
- Admin contact listing returned HTTP 200
- portfolio-networking Argo CD Application reached Synced / Healthy

Important follow-up:
- Backend image currently uses mutable tag ghcr.io/temitayocharles/portfolio-new-api:main
- Move to immutable image tags or digests in the next hardening cycle
- MongoDB Atlas egress NetworkPolicy uses static shard IPs and must be reviewed if Atlas shard IPs change
