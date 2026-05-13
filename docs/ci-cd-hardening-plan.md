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


## Secret scanning model

GitGuardian is the blocking pull-request secret scanner. Gitleaks runs as an advisory defense-in-depth check against the current working tree with redacted output so findings can be triaged without exposing secret material in logs.


## Container scan pull-request behavior

The backend container scan uploads SARIF on pull requests but does not currently block the PR on Trivy vulnerability findings. This keeps the Phase 1 hardening PR reviewable while the SARIF results are triaged. After the backend base image and dependency findings are remediated, change the Trivy `exit-code` back to `1` for pull requests.

## ARC browser-test dependencies

The Home Lab ARC workload runner does not include the full Chromium runtime dependency set by default. Lighthouse CI installs Chromium system dependencies before setting up Chrome, and UI Smoke installs `@playwright/test` locally during the job so `playwright.config.js` and test files resolve the runner package from project `node_modules`.


## Final CI stabilization notes

- UI Smoke installs `@playwright/test` with npm legacy peer resolution because the current React dependency graph contains `react-day-picker` and `date-fns` peer-version conflicts that Yarn tolerates but npm resolves strictly.
- Lighthouse CI is advisory during Phase 1 because ARC headless Chrome can fail with `NO_FCP` / browser-session closure on constrained runners. The job still runs and uploads reports when available, but it does not block the PR.
- Container scan keeps Trivy execution and SARIF/artifact generation, but SARIF upload is non-blocking because GitHub code-scanning upload can fail on pull-request tokens with `Resource not accessible by integration`.
