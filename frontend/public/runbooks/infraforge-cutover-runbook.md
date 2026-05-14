# InfraForge Platform Cutover Runbook

## Purpose
Move a platform workload through DNS, gateway, GitOps sync, secret validation, and recovery checks with an operator-visible path.

## Preconditions
- Argo CD application is healthy in staging.
- ExternalSecret resources are synced and current.
- Gateway route has been reviewed.
- Rollback commit and DNS rollback path are documented.

## Procedure
1. Confirm Git commit, image tag, and Argo CD target revision.
2. Validate Vault and External Secrets sync.
3. Apply gateway route through GitOps.
4. Confirm TLS, DNS, and upstream health.
5. Watch application metrics, logs, and synthetic smoke checks for 30 minutes.

## Rollback
Revert the GitOps change, confirm Argo CD reconciliation, restore previous DNS/gateway route, and validate service health.
