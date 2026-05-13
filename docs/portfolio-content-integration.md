# Portfolio Content Integration

## Decision

The large frontend mock module has been reduced to a compatibility layer. Structured portfolio content now lives in JSON and is served by the backend API.

## Source files

```text
frontend/src/content/portfolio-content.json
backend/content/portfolio-content.json
frontend/src/mock.js
frontend/src/context/PortfolioContentContext.jsx
frontend/src/services/portfolioContent.js
backend/server.py
```

## Runtime behavior

The React app uses `PortfolioContentProvider` around the portfolio UI.

At runtime:

1. The provider renders immediately with bundled JSON fallback content.
2. If `REACT_APP_BACKEND_URL` is set, it requests `${REACT_APP_BACKEND_URL}/api/content`.
3. If the API returns content successfully, the provider switches to API-sourced content.
4. If the API is unavailable, malformed, or blocked, the app remains usable with bundled fallback content.

This keeps the site resilient during Home Lab maintenance and preserves the current UI behavior.

## Backend endpoints

```text
GET /api/content
GET /api/content/summary
GET /api/content/{section_name}
```

`GET /api/health` also exposes whether the backend content artifact is present.

## Migration impact

`frontend/src/mock.js` is still present so existing component imports remain compatible, but it no longer owns the portfolio dataset. It re-exports values from the structured JSON artifact.

## Follow-up work

- Move content ownership to MongoDB or a CMS only after this JSON-backed API path is stable.
- Add schema validation for content sections.
- Add admin-protected content update endpoints only if operationally required.
- Keep bundled fallback content for public-site resilience even after dynamic content is introduced.
