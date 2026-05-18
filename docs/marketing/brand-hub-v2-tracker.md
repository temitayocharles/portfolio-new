# InfraForge Brand Hub V2 Tracker

## Purpose

This tracker controls the redesign of `temitayocharles.online` from a portfolio into the public InfraForge brand hub. It prevents scattered execution by forcing each change through a mapped product narrative, acceptance criteria, and implementation phase.

## Operating rules

- The portfolio website is the public brand hub, not a node in the InfraForge product map.
- The ecosystem map must contain only actual InfraForge systems/products.
- Product storytelling must stay problem-solution oriented, not architecture-dump oriented.
- Project Iris is a governed personal AI assistant, not an engineering assistant.
- Jerry is the mobile AI companion/interface, not a replacement for Iris or ForgeWatch.
- ForgeWatch is the operational intelligence and cluster guardian layer.
- Avoid generic blue AI/SaaS visual language.
- Use premium, dark, restrained, amber/teal, infrastructure-grade visual language.
- Preserve resume and testimonials unless explicitly approved otherwise.
- Private repositories must be marked as private proof assets, not broken public links.

## Current phase

Phase 7: Final production QA and launch readiness.

## Workstreams

| ID | Workstream | Status | Output | Acceptance criteria |
| --- | --- | --- | --- | --- |
| BHV2-001 | Ecosystem map | Done | `docs/marketing/infraforge-ecosystem-map.md` | Every system has role, problem, solution, proof, and website priority. |
| BHV2-002 | Brand hub V2 plan | Done | `docs/marketing/portfolio-website-v2-plan.md` | Defines homepage hierarchy, visual direction, content model, and phased PR plan. |
| BHV2-003 | Visual system brief | Done | `docs/marketing/visual-direction-brief.md` | Defines premium visual rules, avoids blue AI clichés, specifies diagram/animation language. |
| BHV2-004 | Iris positioning correction | Done | Content model update | Iris is represented as personal AI operator, not engineering assistant. |
| BHV2-005 | Jerry/ForgeWatch relationship | Done | Ecosystem section + diagram copy | Jerry, Iris, ForgeWatch, and InfraForge relationship is clear without over-explaining. |
| BHV2-006 | Homepage narrative redesign | Done | Implementation PR | New hero, problem-solution grid, restrained ecosystem map, flagship products. |
| BHV2-007 | Premium visual proof assets | In progress | Interactive architecture maps and future motion plan | Assets feel cinematic, credible, restrained, and product-grade. |
| BHV2-008 | Launch content kit | In progress | LinkedIn/social copy and product screenshots | Launch copy explains InfraForge without sounding forced or salesy. |

## Flagship systems

1. AI Inference Lab
2. Project Iris
3. ForgeWatch / Sentinel Copilot
4. Jerry / AI Mobile Chat
5. InfraForge Platform
6. Young Coders
7. AI Builders Academy
8. Vault Ops

## Execution lanes

### Lane A: Strategy docs

Owner: assistant.

Status: active.

Deliverables:

- ecosystem map
- website V2 plan
- visual direction brief

### Lane B: Content model

Owner: assistant after strategy approval.

Status: blocked until Lane A is reviewed.

Deliverables:

- corrected Project Iris card
- Jerry card
- ForgeWatch/Jerry/Iris loop copy
- education layer copy

### Lane C: UI implementation

Owner: assistant/Codex.

Status: blocked until Lane A and B are approved.

Deliverables:

- new hero
- product-system grid
- ecosystem map
- flagship proof sections

### Lane D: Media and launch assets

Owner: assistant plus visual/video tools if approved.

Status: planned.

Deliverables:

- premium architecture graphics
- short motion clips
- launch copy
- product screenshots

## Definition of done for Phase 1

- Tracker exists.
- Ecosystem map exists.
- Website V2 plan exists.
- No UI code changed in this phase.
- A PR is opened for review.

## Phase 5 visual direction update

Visual-direction work added in this phase:

- `docs/marketing/visual-direction-brief.md`

The production architecture proof surface is the interactive Architecture Lab, not standalone downloadable SVG or PNG files. Raw image files should not be promoted as public launch artifacts unless they meet the premium visual bar.

## Phase 6 launch kit added

Launch content assets added in this phase:

