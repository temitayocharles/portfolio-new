# Browser Runtime Smoke Gate

## Purpose

The production route verifier can confirm that a URL returns HTTP 200, but it cannot prove that the React application rendered successfully in the browser.

This gate prevents regressions where the HTML shell loads but the page is visually blank because the frontend JavaScript throws at runtime.

## Guardrails added

The Playwright smoke suite now fails when any of these conditions occur:

- The page emits an uncaught browser `pageerror`.
- The page emits `console.error`.
- The `#root` element is missing or hidden.
- The rendered `#root` text is too short to represent a real page.
- Critical homepage sections are missing.
- Critical case-study routes render as blank shells.

## Critical routes covered

- `/`
- `/#projects`
- `/#contact`
- `/case/ai-inference-lab`
- `/case/project-iris`
- `/case/jerry`
- `/case/sentinel-copilot`

## Incident addressed

This gate was added after a production blank-page regression where the route audit still passed because it only validated HTTP response status and content type.

## Local validation

Run from the repository root:

```bash
cd frontend
yarn test:ui
```

Expected result:

```text
All Playwright smoke tests pass with no page errors or console errors.
```

## Release rule

Do not merge frontend UI changes when this gate fails. A successful HTTP route audit is no longer sufficient evidence that the site is safe to deploy.
