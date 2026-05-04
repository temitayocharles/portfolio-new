# Kubernetes GitOps Multi-App Platform

## Status

Draft source content. Verify all implementation details before publishing on the production site.

## Executive Summary

Designed a Kubernetes GitOps platform pattern that separates application code, container images, Helm charts, environment values, and secrets management. The platform uses Argo CD to continuously reconcile declared state into the cluster and gives each workload a repeatable path from source code to runtime.

## Architecture

Core architecture:

```text
Application repositories
  -> GitHub Actions
  -> GitHub Container Registry
  -> Helm charts repository
  -> GitOps values repository
  -> Argo CD ApplicationSet
  -> Kubernetes workloads
```

Primary components:

- GitHub repositories for application source.
- Shared GitHub Actions workflows.
- GHCR for images.
- Helm chart repository for reusable deployment templates.
- GitOps repository for environment values and Argo CD applications.
- Vault and External Secrets Operator for secrets.
- Argo CD for sync, self-heal, and pruning.

## Implementation

The platform follows a multi-repository operating model:

- App repositories own source code and Dockerfiles.
- Shared workflows standardize CI and image publishing.
- Helm chart repository owns deployment templates.
- GitOps repository owns environment-specific values and image overrides.
- Vault repository owns secret access boundaries.

This separation improves reviewability, reduces configuration drift, and keeps each repository focused on one responsibility.

## Security

Security controls:

- No secrets committed to Git.
- Vault-backed secret delivery.
- Dedicated service identities per workload.
- Container security contexts in Helm charts.
- NetworkPolicies where supported.
- Pull request review path for infrastructure changes.

## CI/CD

Delivery flow:

```text
merge to main
  -> CI validates service
  -> Docker image is built
  -> image is pushed to GHCR
  -> GitOps image tag is updated or promoted
  -> Argo CD reconciles workload
```

## Observability

The platform should surface:

- Argo CD sync status.
- workload health.
- deployment rollout state.
- logs and metrics.
- route availability.
- image and configuration drift.

## AI and Automation Presence

This platform creates the foundation for AI-assisted operations. Because workloads are described declaratively in Git and health state is available through platform APIs, AI tools can assist with summarization, investigation, and documentation without directly mutating infrastructure.

## Troubleshooting

Common troubleshooting areas:

- Argo CD sync failures.
- invalid Helm templates.
- missing values files.
- image pull errors.
- secret sync failures.
- readiness probe failures.
- Gateway route mismatch.

## Lessons Learned

- GitOps works best when repository boundaries are clear.
- Helm values must be structured consistently.
- Image tags should be promoted intentionally.
- Secret management and deployment automation must be designed together.
- Documentation is part of the operating system.

## Future Roadmap

- Add automated Helm validation to every chart change.
- Add image promotion automation.
- Add release evidence generation.
- Add stronger policy checks.
- Add dashboard views for deployment health.

## Proof Points To Add

- ApplicationSet example.
- GitOps repository structure diagram.
- Image promotion flow.
- Argo CD sync screenshot.
- TODO: Replace with verified personal metric.