- `docs/marketing/launch-kit.md`
- `docs/marketing/linkedin-launch-posts.md`
- `docs/marketing/product-narrative-snippets.md`
- `docs/marketing/media-generation-prompts.md`

These documents package the brand hub for public release without changing website code.

## Phase 7 launch-readiness QA added

Launch-readiness documents added in this phase:

- `docs/qa/brand-hub-production-qa-report.md`
- `docs/marketing/launch-readiness-checklist.md`

These documents convert the completed brand-hub workstream into a controlled release gate for public launch.

## Corrective architecture pass

This pass removes weak standalone image-asset exposure and makes the Architecture Lab topology-first with animated signal movement. Case-study artifact CTAs should route users to the interactive architecture section instead of opening raw SVG/PNG files.

## Phase 8: Site hub v2 content architecture

Branch: `feature/site-hub-v2-content-architecture`

Scope: Transform hub routes from placeholders into real website sections with curated content, a private-repo-aware GitHub digest model, backend-outage resilience documentation, and expanded Playwright smoke coverage.

### Completed files

- `frontend/src/content/site-updates.json` — curated news and build milestone updates
- `frontend/src/content/github-digest.json` — curated engineering activity digest (private-repo-aware)
- `frontend/src/content/site-sections.json` — editorial taxonomy and section metadata
- `frontend/src/components/portfolio/SiteHubPage.jsx` — enhanced hub page with real content for all six sections
- `frontend/src/services/portfolioContent.js` — added 5-second fetch timeout for backend resilience
- `scripts/generate-github-digest.mjs` — digest validation and optional public repo enrichment script
- `frontend/playwright/smoke.spec.js` — expanded smoke coverage for all hub, legal, and case routes
- `docs/qa/backend-outage-resilience.md` — backend resilience documentation
- `docs/marketing/site-hub-v2-architecture.md` — site hub architecture documentation
- `docs/marketing/brand-hub-v2-tracker.md` — this tracker updated

### Validation commands

```bash
# Confirm branch
git status --short --branch

# Build
cd frontend && yarn install --frozen-lockfile && yarn build

# Smoke tests
cd frontend && yarn test:ui

# Route verifier
SITE_URL="https://temitayocharles.online" node ./scripts/verify-site-routes.mjs

# Digest validator
node scripts/generate-github-digest.mjs
```

### Risks

- Hub pages render from bundled static JSON; content updates require a new deploy.
- GitHub digest enrichment requires `GH_TOKEN` in CI; absent token is non-fatal.

### Follow-up items

- Add individual writing article pages at `/writing/:id`.
- Add workflow_dispatch GitHub Action for digest generation.
- Add RSS/Atom feed for `/news` and `/writing`.

---

## Phase 9: Visual/product polish

**Branch:** `feature/site-hub-v2-visual-product-polish`

**Date:** 2026-05-17

### Files changed

| File | Change |
| --- | --- |
| `frontend/src/components/portfolio/SiteHubPage.jsx` | Full rewrite — improved visual hierarchy, premium card system, flagship spotlight, lab lanes, digest workflow strip, study type categorisation |
| `frontend/src/components/portfolio/CaseStudyPage.jsx` | Full rewrite — numbered section rhythm (01–06), improved above-the-fold hero, accent-per-category, next-evolution section |
| `frontend/src/content/portfolio-content.json` | Added `nextEvolution` field to `caseStudy` for 7 flagship projects |

### Design goals

- Premium dark editorial interface — no blue generic AI gradient.
- Amber/teal accents only, restrained and purposeful.
- Strong hierarchy: flagship systems visually lead the product directory.
- No visual gimmicks, no sci-fi clichés, no raw SVG artifact presentation.
- Design should read as a serious AI infrastructure / platform company website.

### Routes improved

