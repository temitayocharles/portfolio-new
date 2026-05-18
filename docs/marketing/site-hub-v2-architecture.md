# Site hub v2 architecture

## Purpose

The public website remains a static-first brand hub with curated, public-safe content surfaces for projects, studies, lab work, updates, and legal pages.

## Component structure

### Route orchestrators

- `frontend/src/App.js`
  - selects legal route, site hub route, case-study route, or homepage
  - applies route metadata through `useRouteMetadata`
- `frontend/src/components/portfolio/SiteHubPage.jsx`
  - route-level hub orchestrator only
  - resolves active hub route config and delegates rendering to section components

### Hub module split

- `frontend/src/components/portfolio/hub/HubDesignTokens.js`
  - route config, accent tokens, lane/type/group constants
- `frontend/src/components/portfolio/hub/HubNavigation.jsx`
  - hub route navigation UI
- `frontend/src/components/portfolio/hub/HubSectionShell.jsx`
  - shared shell/hero/chrome for all hub routes
- `frontend/src/components/portfolio/hub/HubPrimitives.jsx`
  - reusable UI primitives (`Tag`, `SignalPill`, `MaturityBadge`, `SectionHeader`)
- `frontend/src/components/portfolio/hub/ProjectsHubSection.jsx`
- `frontend/src/components/portfolio/hub/NewsHubSection.jsx`
- `frontend/src/components/portfolio/hub/WritingHubSection.jsx`
- `frontend/src/components/portfolio/hub/StudiesHubSection.jsx`
- `frontend/src/components/portfolio/hub/LabHubSection.jsx`
- `frontend/src/components/portfolio/hub/GitHubDigestSection.jsx`

## Content/config file map

- `frontend/src/content/portfolio-content.json`
  - primary site content used by homepage and case-study surfaces
- `frontend/src/content/site-updates.json`
  - curated updates for `/news`
- `frontend/src/content/github-digest.json`
  - curated digest entries for `/github`
- `frontend/src/content/site-sections.json`
  - grouping metadata for projects/studies hubs
- `frontend/src/content/project-meta.json`
  - public-safe per-project operational metadata used in hub sections
- `frontend/src/content/route-metadata.json`
  - route-level title/description metadata for homepage, hub, legal, and case-study paths

## Route metadata model

`route-metadata.json` is an array of objects with:

- `path`
- `title`
- `description`
- `type`
- `publicSafe`

`frontend/src/components/portfolio/useRouteMetadata.js` applies metadata at runtime by:

- setting `document.title`
- creating/updating `meta[name="description"]`
- returning safely when `document` is unavailable

No new head-management dependency is required.

## Project metadata model

`project-meta.json` is an object keyed by project id. Each entry includes public-safe fields only:

- `id`
- `status`
- `statusAccent`
- `ecosystemRole`
- `problemShort`
- optional study fields: `studyType`, `studyLabel`, `studyAccent`
- `publicSafe`

No private repository URLs, secrets, or internal implementation endpoints are allowed.

## Digest validation model

`scripts/generate-github-digest.mjs` validates:

- `github-digest.json` array schema and required fields
- `site-updates.json` array schema
- `project-meta.json` schema
- `route-metadata.json` schema
- no raw GitHub repository URLs in publishable curated content
- no secret-like token values
- no private implementation URLs
- no localhost URLs in publishable content

`GH_TOKEN` is optional. If absent, script runs in validation-only mode.

## Backend/frontend content sync rule

When `frontend/src/content/portfolio-content.json` changes, `backend/content/portfolio-content.json` must be updated in the same PR to prevent drift.

If frontend content does not change, backend content must not be touched.
