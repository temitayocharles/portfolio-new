# Manual Production Visual QA

Date: 2026-05-18
Site: https://temitayocharles.online
Main commit: 457e3f3 Update homepage mobile layout (#67)

## Validation Baseline

- Route validation: passed
- Production asset validation: passed
- Rendered production QA: passed
- Working tree before QA: clean

## Viewports Tested

- Desktop: 1440px width
- Tablet: 768px width
- Mobile: 390px width

## Routes Reviewed

- [x] /
- [x] /projects
- [x] /studies
- [x] /lab
- [x] /github
- [x] /news
- [x] /writing
- [x] /news/site-hub-foundation
- [x] /writing/w-ai-inference-lab
- [x] /case/ai-inference-lab
- [x] /case/infraforge
- [x] /case/sentinel-copilot
- [x] /case/project-iris
- [x] /case/jerry
- [x] /case/openleaf
- [x] /case/vault-ops
- [x] /trust-safety
- [x] /privacy-policy
- [x] /terms
- [x] /assets/TCA-Resume-DevOps.pdf

## Findings

### Blockers

None.

### Major Issues

None.

### Minor Issues

- Repeated browser console CSP errors on `/` and `/case/*` routes for blocked request to `https://api.temitayocharles.online/api/content`.
  - Follow-up fix: allow explicit public API origin in CSP `connect-src` (`https://api.temitayocharles.online`) while preserving static-first rendering.
- PDF route check (`/assets/TCA-Resume-DevOps.pdf`) reports Playwright `net::ERR_ABORTED` during `page.goto`, which is consistent with browser download behavior, not render failure.

### Visual / Copy Observations

- All tested routes rendered with meaningful body content across desktop/tablet/mobile (`bodyTextLength > 0` for all HTML routes).
- No horizontal overflow detected in this run on desktop, tablet, or mobile.
- Editorial detail routes and legal pages rendered with expected structure and titles.

## Specific Checks

### Mobile

- [x] No horizontal overflow
- [x] Hero is readable
- [x] Hero CTAs are easy to tap
- [x] Static hero tool chips wrap cleanly
- [x] Skills section does not feel like a keyword wall
- [x] Platform cards are readable and tappable
- [x] Testimonials do not clip awkwardly
- [x] Contact section is usable

### Desktop

- [x] Hero hierarchy feels premium and clear
- [x] Section rhythm is not cramped
- [x] Case study cards have clear visual hierarchy
- [x] Editorial pages feel intentional, not placeholder-like
- [x] Footer is complete and not abrupt

### Trust / Safety

- [x] Privacy Policy loads
- [x] Terms loads
- [x] Trust & Safety loads
- [x] Resume PDF opens
- [x] GitHub link works
- [x] LinkedIn link works manually in browser
- [x] No private/internal details visible

## Decision

- [ ] No follow-up PR needed
- [x] Follow-up PR needed

If follow-up PR is needed, proposed branch:

feat/manual-visual-qa-fixes

## Proposed Follow-up Scope

- Apply narrow CSP `connect-src` update for optional public content API origin to remove console noise while keeping static-first behavior.
