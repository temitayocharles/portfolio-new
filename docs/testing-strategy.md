# Testing Strategy

## Backend

Backend tests live under:

```text
backend/tests/
```

Phase 1 validates:

- `/api/health` contract.
- `/api/` root contract.
- Contact payload validation.
- Admin contact listing authorization.

The tests intentionally avoid sending email and avoid requiring a live MongoDB server.
Invalid contact payloads are rejected by FastAPI validation before delivery or persistence logic runs.

## Frontend

Frontend smoke tests live under:

```text
frontend/playwright/
```

Phase 1 validates:

- Primary sections render: `#top`, `#projects`, and `#contact`.
- Project section remains available for architecture/hiring review.
- Contact form fields remain usable without submitting to production email delivery.

## Quality gates

Recommended local commands:

```bash
cd backend
pytest -q tests

cd ../frontend
yarn qa:portfolio
yarn build
yarn test:ci
yarn test:ui
```
