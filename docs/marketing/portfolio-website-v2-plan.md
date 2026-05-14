# Portfolio Website V2 Plan

## Goal

Reposition `temitayocharles.online` from a personal portfolio into the public InfraForge brand hub.

The site should communicate a premium, credible, AI-native infrastructure brand without becoming an architecture dump or generic AI SaaS page.

## Strategic direction

### Primary message

InfraForge builds governed AI systems and the infrastructure they need to operate reliably.

### Supporting message

The ecosystem spans model operations, operational intelligence, personal AI assistance, mobile AI interaction, secure platform engineering, and practical AI education.

## Non-goals

- Do not make the website a résumé.
- Do not make the ecosystem map include the website itself.
- Do not describe Iris as an engineering assistant.
- Do not make every repo look equally important.
- Do not use generic blue AI gradients, cartoon robots, or cheap neon visuals.
- Do not over-explain internal architecture to public visitors.

## Homepage V2 structure

### 1. Hero

Purpose: establish InfraForge as a premium AI-native infrastructure and governed AI systems brand.

Suggested copy direction:

> InfraForge builds governed AI systems and the infrastructure they need to operate reliably.

Supporting copy should mention model operations, personal AI operators, operational intelligence, Kubernetes-native platforms, secure automation, and practical AI education.

### 2. Problem-solution product grid

Purpose: present each system as a problem-solution story.

Priority systems:

1. AI Inference Lab
2. Project Iris
3. ForgeWatch
4. Jerry
5. InfraForge Platform
6. Young Coders / AI Builders Academy

### 3. Subtle ecosystem diagram

Purpose: show connection without becoming an architecture manual.

Visual rule: restrained, premium, dark, amber/teal, high-contrast, clean labels.

Diagram should show:

- Foundation: InfraForge Platform
- Model operations: AI Inference Lab
- Operational intelligence: ForgeWatch
- Personal AI: Iris
- Mobile companion: Jerry
- Learning products: Young Coders / AI Builders Academy
- Security proof: Vault Ops

### 4. Flagship proof sections

Purpose: provide depth without overwhelming the homepage.

Sections:

- AI Inference Lab: model serving, benchmarks, runtime, GPU capacity
- Project Iris: personal AI operator, everyday work, approvals, memory, tools
- ForgeWatch: operational intelligence, KeepHQ, signals, incidents, cluster health
- InfraForge Platform: GitOps, Kubernetes, Vault, observability, delivery

### 5. Education layer

Purpose: show product breadth and social/learning angle.

Feature:

- Young Coders
- AI Builders Academy

### 6. Founder/operator credibility

Purpose: connect the brand back to Temitayo Charles without making the site a résumé.

Use founder credibility, proof-of-work, and systems-building language.

### 7. Contact CTA

Purpose: invite conversations, partnerships, roles, demos, and collaborations.

## Visual direction

Use:

- deep charcoal/black backgrounds
- amber and teal accents
- restrained gradients
- premium cards
- high spacing discipline
- editorial typography
- product-diagram aesthetics
- subtle motion
- architecture/proof artifacts

Avoid:

- generic blue AI SaaS gradients
- glowing orb clichés
- cartoon robots
- low-trust dashboard clutter
- overstuffed technical tables

## Content model changes required

- Add Project Iris as a flagship product/system.
- Add Jerry as a connected mobile AI companion.
- Correct Iris copy to personal AI assistant/operator, not engineering assistant.
- Add Young Coders and AI Builders Academy as education-layer systems.
- Keep AI Inference Lab, ForgeWatch, and InfraForge Platform as flagship systems.
- Keep private repos marked as private proof assets.

## Implementation PR sequence

### PR 1: Strategy docs and tracker

Status: current.

Changes:

- tracker
- ecosystem map
- website V2 plan

No UI changes.

### PR 2: Content model update

Changes:

- add Iris and Jerry content objects
- add education-layer content
- update homepage copy source
- keep testimonials/resume unchanged

### PR 3: Ecosystem map UI

Changes:

- new restrained InfraForge ecosystem section
- product-system cards
- no heavy animation yet

### PR 4: Flagship proof redesign

Changes:

- redesign AI Inference Lab, Iris, ForgeWatch, and InfraForge sections
- add visual proof slots
- clean case-study hierarchy

### PR 5: Premium media assets

Changes:

- diagrams
- short video/animation clips
- product mockups
- launch screenshots

### PR 6: Launch kit

Changes:

- LinkedIn launch copy
- short-form posts
- product narrative snippets
- founder story copy

## Acceptance criteria for V2

- The site reads as a public InfraForge brand hub.
- The story is problem-solution oriented.
- Iris is correctly represented as a personal AI assistant.
- Jerry, Iris, and ForgeWatch have a clear relationship.
- The design feels premium and credible.
- No generic blue AI visual treatment dominates.
- Internal and external route checks remain healthy.
- CI, Playwright, Lighthouse, and security checks remain green.