| Route | Improvement |
| --- | --- |
| `/projects` | Added flagship spotlight section (AI Inference Lab, InfraForge, ForgeWatch) with larger FlagshipCard treatment. All cards now show: category tag, maturity badge, problem statement, ecosystem role, pillars, visibility label, case study CTA. Groups use SectionHeader with icon + description. |
| `/lab` | Replaced flat 3-theme layout with 4-lane grid: Model Operations / Agent Surfaces / Infrastructure Experiments / Evaluation & Observability. Each lane has positioning narrative, system links with role descriptions, and cross-cutting concern callout for observability. Iris correctly positioned as personal AI assistant, not engineering tool. |
| `/github` | Added 4-step DigestWorkflowStrip visual (Repository Signals → Curation → PR Review → Public Update). Added digest stats bar (signal count, private-source count, publication gate, raw commits). Signals now render as structured SignalPill chips. |
| `/studies` | Split into 3 typed sections: Case Studies / Architecture Studies / Operational Studies. Each card shows: problem statement (amber left-border), system response, proof snippet, pillars. Feels like a case-study library, not a résumé list. |
| `/case/*` | Numbered content rhythm: 01 Problem / 02 System / 03 Operating Model / 04 Proof / 05 Measurement / 06 Next Evolution. Bigger above-the-fold hero with per-category accent color and rule. Result callout uses amber highlight block. Next Evolution section rendered when `caseStudy.nextEvolution` is present. |

### Shared design system additions (inline in SiteHubPage)

- `ACCENT` token map (teal/amber/neutral) — consistent border/bg/text/dot/rule per accent.
- `Tag` — rounded pill with accent variant.
- `SignalPill` — neutral dark pill for tech stack / signals.
- `MaturityBadge` — status dot + label with accent variant.
- `SectionHeader` — icon + label + description with border-bottom rule.
- `FlagshipCard` — larger spotlight card with top accent rule and ecosystem role block.
- `SectionNum` — numbered section divider for case study rhythm (01–06).

### Validation commands run

```bash
# Build
cd frontend && yarn build
# → Compiled successfully. 165 kB gzip.

# Digest validation
node scripts/generate-github-digest.mjs
# → [OK] github-digest.json: 6 items validated.
# → [OK] site-updates.json: 6 items validated.
```

### Constraints respected

- Resume behavior: not touched.
- Testimonials: not touched.
- GitHub icon: present in Footer (unchanged).
- LinkedIn icon: present in Footer (unchanged).
- No private repository URLs or secrets introduced.
- No new UI framework or large dependency added.
- No root-level package.json introduced.
- All existing routes preserved — no slug changes.
- Backend-outage resilience intact — all content from bundled static JSON.
- No blue generic AI gradient introduced.

### Risks

- `SiteHubPage.jsx` grew significantly (975 lines). If further complexity is needed, split individual section components (ProjectDirectory, LabSection, GitHubSection, StudiesSection) into their own files under `frontend/src/components/portfolio/`.
- `PROJECT_META` and `STUDY_TYPES` lookup tables live inline in SiteHubPage — acceptable at current scale, but should migrate to `site-sections.json` or a separate metadata file if the project count grows past ~15.
- `nextEvolution` is a new optional field on `caseStudy`. Existing projects without it render without the 06 section — backward compatible.

### Follow-up items

- [ ] Split SiteHubPage section components into individual files if the file grows further.
- [ ] Migrate `PROJECT_META` maturity/status/role data into `portfolio-content.json` per-project.
- [ ] Add `/news` editorial header upgrade to match the new SectionHeader system.
- [ ] Consider a `/writing` filter bar (by tag: AI Infrastructure, GitOps, FinOps, etc.).
- [ ] Add `nextEvolution` to `ai-builders-academy` and `young-coders` caseStudy entries when content is ready.
- [ ] Run full Playwright smoke tests after deploy to verify heading changes didn't break any selectors.

---

## Phase 10: Site hub hardening/refactor

**Branch:** `feature/site-hub-v2-hardening-refactor`

### Why this refactor was needed

`frontend/src/components/portfolio/SiteHubPage.jsx` had become too large to safely extend after visual/product polish. Metadata and route behavior were also distributed across page components, which increased drift risk and made public-safety validation incomplete.

### Components extracted

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

### Metadata moved

- `frontend/src/content/project-meta.json` added to hold public-safe project metadata previously inlined in `SiteHubPage` (`PROJECT_META` and study typing fields).
- `frontend/src/content/route-metadata.json` added to hold route-level metadata for hub routes, legal routes, homepage, and case-study routes.
- `frontend/src/components/portfolio/useRouteMetadata.js` added to set `document.title` and `meta[name="description"]` safely without adding dependencies.

### Validation added

- `scripts/generate-github-digest.mjs` now validates:
  - `github-digest.json` array shape and required digest fields including `publishNotes`
  - `site-updates.json` array shape
  - `project-meta.json` schema and public-safety flags
  - `route-metadata.json` schema and public-safety flags
  - secret-like tokens, private implementation URLs, raw GitHub repo URLs, and disallowed localhost URLs in publishable content
