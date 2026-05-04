# Security Documentation

## Security Objectives

The portfolio platform must protect visitor data, preserve professional credibility, and demonstrate production engineering discipline. The security model is intentionally pragmatic: the platform should be secure without becoming unnecessarily complex.

## Current Security Controls

The FastAPI backend currently implements:

- Required database environment validation at startup.
- Explicit CORS origin configuration.
- Production rejection of wildcard CORS origins.
- Contact-form field validation with Pydantic.
- Text normalization for form fields.
- HTML escaping for user-controlled values before rendering email templates.
- Generic public error messages for email provider failures.
- Admin-only contact retrieval with `X-Admin-API-Key`.
- Constant-time API key comparison.
- Contact-form rate limiting.
- Baseline HTTP security headers.

## Required Production Secrets

These values must never be committed to Git:

```bash
MONGO_URL=
ADMIN_API_KEY=
RESEND_API_KEY=
SENDER_EMAIL=
CONTACT_TO_EMAILS=
```

Secrets must be stored in Vault and delivered to Kubernetes through External Secrets Operator.

Recommended Vault path:

```text
temitayo/staging/workloads/portfolio/api
```

## Environment Separation

Production and preview/development settings must be separated.

Production backend must set:

```bash
ENVIRONMENT=production
CORS_ORIGINS=https://temitayocharles.online,https://www.temitayocharles.online,https://<vercel-production-domain>
```

Wildcard CORS is not allowed in production.

## Contact Form Security

The contact form is public and must assume hostile input.

Controls:

- Validate `name`, `email`, `subject`, and `message` server-side.
- Enforce maximum field lengths.
- Strip unsafe ASCII control characters.
- Escape all user-controlled values before email HTML rendering.
- Rate-limit submissions before email dispatch.
- Store only necessary data.
- Never expose Resend, MongoDB, or stack traces to public users.

Future improvement:

- Move rate limiting from in-memory backend state to Redis, Cloudflare Turnstile, Cloudflare WAF rules, or another shared control if backend replicas increase.

## Admin Contact Retrieval

Endpoint:

```text
GET /api/contact
```

Required header:

```http
X-Admin-API-Key: <ADMIN_API_KEY>
```

Rules:

- Do not expose this endpoint through unauthenticated frontend code.
- Do not store the admin API key in Vercel frontend variables.
- If an admin UI is later added, require proper authenticated access, not a browser-exposed static key.

## Kubernetes Security Requirements

The homelab deployment should include:

- Dedicated `portfolio` namespace.
- Dedicated service account.
- No unnecessary Kubernetes API token mount unless required.
- Non-root container user.
- `allowPrivilegeEscalation: false`.
- Linux capabilities dropped.
- Resource requests and limits.
- Readiness and liveness probes.
- ClusterIP service only.
- HTTPRoute through Envoy Gateway.
- NetworkPolicy for ingress and egress.

Recommended NetworkPolicy behavior:

- Allow ingress from `envoy-gateway-system` to the backend service port.
- Allow DNS egress.
- Allow HTTPS egress to MongoDB Atlas and Resend.
- Prefer explicit egress CIDRs when stable. If provider IPs are not stable, document broader HTTPS egress and compensate with least-privilege credentials.

## Container Security Requirements

The backend Docker image should:

- Use a slim Python base image.
- Run as a non-root user.
- Install only required dependencies.
- Avoid writing to the application directory at runtime.
- Expose only the application port.
- Include no `.env` files or secrets.

Future improvement:

- Add Trivy scan to CI.
- Add SBOM generation.
- Add image signing if the homelab admission path later enforces signed images.

## GitHub Security Requirements

Required repository controls:

- Dependabot for frontend and backend dependencies.
- Gitleaks secret scanning workflow.
- CodeQL where practical.
- Branch protection before final launch.
- Pull request review before production changes.
- No committed `.env` files.

Recommended workflows:

```text
.github/workflows/backend-ci-ghcr.yml
.github/workflows/frontend-ci.yml
.github/workflows/security-gitleaks.yml
.github/workflows/security-trivy.yml
```

## Frontend Security Requirements

The frontend must:

- Store only public configuration values.
- Use the backend API URL from `REACT_APP_BACKEND_URL`.
- Avoid embedding admin keys or service credentials.
- Sanitize or avoid unsafe HTML rendering.
- Use semantic links for external targets.
- Avoid unnecessary third-party scripts.

## Security Headers

Backend already includes baseline headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

Recommended additional frontend/platform headers:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

CSP should be introduced carefully to avoid breaking analytics, fonts, and image delivery.

## Data Privacy

Contact submissions include personal data. Treat them as private.

Rules:

- Do not expose submitted names, emails, or messages publicly.
- Do not include message contents in analytics events.
- Do not commit test submissions containing real personal data.
- Keep retention simple and documented.

Recommended retention policy:

- Keep contact submissions for active follow-up.
- Periodically delete stale submissions that are no longer operationally useful.

## Approval Gates

Explicit approval is required before:

- Changing DNS records.
- Adding or changing Cloudflare public hostnames.
- Publishing LinkedIn or GitHub profile content externally.
- Sending email to external recipients beyond controlled tests.
- Rotating production secrets.
- Deleting repositories, databases, deployments, or Vault paths.
- Making sensitive personal information public.

## Launch Security Checklist

- [ ] No `.env` files committed.
- [ ] `ADMIN_API_KEY` configured in Vault.
- [ ] `RESEND_API_KEY` configured in Vault.
- [ ] `MONGO_URL` configured in Vault.
- [ ] Production CORS origins are exact.
- [ ] Contact form returns expected status.
- [ ] Unauthenticated `GET /api/contact` returns 401 or 503.
- [ ] Authenticated `GET /api/contact` works only with admin key.
- [ ] Backend image built from clean Dockerfile.
- [ ] Gitleaks scan passes.
- [ ] Dependency audit reviewed.
- [ ] Trivy findings reviewed or documented.
- [ ] Public API route tested after Cloudflare routing.
