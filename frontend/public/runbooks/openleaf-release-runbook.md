# OpenLeaf Release Runbook

## Purpose
Release a cloud-native SaaS change across frontend, API, gateway, event, and observability boundaries.

## Procedure
1. Confirm changed services and API contracts.
2. Validate gateway configuration with decK.
3. Run service tests and dependency checks.
4. Promote images and reconcile through Argo CD.
5. Verify service health, queue behavior, payment workflow, and dashboard telemetry.

## Rollback
Revert gateway/service manifests, redeploy previous image tags, and validate synthetic user flows.
