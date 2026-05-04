# Deployment Runbook

## Deployment Model

The production deployment model is split intentionally:

| Component | Platform | Reason |
| --- | --- | --- |
| Frontend | Vercel | Fast static delivery, preview deployments, simple domain management. |
| Backend API | Homelab K3s | Always-on runtime, no free-tier cold starts, demonstrates platform engineering capability. |
| Database | MongoDB Atlas | Managed persistence for contact submissions. |
| Email | Resend | Transactional contact-form email delivery. |
| Secrets | Vault + External Secrets Operator | GitOps-compatible secret isolation. |
| Public backend routing | Cloudflare Tunnel + Envoy Gateway | Public HTTPS exposure without directly exposing the home network. |

## Frontend Deployment: Vercel

Repository:

```text
temitayocharles/portfolio-new
```

Vercel configuration file:

```text
vercel.json
```

Current Vercel settings:

```json
{
  "installCommand": "cd frontend && yarn install",
  "buildCommand": "cd frontend && yarn build",
  "outputDirectory": "frontend/build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Required frontend environment variable:

```bash
REACT_APP_BACKEND_URL=https://api.temitayocharles.online
```

Do not include `/api` at the end. The frontend contact form appends `/api/contact`.

## Backend Deployment: Homelab K3s

### Target Namespace

Recommended namespace:

```text
portfolio
```

### Target Service Name

Recommended service name:

```text
portfolio-api
```

### Target Container Image

Recommended image:

```text
ghcr.io/temitayocharles/portfolio-new-api:<git-sha>
```

### Required Application Port

The FastAPI app should listen on the Kubernetes-provided container port:

```text
8001
```

The Kubernetes Service should expose:

```text
port: 8080
targetPort: http
```

The container port should be named:

```text
http
```

## Backend Environment Variables

### ConfigMap Values

These are non-secret and can be managed in Helm values:

```bash
ENVIRONMENT=production
LOG_LEVEL=INFO
DB_NAME=portfolio
OWNER_NAME=Temitayo Charles Akinniranye
CONTACT_RATE_LIMIT_WINDOW_SECONDS=60
CONTACT_RATE_LIMIT_MAX_REQUESTS=5
MAX_CONTACT_LIST_LIMIT=500
CORS_ORIGINS=https://temitayocharles.online,https://www.temitayocharles.online,https://<vercel-production-domain>
```

### Secret Values

These must come from Vault through External Secrets Operator:

```bash
MONGO_URL=<mongodb-atlas-connection-string>
ADMIN_API_KEY=<strong-random-secret>
RESEND_API_KEY=<resend-api-key>
SENDER_EMAIL=contact@temitayocharles.online
CONTACT_TO_EMAILS=tayocharlesaki@gmail.com,temitayo_charles@yahoo.com
```

Recommended Vault path:

```text
temitayo/staging/workloads/portfolio/api
```

## Required Repository Work Before Backend Deployment

### 1. Application Repository

In `portfolio-new`, add:

```text
backend/Dockerfile
.github/workflows/backend-ci-ghcr.yml
```

The workflow should call:

```text
temitayocharles/shared-workflows/.github/workflows/service-python-ci-ghcr.yml@main
```

Expected workflow inputs:

```yaml
python-version: "3.11"
requirements-file: "backend/requirements.txt"
context: "backend"
dockerfile: "backend/Dockerfile"
image-name: "ghcr.io/temitayocharles/portfolio-new-api"
```

### 2. Helm Chart Repository

In `helm-charts`, add:

```text
charts/portfolio-api/Chart.yaml
charts/portfolio-api/values.yaml
charts/portfolio-api/templates/deployment.yaml
charts/portfolio-api/templates/service.yaml
charts/portfolio-api/templates/configmap.yaml
charts/portfolio-api/templates/externalsecret.yaml
charts/portfolio-api/templates/networkpolicy.yaml
```

The chart must follow the existing hardened chart conventions:

- non-root container
- read-only root filesystem where compatible
- dropped Linux capabilities
- explicit CPU and memory requests/limits
- readiness and liveness probes
- ClusterIP service
- ExternalSecret support
- NetworkPolicy support

### 3. Vault Repository

In `vault-ops/inventory.yaml`, add a service entry:

```yaml
- repo: portfolio-new
  service: api
  namespace: portfolio
  gitops_managed: true
  store_name: vault-portfolio-new-api
  role_name: staging-portfolio-new-api
  policy_name: staging-portfolio-new-api
  vault_path: temitayo/staging/workloads/portfolio/api
  app_manifest: argocd/applications/portfolio-appset.yaml
  values_path: environments/prod/portfolio/portfolio-api-values.yaml
  chart_path: charts/portfolio-api
  config_path: backend/.env.example
  image_repo: ghcr.io/temitayocharles/portfolio-new-api
  required_secret_keys:
    - MONGO_URL
    - ADMIN_API_KEY
    - RESEND_API_KEY
    - SENDER_EMAIL
    - CONTACT_TO_EMAILS
  required_config_keys:
    - ENVIRONMENT
    - LOG_LEVEL
    - DB_NAME
    - OWNER_NAME
    - CONTACT_RATE_LIMIT_WINDOW_SECONDS
    - CONTACT_RATE_LIMIT_MAX_REQUESTS
    - MAX_CONTACT_LIST_LIMIT
    - CORS_ORIGINS
  additional_vault_paths: []
