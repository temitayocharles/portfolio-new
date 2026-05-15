# InfraForge Brand Hub Launch Readiness Checklist

## Purpose

This checklist controls the final public-release sequence for `temitayocharles.online` as the InfraForge brand hub.

## Release state

- [x] Strategy tracker exists.
- [x] Ecosystem map exists.
- [x] Portfolio Website V2 plan exists.
- [x] Content model includes `brandSystems`.
- [x] Project Iris is corrected as a personal AI assistant.
- [x] Jerry is positioned as the mobile AI companion.
- [x] ForgeWatch is positioned as operational intelligence / cluster guardian.
- [x] Ecosystem UI section is merged.
- [x] Flagship Proof section is merged.
- [x] Premium static proof assets are merged.
- [x] Launch kit is merged.
- [x] Production route audit passes.

## Final production QA

### Automated checks

- [x] Production route audit passes.
- [x] Case-study routes return HTTP 200.
- [x] Resume PDF returns HTTP 200.
- [x] Interactive architecture section is reachable from case-study artifact CTAs.
- [x] Architecture SVG assets return HTTP 200.
- [x] Runbook assets return HTTP 200.
- [x] `sitemap.xml` returns HTTP 200.
- [x] `robots.txt` returns HTTP 200.
- [x] GitHub profile link returns HTTP 200.
- [x] LinkedIn automated-check warning is non-fatal and documented.

### Manual visual checks

- [ ] Desktop homepage visual pass.
- [ ] Mobile homepage visual pass.
- [ ] Hero section readability.
- [ ] Ecosystem section readability.
- [ ] Flagship Proof section readability.
- [ ] Architecture section readability.
- [ ] Contact section CTA clarity.
- [ ] Case-study page typography and spacing.
- [ ] Resume opens in a real browser.
- [ ] GitHub icon opens the correct profile.
- [ ] LinkedIn icon opens the correct profile.

### Brand checks

- [x] Site reads as an InfraForge public brand hub, not only a résumé.
- [x] Problem-solution storytelling is present.
- [x] Iris is not described as an engineering assistant.
- [x] Jerry, Iris, and ForgeWatch have distinct roles.
- [x] New visuals avoid generic blue AI/SaaS treatment.
- [x] Testimonials remain untouched.
- [x] Resume remains untouched.

### Launch assets

- [x] Launch kit exists.
- [x] LinkedIn launch post drafts exist.
- [x] Product narrative snippets exist.
- [x] Media-generation prompts exist.
- [x] Architecture proof is handled through the interactive Architecture Lab, not raw SVG downloads.
- [ ] Launch screenshots captured from the interactive Architecture Lab and Flagship Proof sections.
- [ ] Final LinkedIn post selected.
- [ ] Final launch image or carousel selected.

## Launch sequence

1. Pull latest `main`.
2. Run production route audit.
3. Complete manual desktop and mobile QA.
4. Capture screenshots.
5. Select launch post from `docs/marketing/linkedin-launch-posts.md`.
6. Select or generate launch media from `docs/marketing/media-generation-prompts.md`.
7. Publish the launch post.
8. Monitor site traffic, profile views, and inbound messages.
9. Capture feedback and create follow-up issues.

## No-go criteria

Do not publish the launch post if any of these occur:

- Production homepage fails to load.
- Any internal case-study route returns non-200.
- Resume PDF is unavailable.
- Mobile layout is visibly broken.
- CTAs point to incorrect destinations.
- Project Iris is described as an engineering assistant.
- Testimonials are unintentionally changed.
- LinkedIn/GitHub icon links are missing from the visible site.

## Go criteria

Public launch is approved when:

- Route audit passes.
- Manual desktop/mobile QA passes.
- Resume opens correctly.
- GitHub and LinkedIn links open correctly in a real browser.
- Main launch post is reviewed.
- Screenshot or launch media is ready.

## Current recommendation

Proceed to public launch after manual visual QA and screenshot capture.
