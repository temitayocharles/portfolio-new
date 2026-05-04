# Implementation Roadmap

## Objective

Deliver a serious employer-facing portfolio platform for Cloud, DevOps, Platform Engineering, AI Infrastructure, and Automation roles while using the deployment architecture that best reflects Temitayo's actual platform engineering strengths.

## Guiding Principles

- Preserve current business logic unless there is a clear improvement.
- Do not rebuild the stack without business value.
- Ship in controlled slices.
- Use GitOps for backend runtime deployment.
- Keep secrets out of Git.
- Require approval before DNS, public-hostname, paid-service, or external-publishing changes.
- Treat AI as a credible engineering theme, not a decorative buzzword.

## Phase 1: Foundation and Planning

Status: in progress.

Deliverables:

- Architecture documentation.
- Deployment runbook.
- Security documentation.
- Content strategy.
- Asset strategy.
- Launch checklist.
- Execution log.

Acceptance criteria:

- Documentation exists in `docs/`.
- Backend target is clearly defined as homelab K3s.
- Frontend target is clearly defined as Vercel.
- AI positioning is included as a first-class content pillar.

## Phase 2: Backend Containerization

Repository:

```text
temitayocharles/portfolio-new
```

Files to add:

```text
backend/Dockerfile
.dockerignore
.github/workflows/backend-ci-ghcr.yml
```

Requirements:

- Python slim base image.
- Non-root runtime user.
- Install dependencies from `backend/requirements.txt`.
- Start with `uvicorn server:app`.
- Expose port `8001`.
- Build and push image to GHCR on `main`.
- Run basic backend import/syntax validation in CI.

Acceptance criteria:

- GHCR image published as `ghcr.io/temitayocharles/portfolio-new-api:<sha>`.
- Workflow passes.
- Image contains no `.env` files.

## Phase 3: Frontend Vercel Readiness

Repository:

```text
temitayocharles/portfolio-new
```

Current file:

```text
vercel.json
```

Required checks:

- Vercel project imports from repository root.
- Frontend builds successfully with `cd frontend && yarn build`.
- `REACT_APP_BACKEND_URL` points to the public backend API origin.
- SPA rewrite is active.

Recommended enhancements:

- Add frontend CI workflow.
- Add basic link validation.
- Add Lighthouse check after production URL exists.

Acceptance criteria:

- Vercel production deployment succeeds.
- Contact form points to backend URL without `/api` suffix in env var.

## Phase 4: Helm Chart

Repository:

```text
temitayocharles/helm-charts
```

Files to add:

```text
charts/portfolio-api/Chart.yaml
charts/portfolio-api/values.yaml
charts/portfolio-api/templates/_helpers.tpl
charts/portfolio-api/templates/deployment.yaml
charts/portfolio-api/templates/service.yaml
charts/portfolio-api/templates/configmap.yaml
charts/portfolio-api/templates/externalsecret.yaml
charts/portfolio-api/templates/networkpolicy.yaml
```

Requirements:

- Follow existing chart conventions.
- Default to namespace `portfolio`.
- Use ClusterIP service.
- Add readiness and liveness probes against `/api/health`.
- Support ExternalSecret from Vault.
- Support NetworkPolicy.
- Support image override values.

Acceptance criteria:

- `helm lint charts/portfolio-api` passes.
- `helm template` renders valid Kubernetes objects.

## Phase 5: Vault and External Secrets

Repository:

```text
temitayocharles/vault-ops
```

Change:

- Add `portfolio-new/api` to `inventory.yaml`.
- Generate policy, role, ServiceAccount, and ClusterSecretStore.
- Seed Vault path with production secrets using approved secure method.

Vault path:

```text
temitayo/staging/workloads/portfolio/api
```

Required secret keys:

```text
MONGO_URL
ADMIN_API_KEY
RESEND_API_KEY
SENDER_EMAIL
CONTACT_TO_EMAILS
```

Acceptance criteria:

- `ClusterSecretStore/vault-portfolio-new-api` exists.
- `ExternalSecret` in portfolio namespace can sync successfully.
- Kubernetes Secret is created by ESO, not committed.

## Phase 6: Homelab GitOps Deployment

Repository:

```text
temitayocharles/homelab-gitops
```

Files to add:

```text
argocd/applications/portfolio-appset.yaml
environments/prod/portfolio/portfolio-api-values.yaml
environments/prod/portfolio/portfolio-api-image-values.yaml
argocd/platform/resources/envoy-gateway/httproute-portfolio-api.yaml
```

Requirements:

- ApplicationSet uses chart from `helm-charts`.
- Values come from `homelab-gitops`.
- Image tag override is isolated in its own file.
- Namespace is `portfolio`.
- Argo CD automated prune and self-heal are enabled.
- HTTPRoute follows Cloudflare Tunnel pattern.

Acceptance criteria:

- Argo CD creates the portfolio API app.
- Pod reaches Ready state.
- Service exists.
- HTTPRoute is accepted.

## Phase 7: Public API Exposure

Requires explicit approval before Cloudflare changes.

Target hostname:

```text
api.temitayocharles.online
```

Temporary validation hostname if needed:

```text
portfolio-api.tca-infraforge.site
```

Acceptance criteria:

- Cloudflare hostname routes to Envoy Gateway port 80.
- `curl https://api.temitayocharles.online/api/health` returns `status: ok`.
- Contact form works from Vercel frontend.

## Phase 8: Content and Brand Upgrade

Repository:

```text
temitayocharles/portfolio-new
```

Deliverables:

- Add optimized headshots.
- Update hero and about sections.
- Add project taxonomy including AI infrastructure and automation.
- Add case-study pages or structured project content.
- Add resume page and downloadable PDF path.
- Add SEO metadata.
- Add OpenGraph image plan.

Acceptance criteria:

- Homepage has no placeholder TODOs.
- Project sections represent Cloud, DevOps, Platform, AI, Observability, Security, and Networking themes.
- Headshots are used intentionally, not randomly.

## Phase 9: Analytics and SEO

Recommended starting point:

- Vercel Analytics for baseline traffic.
- PostHog later if recruiter journey tracking is needed.

Deliverables:

- Analytics event taxonomy.
- Sitemap.
- Robots.txt.
- OpenGraph metadata.
- JSON-LD Person and WebSite schema.

Acceptance criteria:

- Resume download, LinkedIn click, GitHub click, and contact submission are measurable.
- No sensitive contact-form data is tracked.

## Phase 10: Launch Readiness

Deliverables:

- Final smoke test report.
- Lighthouse report.
- Launch checklist.
- LinkedIn draft.
- GitHub profile README draft.
- Known limitations.
- Maintenance runbook.

Acceptance criteria:

- Frontend and backend are live.
- Contact form is tested.
- Admin contact listing is protected.
- Secrets are in Vault.
- No critical security issues are open.
- User approves any public announcement.

## Deferred Decisions

### Next.js Migration

Do not migrate to Next.js before initial launch unless the current React implementation blocks SEO or content growth.

### Neon PostgreSQL

Do not introduce Neon while MongoDB Atlas satisfies the current persistence use case.

### CMS

Do not introduce Google Sheets, Notion, Sanity, or Contentful until update frequency justifies it. Start with Git-managed content.

### Render

Render is fallback only. The primary backend runtime is homelab K3s.
