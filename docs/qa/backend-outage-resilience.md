# Backend-outage resilience

## Summary

The frontend initializes with bundled static content and treats the backend API as an optional enrichment source. A backend outage, timeout, or invalid response never causes a blank page.

## Implementation

### Bundled fallback content

`frontend/src/content/portfolio-content.json` is bundled at build time. The `PortfolioContentContext` initializes with this content as the default state before any network request is made.

```js
// PortfolioContentContext.jsx
const [content, setContent] = useState(fallbackContent);
const [source, setSource] = useState("fallback");
```

The page renders immediately from bundled content. No loading spinner blocks the initial render.

### Optional backend fetch

The backend fetch only runs when `REACT_APP_BACKEND_URL` is set. If the environment variable is absent, no network request is made and the fallback content is used permanently.

```js
// portfolioContent.js
export const portfolioContentEndpoint = () => {
  const backendUrl = trimTrailingSlash(process.env.REACT_APP_BACKEND_URL || "");
  return backendUrl ? `${backendUrl}/api/content` : null;
};
```

### Fetch timeout

A 5-second `AbortController` timeout prevents a slow or unresponsive backend from blocking the UI indefinitely.

```js
const FETCH_TIMEOUT_MS = 5000;
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
```

### Non-fatal error handling

Any fetch error (network failure, timeout, non-2xx status, invalid JSON) is caught and logged as a warning in non-production environments. The context falls back to bundled content and sets `source: "fallback"`.

```js
} catch (err) {
  setError(err);
  setSource("fallback");
  if (process.env.NODE_ENV !== "production") {
    console.warn("Portfolio content API unavailable; using bundled fallback content.", err);
  }
}
```

### Invalid response handling

`mergeContent` validates that the remote response is a non-null, non-array object before merging. Any invalid shape returns the bundled fallback.

```js
const mergeContent = (remoteContent) => {
  if (!remoteContent || typeof remoteContent !== "object" || Array.isArray(remoteContent)) {
    return fallbackContent;
  }
  return { ...fallbackContent, ...remoteContent };
};
```

## Behavior matrix

| Condition | Result |
|---|---|
| `REACT_APP_BACKEND_URL` not set | Bundled content used, no fetch attempted |
| Backend returns 2xx valid JSON | Remote content merged over bundled fallback |
| Backend returns non-2xx | Error caught, bundled fallback used |
| Backend times out (>5s) | AbortError caught, bundled fallback used |
| Backend returns invalid JSON | Error caught, bundled fallback used |
| Backend returns wrong shape | `mergeContent` returns bundled fallback |

## Hub pages

The hub pages (`/projects`, `/news`, `/writing`, `/studies`, `/lab`, `/github`) use additional static content files:

- `frontend/src/content/site-updates.json` — curated news updates
- `frontend/src/content/github-digest.json` — curated GitHub digest
- `frontend/src/content/site-sections.json` — editorial taxonomy

These files are bundled at build time and require no backend or network access. Hub pages are fully functional with no backend dependency.