- script remains validation-first and does not require `GH_TOKEN`.

### Files changed

- Hub refactor and route orchestrator:
  - `frontend/src/components/portfolio/SiteHubPage.jsx`
  - `frontend/src/components/portfolio/hub/*`
- Route metadata and project metadata:
  - `frontend/src/content/project-meta.json`
  - `frontend/src/content/route-metadata.json`
  - `frontend/src/components/portfolio/useRouteMetadata.js`
  - `frontend/src/App.js`
  - `frontend/src/components/portfolio/LegalPage.jsx`
- Validation/test/doc updates:
  - `scripts/generate-github-digest.mjs`
  - `frontend/playwright/smoke.spec.js`
  - `docs/marketing/site-hub-v2-architecture.md`
  - `docs/marketing/brand-hub-v2-tracker.md`

### Commands run

```bash
git status --short --branch
cd frontend
yarn install --frozen-lockfile
yarn build
yarn test:ui
cd ..
node scripts/generate-github-digest.mjs
git diff --check
SITE_URL="https://temitayocharles.online" node ./scripts/verify-site-routes.mjs
```

### Risks

- Refactor touches route rendering internals; regressions are most likely in hub section wiring and metadata lookups.
- New content-validation rules may fail future edits that were previously accepted; this is intentional but requires discipline from future editors.

### Follow-up items

- Add a small unit test around `useRouteMetadata` behavior in jsdom.
- Consider deriving route metadata defaults from route config where titles/descriptions are intentionally parallel.
- Keep frontend/backend `portfolio-content.json` in sync whenever frontend content file changes in future PRs.

---

## Phase 11: Editorial depth for /news and /writing

**Branch:** `feat/editorial-depth-news-writing`

### Focus

Increase editorial depth and credibility for `/news` and `/writing` without changing route structure, adding detail routes, or redesigning the broader site system.

### Implementation summary

- `/news` upgraded from a flat card list to an editorially framed updates surface:
  - publication posture panel
  - grouped lanes for platform/operations and AI systems updates
  - explicit public-safe publishing note
- `/writing` upgraded from a flat list to a structured editorial index:
  - editorial context panel
  - thematic tracks (platform engineering, AI systems, product/operations)
  - suggested reading path framing
- route metadata descriptions for `/news` and `/writing` updated to reflect the stronger editorial positioning while staying concise and non-hype.

### Files changed

- `frontend/src/components/portfolio/hub/NewsHubSection.jsx`
- `frontend/src/components/portfolio/hub/WritingHubSection.jsx`
- `frontend/src/content/route-metadata.json`
- `docs/marketing/brand-hub-v2-tracker.md`

### Boundaries respected

- No new routes and no `/writing/:id` detail routes.
- No backend dependency added for first render.
- No browser-side GitHub API calls.
- No resume/testimonial/icon behavior changes.
- No private repository names, private URLs, secrets, or tokens introduced.

---

## Phase 12: Editorial detail routes

**Branch:** `feat/editorial-detail-routes`

### Focus

Add public-safe detail routes for `/news/:id` and `/writing/:id` so hub index cards can lead to deeper editorial pages without introducing backend-first rendering dependencies.

### Implementation summary

- Added route support for:
  - `/news/:id` (from `frontend/src/content/site-updates.json`)
  - `/writing/:id` (from `frontend/src/content/portfolio-content.json` writings)
- Added detail-page rendering with:
  - safe back navigation
  - title/category/date/summary context
  - concise body sections, takeaways, and related links
  - public-safety note
- Added safe not-found states for unknown IDs on both route families.
- Linked index cards from `/news` and `/writing` to their respective detail routes.
- Extended metadata handling for dynamic detail routes via runtime metadata overrides.
- Expanded route verifier and Playwright smoke checks with representative detail-route coverage.

### Files changed

