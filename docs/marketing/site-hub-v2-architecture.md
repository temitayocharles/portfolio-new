# Site hub v2 architecture

## Purpose

`temitayocharles.online` is no longer a portfolio landing page. It is the public center-hub for:

- Temitayo Charles
- InfraForge
- AI Inference Lab
- ForgeWatch / Sentinel Copilot
- Project Iris
- Jerry / AI Mobile Chat
- Young Coders
- AI Builders Academy
- OpenLeaf
- Vault Ops
- Platform engineering, GitOps, DevSecOps, AI operations, education, and product work

## Route map

| Route | Purpose |
|---|---|
| `/` | Homepage — front door, hero, skills, experience, projects, architecture, writing, testimonials, contact |
| `/projects` | Product and platform directory grouped by category |
| `/news` | Curated launch notes, build milestones, and platform updates |
| `/writing` | Technical essays, platform thinking, and engineering narratives |
| `/studies` | Deep case studies and architecture studies |
| `/lab` | AI infrastructure, model operations, agents, and experiments |
| `/github` | Curated engineering activity digest (private-repo-aware) |
| `/case/:id` | Individual case study pages |
| `/trust-safety` | Trust and safety policy |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of use |

## Content taxonomy

### Static content files

| File | Purpose |
|---|---|
| `frontend/src/content/portfolio-content.json` | Primary content: profile, projects, writings, experiences, skills, testimonials |
| `frontend/src/content/site-updates.json` | Curated news and build milestone updates |
| `frontend/src/content/github-digest.json` | Curated engineering activity digest |
| `frontend/src/content/site-sections.json` | Editorial taxonomy and section metadata |

### Project groups (`/projects`)

1. Flagship AI and platform systems — AI Inference Lab, InfraForge, ForgeWatch
2. Personal AI systems — Project Iris, Jerry
3. Education products — Young Coders, AI Builders Academy
4. Infrastructure and DevSecOps systems — Vault Ops, OpenLeaf

### Lab themes (`/lab`)

1. Model operations — AI Inference Lab
2. Agent surfaces — Project Iris, Jerry, ForgeWatch
3. Infrastructure experiments — InfraForge, Vault Ops

## Private-repo-aware digest model

Most important repositories are private. The digest model is designed to publish meaningful engineering signals without leaking implementation details.

### Rules

- `publicSafe: true` is required for all publishable digest items.
- `publicSafe: false` causes the validation script to fail.
- No private repository URLs are published.
- No raw commit history is published.
- No private repository names are published unless already intended for public positioning.
- Generated digest content goes through a PR review gate before becoming public.

### Content sources

- `github-digest.json` — manually curated, reviewed before publication.
- Optional GitHub API enrichment via `scripts/generate-github-digest.mjs` — only enriches explicitly public repositories when `GH_TOKEN` is present.

### Digest item fields

```json
{
  "id": "unique-id",
  "title": "Human-readable title",
  "sourceType": "curated",
  "repoVisibility": "public | private | mixed",
  "category": "Category label",
  "summary": "Public-safe summary",
  "publicSafe": true,
  "signals": ["capability signal 1", "capability signal 2"],
  "publishNotes": "Editorial notes for reviewers"
}
```

## Editorial workflow

1. Engineer or assistant drafts new content in the relevant JSON file.
2. `node scripts/generate-github-digest.mjs` validates structure and `publicSafe` flags.
3. A PR is opened for review.
4. Reviewer confirms no private details are exposed.
5. PR is merged and content is live on next deploy.

## What not to publish

- Private repository URLs or names (unless already public-facing).
- Raw commit messages or commit SHAs.
- Internal service routes, API paths, or data schemas.
- Vault paths, policy names, or environment-specific configuration.
- Cluster names, node IPs, or internal network topology.
- Any credential, token, or secret material.
- Operational runbook details that would help an attacker.

## Backend resilience

The site renders entirely from bundled static content. The backend API is optional enrichment. See `docs/qa/backend-outage-resilience.md` for the full behavior matrix.

## Future phases

- Phase 2: Add individual writing article pages at `/writing/:id`.
- Phase 3: Add a digest generation workflow (workflow_dispatch GitHub Action) that opens a PR with enriched public repo metadata.
- Phase 4: Add a studies index with filterable architecture study cards.
- Phase 5: Add lab experiment detail pages.
- Phase 6: Add RSS/Atom feed for `/news` and `/writing`.
