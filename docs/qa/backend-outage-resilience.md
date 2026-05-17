# Backend Outage Resilience

## Decision

The public portfolio must render from bundled frontend content even when the homelab backend is unavailable, slow, unreachable, or returns an invalid payload.

The backend is an optional dynamic content provider for the public brand site. It must not be a required first-render dependency.

## Failure mode addressed

A homelab network outage can make `/api/content` unavailable even while the static frontend still returns HTTP 200. Without a fail-open frontend path, visitors can see a blank or degraded page.

## Runtime behavior

The frontend now follows this policy:

1. Load bundled `frontend/src/content/portfolio-content.json` immediately.
2. Attempt to fetch `${REACT_APP_BACKEND_URL}/api/content` only as an enhancement.
3. Abort the backend content request after a short timeout.
4. Validate the remote content shape before accepting it.
5. Keep bundled content if the backend is down, slow, invalid, or returns a non-2xx response.

## Validation

Playwright includes a backend-outage smoke case that intercepts `/api/content`, returns HTTP 503, and verifies that the homepage still renders critical sections from bundled content.

## Release rule

A route returning HTTP 200 is not enough. The browser smoke gate must prove that the visible React application renders even when the backend content API is unavailable.

## Operational implication

Homelab outages should reduce dynamic enrichment, not public site availability.
