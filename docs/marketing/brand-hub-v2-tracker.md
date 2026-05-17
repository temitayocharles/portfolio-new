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