- `frontend/src/App.js`
- `frontend/src/components/portfolio/EditorialDetailPage.jsx`
- `frontend/src/components/portfolio/useRouteMetadata.js`
- `frontend/src/components/portfolio/hub/NewsHubSection.jsx`
- `frontend/src/components/portfolio/hub/WritingHubSection.jsx`
- `frontend/src/content/site-updates.json`
- `frontend/src/content/portfolio-content.json`
- `backend/content/portfolio-content.json`
- `frontend/src/content/route-metadata.json`
- `scripts/verify-site-routes.mjs`
- `frontend/playwright/smoke.spec.js`
- `docs/marketing/brand-hub-v2-tracker.md`
- `docs/marketing/site-hub-v2-architecture.md`

### Boundaries respected

- No browser-side GitHub API calls.
- No backend dependency for first render.
- No resume/testimonial/icon behavior changes.
- No private repository names, private URLs, tokens, secrets, or internal hostnames introduced.

---

## Phase 13: Editorial route SEO hardening

**Branch:** `feat/editorial-route-seo-hardening`

### Focus

Harden discoverability and validation coverage for `/news/:id` and `/writing/:id` by enforcing sitemap completeness, content-driven route verification, and deterministic editorial-route checks.

### Implementation summary

- `frontend/public/sitemap.xml` now includes all public-safe news detail routes and all writing detail routes derived from static content IDs.
- `scripts/verify-site-routes.mjs` now derives editorial detail routes from static content (`site-updates.json`, `portfolio-content.json`) instead of checking only representative paths.
- `scripts/generate-github-digest.mjs` now validates:
  - required editorial fields for news and writing entries
  - duplicate IDs in news/writings
  - sitemap editorial detail URLs map exactly to static content IDs (missing and unknown route checks)
- Dynamic metadata behavior remains authoritative for detail pages:
  - `<entry title> | News | Temitayo Charles Akinniranye`
  - `<entry title> | Writing | Temitayo Charles Akinniranye`

### Files changed

- `frontend/public/sitemap.xml`
- `scripts/verify-site-routes.mjs`
- `scripts/generate-github-digest.mjs`
- `docs/marketing/brand-hub-v2-tracker.md`
- `docs/marketing/site-hub-v2-architecture.md`

### Boundaries respected

- No browser-side GitHub API calls added.
- No backend-first-render dependency added.
- No resume/testimonial/icon behavior changes.
- No private implementation details exposed.

---

## Phase 14: Manual GitHub digest workflow

**Branch:** `feat/github-digest-workflow-dispatch`

### Focus

Add a manual-only GitHub Actions path to run digest validation (default) and guarded optional enrichment without browser-side API calls or automatic publishing.

### Implementation summary

- Added `.github/workflows/github-digest-dispatch.yml` with `workflow_dispatch` only.
- Run modes:
  - `validation` (default): runs `node scripts/generate-github-digest.mjs` with no token dependency.
  - `enrich` (optional): passes `secrets.GITHUB_TOKEN` as `GH_TOKEN` to the same script; enrichment remains script-guarded and public-safe.
- Workflow uses least privilege (`permissions: contents: read`).
- No schedule, no push trigger, no pull_request trigger.
- No auto-commit, no auto-push, no auto-PR.
- Run log is uploaded as an artifact for operator review.

### Operator notes

- Validation-only mode must continue to succeed without custom secrets.
- Enrichment mode is optional and should be treated as a manual, supervised operation.
- Never publish private repository names, private URLs, raw private commits, tokens, or sensitive implementation details.

---

## Phase 15: Trust/accessibility/conversion hardening

**Branch:** `feat/trust-accessibility-conversion-hardening`

### Focus

Address low-risk trust and conversion concerns without redesigning the public brand hub.

### Implementation summary

- Added conservative CSP in `frontend/public/_headers` while preserving existing security/cache headers.
- Added explicit `WebSite` + `Person` JSON-LD in `frontend/public/index.html` using public-safe fields only.
- Kept existing `ProfilePage` structured data, now linked to the explicit `Person` and `WebSite` nodes.
- Tightened CTA clarity with minimal copy changes:
  - `View Projects` -> `Explore Projects`
  - Added `Read Case Studies` CTA on hero
- Patched stale trust copy in platform showcase:
  - `Launching soon` -> `In active development`
  - `DNS pending` -> `Public rollout in progress`
- Added lightweight accessibility smoke assertions for primary nav and key CTA accessible names.

### Security and tradeoff note

- CSP currently allows `'unsafe-inline'` for scripts/styles because the existing static template includes inline scripts and Google Fonts stylesheet loading. This is an explicit compatibility tradeoff, not a perfect final-state CSP.
