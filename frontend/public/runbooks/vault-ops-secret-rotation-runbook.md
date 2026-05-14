# Vault Ops Secret Rotation Runbook

## Purpose
Rotate a platform secret safely across Vault, External Secrets, Kubernetes workloads, and application rollout boundaries.

## Procedure
1. Confirm secret owner, consuming workloads, and rollback value location.
2. Write the new value to Vault under the approved path.
3. Validate ExternalSecret sync and Kubernetes Secret shape.
4. Restart or roll workloads only after sync confirmation.
5. Verify application health and audit logs.

## Rollback
Restore the previous Vault value, force ExternalSecret refresh, restart affected workloads, and confirm service recovery.
