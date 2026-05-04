# Portfolio Platform Architecture

## Executive Summary

This portfolio is a professional platform for Temitayo Charles Akinniranye. It is designed to demonstrate hands-on credibility across Cloud Engineering, DevOps, Platform Engineering, Kubernetes, GitOps, DevSecOps, SRE practices, FinOps awareness, AI infrastructure, automation, and production operations.

The platform is intentionally split across managed frontend hosting and the homelab runtime:

- Vercel serves the public React frontend.
- The homelab K3s cluster runs the FastAPI backend as an always-on API.
- MongoDB Atlas stores contact submissions and operational records that need persistence.
- Resend handles contact-form email delivery.
- Vault and External Secrets Operator manage backend secrets inside Kubernetes.
- Argo CD reconciles homelab manifests from Git.
- Envoy Gateway and Cloudflare Tunnel expose the backend securely without directly exposing the home network.

This architecture is not only functional. It is itself a portfolio proof point: the public site is backed by a real GitOps platform operated in a homelab environment.

## Target Runtime Architecture

```text
Visitor browser
  -> Vercel CDN
  -> React portfolio frontend
  -> HTTPS API call to https://api.temitayocharles.online
  -> Cloudflare Tunnel
  -> Envoy Gateway HTTP listener
  -> Gateway API HTTPRoute
  -> portfolio-api Kubernetes Service
  -> FastAPI backend Pod
  -> MongoDB Atlas
  -> Resend
```

## Source Repositories

| Repository | Purpose |
| --- | --- |
| `temitayocharles/portfolio-new` | Application source: React frontend and FastAPI backend. |
| `temitayocharles/shared-workflows` | Reusable GitHub Actions workflows for CI, image build, and GitOps dispatch. |
| `temitayocharles/helm-charts` | Helm chart source of truth for deployable workloads. |
| `temitayocharles/homelab-gitops` | Argo CD applications, ApplicationSets, environment values, and Gateway API routes. |
| `temitayocharles/vault-ops` | Vault policies, roles, service accounts, and ClusterSecretStores. |
| `temitayocharles/utilities-scripts` | Vault seeding, scanners, image helpers, backup helpers, and platform utilities. |

## Frontend

Current frontend stack:

- React
- CRACO
- React Router
- Tailwind CSS
- Radix UI components
- Axios
- Lucide icons

Deployment target:

- Vercel Hobby tier
- Static build output from `frontend/build`
- Environment-driven backend URL through `REACT_APP_BACKEND_URL`

Primary frontend responsibilities:

- Portfolio narrative and positioning
- Project and case-study presentation
- Contact form UI
- Resume and social-link conversion paths
- SEO metadata and OpenGraph assets
- Analytics event capture

## Backend

Current backend stack:

- FastAPI
- Motor and MongoDB
- Pydantic validation
- Resend email delivery
- Starlette CORS middleware

Deployment target:

- Homelab K3s
- Container image published to GitHub Container Registry
- Helm release managed by Argo CD
- Public exposure through Cloudflare Tunnel and Envoy Gateway

Primary backend responsibilities:

- Accept validated contact-form submissions
- Persist submissions to MongoDB Atlas
- Send owner notification emails through Resend
- Protect administrative message retrieval with `X-Admin-API-Key`
- Apply rate limiting and secure response headers

## Secrets Model

Secrets must not be committed to Git.

Backend secrets:

- `MONGO_URL`
- `ADMIN_API_KEY`
- `RESEND_API_KEY`
- `SENDER_EMAIL`
- `CONTACT_TO_EMAILS`

Expected flow:

```text
Vault KV
  -> External Secrets Operator
  -> Kubernetes Secret
  -> portfolio-api Deployment env vars
```

Recommended Vault path:

```text
temitayo/staging/workloads/portfolio/api
```

Recommended ClusterSecretStore name:

```text
vault-portfolio-new-api
```

## Public Routing Model

The homelab public routing model should follow the existing Cloudflare Tunnel runbook:

1. Create `HTTPRoute` in `homelab-gitops/argocd/platform/resources/envoy-gateway/`.
2. Bind to the shared `homelab-gateway` using `sectionName: http`.
3. Add `X-Forwarded-Proto: https` so the backend and frontend understand the original scheme.
4. Add Cloudflare Tunnel public hostname pointing to Envoy Gateway on port 80.

Recommended hostname:

```text
api.temitayocharles.online
```

Fallback hostname while validating:

```text
portfolio-api.tca-infraforge.site
```

## Content Architecture

The portfolio content should position Temitayo as a multi-domain engineer with a strong presence in:

- Cloud infrastructure
- Kubernetes and GitOps platforms
- DevOps automation
- DevSecOps and secrets management
- Observability and reliability
- AI infrastructure and AI-assisted operations
- Network troubleshooting and infrastructure fundamentals
- FinOps and production-readiness thinking

Case studies must be structured but not narrowly limited to one template. The recurring structure is:

- Executive summary
- Architecture
- Implementation
- Security
- CI/CD
- Observability
- Troubleshooting
- Lessons learned
- Future roadmap

AI-focused case studies should also include:

- Model or agent role
- Data flow and boundaries
- Human-in-the-loop controls
- Safety and abuse controls
- Evaluation strategy
- Operational cost considerations

## Analytics Architecture

Initial analytics should be privacy-safe and conversion-focused.

Recommended events:

- `page_view`
- `project_card_clicked`
- `case_study_viewed`
- `resume_downloaded`
- `github_clicked`
- `linkedin_clicked`
- `contact_form_started`
- `contact_form_submitted`
- `outbound_link_clicked`

Do not capture sensitive contact-form message contents.

## Observability Architecture

Backend observability should align with the homelab platform:

- Kubernetes readiness and liveness probes
- Container logs to the cluster logging path
- Argo CD health and sync state
- Optional Prometheus scrape support in a later phase
- Synthetic uptime checks after public routing is live

Minimum health endpoint:

```text
GET /api/health
```

## Production Constraints

- Vercel frontend should not contain backend secrets.
- Backend must remain independently deployable from the frontend.
- Contact submissions are private data and must not be exposed publicly.
- Admin contact retrieval must remain protected.
- Cloudflare and DNS changes require explicit approval.
- Secrets must be seeded into Vault, not Git.
