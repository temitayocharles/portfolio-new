# Portfolio Platform Task Board

This file mirrors the GitHub Issues created for the implementation sequence.

## Active Issues

| Issue | Title | Purpose | Status |
| --- | --- | --- | --- |
| #2 | Ship Vercel frontend production deployment | Deploy the public React frontend through Vercel. | Open |
| #3 | Publish backend API image to GHCR | Build and publish the FastAPI backend image. | Open |
| #4 | Add portfolio-api Helm chart in helm-charts | Create the hardened Kubernetes workload chart. | Open |
| #5 | Wire portfolio backend into vault-ops | Add Vault/ESO service identity and secret flow. | Open |
| #6 | Deploy portfolio-api through homelab-gitops | Deploy the backend with Argo CD. | Open |
| #7 | Expose portfolio API through Envoy Gateway and Cloudflare Tunnel | Publicly route the API after approval. | Open |
| #8 | Upgrade portfolio content, AI positioning, and headshot usage | Improve content and visual positioning. | Open |
| #9 | Add SEO, analytics, and launch measurement | Add measurable conversion and SEO layer. | Open |
| #10 | Complete launch validation and final report | Final smoke testing and launch readiness. | Open |

## Execution Order

1. Merge platform foundation and backend containerization into `main`.
2. Run backend CI to publish the GHCR image.
3. Create the Helm chart in `helm-charts`.
4. Add Vault service identity in `vault-ops`.
5. Seed approved secrets into Vault.
6. Add homelab GitOps ApplicationSet and values.
7. Validate backend internally in K3s.
8. Request approval for Cloudflare public hostname changes.
9. Expose backend through Cloudflare Tunnel and Envoy Gateway.
10. Deploy Vercel frontend with final backend URL.
11. Upgrade content, headshots, SEO, analytics, and launch pages.
12. Complete launch validation and final report.

## Approval Gates

Explicit approval is required before:

- modifying Cloudflare public hostnames or DNS records;
- publishing LinkedIn or GitHub profile content externally;
- rotating production secrets;
- sending non-test external emails;
- exposing sensitive private data;
- deleting repositories, databases, deployments, or Vault paths;
- using paid services.

## Current Architectural Decision

The primary backend runtime is the homelab K3s cluster, not Render or Vercel serverless. Render remains a fallback only.

Final intended deployment:

```text
Vercel frontend
  -> api.temitayocharles.online
  -> Cloudflare Tunnel
  -> Envoy Gateway
  -> portfolio-api Service
  -> FastAPI backend Pod
  -> MongoDB Atlas and Resend
```
