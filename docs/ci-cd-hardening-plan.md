# CI/CD Hardening Plan

## Phase 1 baseline

This branch adds the first safe foundation without changing product behavior:

- Backend contract tests.
- Frontend build and QA checks.
- Playwright smoke tests.
- Lighthouse assertions.
- Dependency audit reporting.
- Secret scanning.
- Backend container scanning.
- Docker image healthcheck and OCI metadata.
- Dependabot configuration.

## Primary deployment model

Home Lab GitOps remains the production source of truth for backend runtime configuration.
The CI/CD responsibility of this repository is to produce validated code and a safe backend image.
The promotion responsibility belongs in `homelab-gitops`.

## Merge readiness target

Before merging into `main`, require these checks:

```text
Backend CI
Frontend CI
Secret Scan
Backend Container Scan
UI Smoke Tests
```

Lighthouse should initially run on pull requests and block accessibility, best-practices, and SEO regressions.
Performance is warning-level in Phase 1 because image optimization and bundle cleanup are not complete yet.

## Phase 2 follow-up

- Replace oversized frontend mock data with backend-served structured content.
- Add Redis or edge-backed contact rate limiting.
- Add SBOM generation.
- Pin reusable workflow references to immutable SHAs.
- Add CodeQL.
- Add preview deployment checks.


## Runner baseline

GitHub Actions must use the Home Lab ARC self-hosted runners, not GitHub-hosted `ubuntu-latest`.

```text
General and Docker-capable jobs: portfolio-new-workloads
```


The `infraforge, workloads` labels come from `homelab-gitops/applications/arc-runners/homelab-workloads-values.yaml`; that scale set uses DIND and is the appropriate lane for portfolio application CI/CD.
