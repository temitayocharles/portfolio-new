# Launch Checklist

## Purpose

This checklist defines the minimum quality bar before the portfolio is treated as production-ready and publicly promoted.

## Launch Gates

The site must not be publicly announced until all launch gates are complete or explicitly deferred with a documented reason.

## 1. Repository Readiness

- [ ] `main` branch contains only reviewed production-ready changes.
- [ ] No `.env` files are committed.
- [ ] `.gitignore` protects local secrets and generated artifacts.
- [ ] README includes local development and deployment instructions.
- [ ] Architecture, deployment, security, and content documentation exist.
- [ ] Agent execution log is current.
- [ ] Known limitations are documented.

## 2. Frontend Readiness

- [ ] Vercel project is connected to `temitayocharles/portfolio-new`.
- [ ] Vercel root directory remains repository root.
- [ ] Install command is `cd frontend && yarn install`.
- [ ] Build command is `cd frontend && yarn build`.
- [ ] Output directory is `frontend/build`.
- [ ] `REACT_APP_BACKEND_URL` is configured without `/api` suffix.
- [ ] Production frontend build succeeds.
- [ ] No console errors on core pages.
- [ ] Site is responsive on mobile, tablet, and desktop.
- [ ] Navigation links work.
- [ ] External GitHub and LinkedIn links work.
- [ ] Resume download path works.

## 3. Backend Readiness

- [ ] Backend Dockerfile exists.
- [ ] Backend GHCR workflow exists.
- [ ] Backend image builds successfully.
- [ ] Backend image is pushed to GHCR.
- [ ] Backend image runs locally or in a test pod.
- [ ] `/api/health` returns `status: ok`.
- [ ] `/api/contact` accepts valid contact submissions.
- [ ] Invalid contact submissions return validation errors.
- [ ] Unauthenticated `GET /api/contact` is blocked.
- [ ] Authenticated `GET /api/contact` works with admin key.

## 4. Homelab K3s Readiness

- [ ] `portfolio` namespace exists or is created by GitOps.
- [ ] Helm chart exists in `helm-charts`.
- [ ] Environment values exist in `homelab-gitops`.
- [ ] Image override values exist in `homelab-gitops`.
- [ ] Argo CD ApplicationSet exists.
- [ ] Argo CD sync is healthy.
- [ ] Deployment is available.
- [ ] Pod is Ready.
- [ ] Service is ClusterIP.
- [ ] Readiness probe passes.
- [ ] Liveness probe passes.
- [ ] NetworkPolicy is applied and validated.

## 5. Secrets Readiness

- [ ] `vault-ops` inventory includes `portfolio-new/api`.
- [ ] Vault policy generated.
- [ ] Vault role generated.
- [ ] ClusterSecretStore generated.
- [ ] Vault path is seeded with required secrets.
- [ ] ExternalSecret sync succeeds.
- [ ] Kubernetes Secret exists and is owned by External Secrets Operator.
- [ ] No secret values appear in GitHub, Vercel, logs, or docs.

## 6. Public Routing Readiness

Requires explicit approval before Cloudflare or DNS changes.

- [ ] HTTPRoute exists for portfolio API.
- [ ] HTTPRoute uses `sectionName: http`.
- [ ] HTTPRoute sets `X-Forwarded-Proto: https`.
- [ ] Cloudflare Tunnel public hostname is configured.
- [ ] Public API hostname resolves through Cloudflare.
- [ ] TLS certificate is valid.
- [ ] `curl https://api.temitayocharles.online/api/health` succeeds.
- [ ] Vercel frontend can call the backend without CORS errors.

## 7. Content Readiness

- [ ] Homepage headline is accurate and compelling.
- [ ] Homepage has no production-visible TODOs.
- [ ] About section reflects real background and positioning.
- [ ] Project cards cover Cloud, DevOps, Platform, AI, Security, Observability, and Networking themes.
- [ ] AI presence is credible and not exaggerated.
- [ ] Case studies include real implementation details.
- [ ] No fabricated employment history, dates, certifications, or metrics.
- [ ] Resume page exists.
- [ ] Resume PDF is current.
- [ ] Contact page copy is professional.

## 8. Visual Readiness

- [ ] Primary headshot optimized and committed or served from approved asset host.
- [ ] Authentic supporting headshot optimized.
- [ ] Editorial black-and-white portrait used only where appropriate.
- [ ] All meaningful images have alt text.
- [ ] Large source images are not unnecessarily committed.
- [ ] OpenGraph image exists.
- [ ] Visual style is consistent across pages.
- [ ] No low-quality generic AI visuals are used.

## 9. SEO Readiness

- [ ] Page titles are configured.
- [ ] Meta descriptions are configured.
- [ ] Canonical URLs are configured.
- [ ] OpenGraph metadata exists.
- [ ] Twitter/X card metadata exists if used.
- [ ] `sitemap.xml` exists.
- [ ] `robots.txt` exists.
- [ ] JSON-LD Person schema exists.
- [ ] JSON-LD WebSite schema exists.
- [ ] Project/case-study pages have semantic headings.

## 10. Analytics Readiness

- [ ] Analytics provider selected.
- [ ] Analytics is privacy-safe.
- [ ] No contact-form message contents are tracked.
- [ ] Resume download event is tracked.
- [ ] GitHub click event is tracked.
- [ ] LinkedIn click event is tracked.
- [ ] Contact form started event is tracked.
- [ ] Contact form submitted event is tracked.
- [ ] Flagship project view event is tracked.

## 11. Security Readiness

- [ ] Gitleaks scan passes.
- [ ] Dependency scan reviewed.
- [ ] Trivy scan reviewed for backend image.
- [ ] Admin API key is strong and stored in Vault.
- [ ] Production CORS is exact, not wildcard.
- [ ] Contact form rate limiting is active.
- [ ] Secure headers are configured.
- [ ] Backend does not expose stack traces.
- [ ] Public API does not expose private contact messages.

## 12. Performance and Accessibility Readiness

- [ ] Lighthouse Performance target is 90 or documented.
- [ ] Lighthouse Accessibility target is 95 or documented.
- [ ] Lighthouse Best Practices target is 95 or documented.
- [ ] Lighthouse SEO target is 95 or documented.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Color contrast is acceptable.
- [ ] Reduced-motion behavior is respected where animation exists.

## 13. Final Smoke Test Commands

Backend health:

```bash
curl -fsS https://api.temitayocharles.online/api/health
```

Contact submission:

```bash
curl -fsS -X POST "https://api.temitayocharles.online/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Launch Test",
    "email": "test@example.com",
    "subject": "Launch smoke test",
    "message": "This is a launch readiness smoke test."
  }'
```

Admin contact listing:

```bash
curl -fsS \
  -H "X-Admin-API-Key: <ADMIN_API_KEY>" \
  "https://api.temitayocharles.online/api/contact?limit=5"
```

## Launch Approval

Before public announcement, confirm:

```text
I approve launching and publicly announcing the portfolio.
```

Do not publish LinkedIn, GitHub profile, or other external social content without that approval.
