# Portfolio Deployment Strategy

## Decision

`portfolio-new` keeps the Home Lab GitOps platform as the primary backend deployment target.
Render remains an optional fallback path for free-tier continuity and external recovery.

## Current production path

The Home Lab GitOps repository already contains portfolio-specific backend deployment configuration:

- `argocd/applications/portfolio-appset.yaml`
- `argocd/applications/portfolio-networking.yaml`
- `argocd/platform/resources/portfolio-networking/httproute-portfolio-api.yaml`
- `argocd/platform/resources/portfolio-networking/networkpolicy-portfolio-api-mongodb-atlas-egress.yaml`
- `argocd/platform/resources/external-secrets-support/portfolio-api-secrets.yaml`
- `environments/prod/portfolio/portfolio-api-values.yaml`
- `environments/prod/portfolio/portfolio-api-image-values.yaml`

The Home Lab deployment currently references:

```text
image.repository = ghcr.io/temitayocharles/portfolio-new-api
image.tag        = main@sha256:<digest>
```

## Recommended operating model

```text
GitHub portfolio-new
  -> backend CI
  -> backend image build
  -> GHCR image publication
  -> digest promotion into homelab-gitops
  -> Argo CD sync
  -> Envoy Gateway HTTPRoute
  -> portfolio API service
```

## Render fallback model

Render should stay available for disaster recovery or temporary external hosting.
It should not become the primary deployment target unless the Home Lab reliability, power, ISP, or maintenance burden becomes unacceptable.

Render fallback requirements:

- Same environment variable contract as Home Lab.
- Same `/api/health` readiness endpoint.
- Same MongoDB Atlas backend.
- Same Resend delivery path.
- Same CORS origins.

## Priority controls

- Keep GHCR image tags digest-pinned in Home Lab GitOps.
- Keep runtime secrets in Vault-backed ExternalSecrets.
- Keep Render secrets managed outside Git.
- Keep Home Lab network policy explicit.
- Keep `api.temitayocharles.online` as the stable API origin for the frontend.
