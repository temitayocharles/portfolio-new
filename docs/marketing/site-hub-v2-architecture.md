# Site hub v2 architecture

## Purpose

The public website remains a static-first brand hub with curated, public-safe content surfaces for projects, studies, lab work, updates, writing, legal pages, and editorial detail routes.

## Component structure

### Route orchestrators

- `frontend/src/App.js`
  - selects legal route, site hub route, case-study route, editorial detail route, or homepage
  - applies route metadata through `useRouteMetadata`
- `frontend/src/components/portfolio/SiteHubPage.jsx`
  - route-level hub orchestrator only
  - resolves active hub route config and delegates rendering to section components
- `frontend/src/components/portfolio/EditorialDetailPage.jsx`
  - renders static-content editorial detail pages for `/news/:id` and `/writing/:id`
  - provides safe not-found fallback when ID is unknown

### Hub module split

- `frontend/src/components/portfolio/hub/HubDesignTokens.js`
- `frontend/src/components/portfolio/hub/HubNavigation.jsx`
- `frontend/src/components/portfolio/hub/HubSectionShell.jsx`
- `frontend/src/components/portfolio/hub/HubPrimitives.jsx`
- `frontend/src/components/portfolio/hub/ProjectsHubSection.jsx`
- `frontend/src/components/portfolio/hub/NewsHubSection.jsx`
- `frontend/src/components/portfolio/hub/WritingHubSection.jsx`
- `frontend/src/components/portfolio/hub/StudiesHubSection.jsx`
- `frontend/src/components/portfolio/hub/LabHubSection.jsx`
- `frontend/src/components/portfolio/hub/GitHubDigestSection.jsx`

## Route map

- `/news` — editorial updates index
- `/news/:id` — update detail page from static `site-updates.json`
- `/writing` — editorial writing index
- `/writing/:id` — writing detail page from static `portfolio-content.json`

All existing production routes remain unchanged.

## Sitemap and route manifest

- `frontend/public/sitemap.xml` includes:
  - all stable public hub/case/legal routes
  - all public-safe `/news/:id` routes from `site-updates.json`
  - all `/writing/:id` routes from `portfolio-content.json` writings
- `scripts/verify-site-routes.mjs` derives editorial detail routes from static content IDs at runtime, then validates each route response against production.

## Content/config file map

- `frontend/src/content/portfolio-content.json`
  - primary site content, including writings and writing-detail optional fields
- `backend/content/portfolio-content.json`
  - synchronized mirror of frontend content for backend consumers
- `frontend/src/content/site-updates.json`
  - curated news/update items, including update-detail optional fields
- `frontend/src/content/github-digest.json`
  - curated digest entries for `/github`
- `frontend/src/content/site-sections.json`
  - grouping metadata for projects/studies hubs
- `frontend/src/content/project-meta.json`
  - public-safe per-project operational metadata used in hub sections
- `frontend/src/content/route-metadata.json`
  - route-level title/description metadata for homepage, hub, legal, case-study, and representative editorial-detail routes

## Editorial detail content model

Optional detail fields used by detail routes:

- `detailSummary`
- `bodySections` (`[{ title, body }]`)
- `takeaways` (`string[]`)
- `relatedLinks` (`[{ label, href }]`)
- `safetyNote`

These fields must stay concise and public-safe.

## Route metadata model

`route-metadata.json` is an array of objects with:

- `path`
- `title`
- `description`
- `type`
- `publicSafe`

`frontend/src/components/portfolio/useRouteMetadata.js` applies metadata by:

- setting `document.title`
- creating/updating `meta[name="description"]`
- supporting dynamic per-route overrides (used for `/news/:id` and `/writing/:id`)
- returning safely when `document` is unavailable

No new head-management dependency is required.

## Digest validation model

`scripts/generate-github-digest.mjs` validates:

- `github-digest.json` array schema and required fields
- `site-updates.json` array schema
- `project-meta.json` schema
- `route-metadata.json` schema
- editorial route integrity:
  - required fields for news and writing entries
  - duplicate ID detection across news and writing collections
  - sitemap editorial detail routes match existing static content IDs
- no raw GitHub repository URLs in publishable curated content
- no secret-like token values
- no private implementation URLs
- no localhost URLs in publishable content

`GH_TOKEN` is optional. If absent, script runs in validation-only mode.

### Manual dispatch workflow

- `.github/workflows/github-digest-dispatch.yml` provides manual-only execution via `workflow_dispatch`.
- Default mode is validation-only and must pass without custom secrets.
- Optional enrich mode reuses the same script with `GH_TOKEN` sourced from `secrets.GITHUB_TOKEN`.
- Workflow is read-only (`permissions: contents: read`) and does not auto-commit or auto-push content.

## Backend/frontend content sync rule

When `frontend/src/content/portfolio-content.json` changes, `backend/content/portfolio-content.json` must be updated in the same PR.

If frontend content does not change, backend content must not be touched.
