# Proxmox K3s Home Lab

## Status

Draft source content. Verify all implementation details before publishing on the production site.

## Executive Summary

Built and operated a production-style homelab platform using Proxmox, K3s, GitOps, secure secret delivery, persistent storage, public routing, and observability tooling. The platform is designed to turn a personal lab into a realistic environment for practicing infrastructure operations, deployment automation, security controls, troubleshooting, and AI-enabled platform workflows.

## Architecture

Core components:

- Proxmox virtualization layer
- K3s Kubernetes cluster
- Argo CD for GitOps reconciliation
- Helm for workload packaging
- Vault for secrets management
- External Secrets Operator for Kubernetes secret sync
- Longhorn for persistent storage
- Envoy Gateway for Gateway API routing
- Cloudflare Tunnel for public exposure without direct home network exposure
- Observability tooling for metrics, logs, and alerting

High-level flow:

```text
GitHub repositories
  -> Argo CD root app
  -> ApplicationSets and Helm charts
  -> K3s workloads
  -> Envoy Gateway
  -> Cloudflare Tunnel
  -> public service endpoints
```

## Implementation

The platform uses a GitOps operating model where infrastructure and application state are managed through repositories rather than manual cluster changes. Application source, Helm charts, GitOps environment values, and Vault policy definitions are separated across repositories to mirror real platform engineering practices.

Key implementation patterns:

- App-of-apps Argo CD root application.
- ApplicationSets for grouped workload deployment.
- Helm chart and values separation.
- Dedicated environment override files.
- Image tag override files for controlled promotion.
- Vault-backed ExternalSecrets for runtime secrets.
- Gateway API HTTPRoutes for public and internal routing.

## Security

Security themes:

- Secrets are stored in Vault, not Git.
- External Secrets Operator creates Kubernetes Secrets from approved Vault paths.
- Public services are routed through Cloudflare Tunnel and Envoy Gateway.
- Network exposure avoids direct home IP service publication where practical.
- Workloads should run as non-root containers with explicit resource limits.

## CI/CD

The deployment model separates build and release concerns:

```text
Application repo
  -> GitHub Actions
  -> GHCR image
  -> Helm chart values update
  -> Argo CD reconciliation
  -> K3s deployment
```

## Observability

The platform is intended to support:

- Kubernetes health checks
- Argo CD sync and health state
- workload logs
- metrics and dashboards
- alerting for platform services

## AI and Automation Presence

The homelab provides a foundation for AI-assisted operations: read-only operational context, troubleshooting workflows, observability summaries, and operator-support tooling. AI should augment the engineering workflow, not bypass security boundaries or human review.

AI-related concerns to highlight:

- Human-in-the-loop review
- read-only operational boundaries
- observability context retrieval
- safe automation design
- cost-aware experimentation

## Troubleshooting

Troubleshooting areas to document as the case study matures:

- Cloudflare Tunnel route issues
- Envoy Gateway HTTPRoute misconfiguration
- secret sync failures
- Kubernetes readiness probe failures
- storage and PVC behavior
- image pull and registry authentication errors

## Lessons Learned

- Homelab systems are most valuable when operated like production.
- GitOps improves repeatability and reviewability.
- Secrets management should be introduced early, not after the platform grows.
- Public routing requires clear documentation and approval gates.
- AI operations need guardrails before automation depth increases.

## Future Roadmap

- Add stronger automated validation for GitOps changes.
- Add more complete dashboards and alerting.
- Add backup and recovery evidence.
- Add image signing or stronger supply-chain controls.
- Add documented AI-assisted operations workflows.
- Add cost and resource utilization reporting.

## Proof Points To Add

- Architecture diagram.
- Argo CD screenshot.
- Vault/ESO flow diagram.
- Envoy Gateway and Cloudflare routing diagram.
- Example deployment lifecycle.
- TODO: Replace with verified personal metric.
