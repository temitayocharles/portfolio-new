# Security Policy

## Supported deployment surface

The primary production backend deployment target is the Home Lab GitOps platform in `temitayocharles/homelab-gitops`.
Render is retained as a fallback deployment option, not the default production source of truth.

## Reporting a vulnerability

Report suspected vulnerabilities privately to the repository owner. Do not open public issues containing secrets, exploit details, tokens, or infrastructure internals.

## Secret handling standards

- Do not commit `.env` files or rendered Kubernetes Secret values.
- Use GitHub Actions secrets for CI/CD credentials.
- Use Vault-backed ExternalSecrets for Home Lab runtime secrets.
- Rotate any secret immediately if it appears in Git history, logs, screenshots, or build artifacts.

## Required checks before merge

The target baseline for `main` is:

- Backend CI passes.
- Frontend CI passes.
- Secret scanning passes.
- Container scanning passes for critical and high vulnerabilities.
- UI smoke tests pass for portfolio-critical paths.

## Runtime controls

The backend must keep the following controls enabled in production:

- Strict CORS allow-listing.
- Admin API key protection for contact message retrieval.
- Contact submission rate limiting.
- Structured logging.
- Health endpoint monitoring.
- Non-root container runtime.