```

Then regenerate and apply Vault policy, role, service account, and ClusterSecretStore using the existing `vault-ops` playbook.

### 4. Homelab GitOps Repository

In `homelab-gitops`, add:

```text
argocd/applications/portfolio-appset.yaml
environments/prod/portfolio/portfolio-api-values.yaml
environments/prod/portfolio/portfolio-api-image-values.yaml
argocd/platform/resources/envoy-gateway/httproute-portfolio-api.yaml
```

The ApplicationSet should mirror the current multi-source pattern:

- chart from `helm-charts`
- values from `homelab-gitops`
- image override values from `homelab-gitops`
- namespace `portfolio`
- automated prune and self-heal
- server-side apply

## Cloudflare Tunnel Route

Do not create or modify DNS without explicit approval.

When approved, add a Cloudflare Tunnel public hostname:

| Field | Value |
| --- | --- |
| Subdomain | `api` |
| Domain | `temitayocharles.online` |
| Type | `HTTP` |
| URL | `envoy-envoy-gateway-system-homelab-gateway-00f55f79.envoy-gateway-system.svc.cluster.local:80` |

The matching HTTPRoute must use:

```yaml
sectionName: http
```

and must set:

```yaml
X-Forwarded-Proto: https
```

## Smoke Tests

### Backend Health

```bash
curl -fsS https://api.temitayocharles.online/api/health
```

Expected result:

```json
{
  "status": "ok"
}
```

### Contact Form API

```bash
curl -fsS -X POST "https://api.temitayocharles.online/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deployment Test",
    "email": "test@example.com",
    "subject": "Portfolio API verification",
    "message": "This is a post-deployment verification message."
  }'
```

Expected result includes:

```json
{
  "email_status": "sent"
}
```

If Resend is not configured, `email_status` may be `skipped`. If Resend rejects delivery, `email_status` may be `failed`; MongoDB persistence should still work unless database configuration is invalid.

### Admin Contact Listing

```bash
curl -fsS \
  -H "X-Admin-API-Key: <ADMIN_API_KEY>" \
  "https://api.temitayocharles.online/api/contact?limit=5"
```

Expected result:

```json
[]
```

or an array of recent contact submissions.

## Rollback

### Frontend

Use Vercel rollback to restore the previous production deployment.

### Backend

Rollback by updating the image override file:

```text
homelab-gitops/environments/prod/portfolio/portfolio-api-image-values.yaml
```

to a previous known-good tag, then let Argo CD reconcile.

### Public Route

If the API route is unhealthy:

1. Remove or disable the Cloudflare Tunnel public hostname.
2. Revert or delete the `HTTPRoute` from GitOps.
3. Let Argo CD prune the route.

## Operational Notes

- Do not use Render as the primary backend target; it is now fallback only.
- Do not store secrets in Vercel except frontend-safe public variables.
- Do not commit MongoDB or Resend credentials.
- Do not enable wildcard CORS in production.
- Do not publish launch announcements until the final smoke tests pass.
