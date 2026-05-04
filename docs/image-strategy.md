# Image and Visual Asset Strategy

## Objective

The portfolio visual system should communicate technical maturity, calm confidence, and credibility in the Canadian Cloud, DevOps, Platform Engineering, and AI Infrastructure market.

The image system must not look generic, childish, or overly AI-generated. It should feel like a serious engineering platform with a human owner.

## Visual Direction

Brand attributes:

- Enterprise-grade
- Modern
- Technical
- High contrast
- Clean and structured
- Confident but not loud
- Human and approachable
- AI-aware without looking gimmicky

Recommended palette direction:

```text
Deep charcoal
Slate gray
Soft off-white
Muted teal or cyan accent
Subtle violet or blue AI accent
```

Recommended visual motifs:

- Kubernetes control planes
- GitOps pipelines
- secure network paths
- cloud infrastructure maps
- monitoring dashboards
- AI-assisted operations overlays
- Vault/secrets abstraction
- homelab rack or topology concepts
- clean geometric diagrams

Avoid:

- Fake company logos
- Unrealistic data centers
- Overly glossy cyberpunk visuals
- Excessive neon
- Stock-photo engineering cliches
- Fake dashboards with nonsensical data

## Headshot Usage

Three uploaded headshots should be treated as distinct brand assets.

### Primary Professional Portrait

Recommended role:

- Main identity image
- Homepage hero
- About page
- Resume page
- OpenGraph fallback

Suggested repository path:

```text
frontend/public/images/headshots/temitayo-primary.jpg
```

Usage rule:

Use this when the page needs recruiter-facing trust and professional warmth.

### Authentic Portrait

Recommended role:

- About section
- Contact page
- Personal working style section

Suggested repository path:

```text
frontend/public/images/headshots/temitayo-authentic.jpg
```

Usage rule:

Use this when the page needs approachability and human credibility.

### Editorial Black-and-White Portrait

Recommended role:

- LinkedIn banner concept
- GitHub profile banner concept
- Dark-mode brand hero accent
- Executive quote section

Suggested repository path:

```text
frontend/public/images/headshots/temitayo-editorial-bw.jpg
```

Usage rule:

Use carefully. It is visually strong, but it should not overpower the primary identity or make the portfolio feel artificial.

## Image Optimization Requirements

Before production use:

- Resize large originals.
- Convert display assets to modern formats where appropriate.
- Preserve high-quality JPEG or WebP versions.
- Add meaningful alt text.
- Avoid committing unnecessary oversized originals.
- Keep image naming descriptive and stable.

Recommended maximum sizes:

| Use case | Recommended width |
| --- | --- |
| Hero portrait | 1200px |
| Card thumbnail | 800px |
| Blog cover | 1400px |
| OpenGraph image | 1200x630px |
| LinkedIn banner | 1584x396px |
| GitHub banner | 1280x640px |

## Repository Asset Paths

Recommended local asset structure:

```text
frontend/public/images/
  headshots/
  projects/
  blog/
  og/
  diagrams/
  social/
```

Recommended content metadata file:

```text
content/assets.json
```

## Cloudinary Future Option

Cloudinary is useful when the portfolio starts needing dynamic image transformations, responsive delivery, or central asset management.

Do not introduce Cloudinary as a hard dependency before the site needs it. For the first production release, optimized static images in the repository are acceptable.

If Cloudinary is adopted later, use this folder model:

```text
portfolio/
  hero/
  projects/
  blog/
  og/
  linkedin/
  github/
  diagrams/
```

## AI-Generated Visuals

AI-generated visuals may be used for:

- abstract infrastructure backgrounds
- project thumbnails
- OpenGraph images
- social banners
- blog covers
- architecture concept visuals

AI-generated visuals must not:

- misrepresent real employers or clients
- show fake certifications
- imply unverified production scale
- use copyrighted logos incorrectly
- look like generic prompt output

## Required Prompt Archive

If AI visuals are generated, store prompts here:

```text
docs/image-prompts.md
```

Each prompt entry should include:

- date
- target asset
- prompt
- model/tool used
- selected output file
- rejected variants
- notes

## Alt Text Standard

Alt text should be concise and meaningful.

Examples:

```text
Portrait of Temitayo Charles Akinniranye in a dark blazer against a neutral background.
```

```text
Abstract diagram showing GitOps deployment flow from GitHub to Argo CD and Kubernetes.
```

Avoid alt text such as:

```text
image
photo
AI graphic
cool cloud thing
```

## Initial Asset Backlog

| Asset | Purpose | Status |
| --- | --- | --- |
| Primary headshot | Homepage and professional identity | Source provided, needs optimization. |
| Authentic headshot | About/contact warmth | Source provided, needs optimization. |
| Editorial B/W portrait | Social/banner accent | Source provided, needs optimization. |
| Homelab architecture diagram | Case study visual proof | Needed. |
| GitOps pipeline diagram | Case study visual proof | Needed. |
| AI operations diagram | AI infrastructure positioning | Needed. |
| OpenGraph default image | SEO/social sharing | Needed. |
| LinkedIn banner | Professional brand asset | Draft needed. |
| GitHub profile banner | GitHub identity | Draft needed. |
