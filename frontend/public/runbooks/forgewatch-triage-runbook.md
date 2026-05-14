# ForgeWatch Alert Triage Runbook

## Purpose
Use evidence-first AI triage without giving autonomous write authority to production.

## Procedure
1. Collect alert, affected namespace, service, and time window.
2. Query Kubernetes events, pod status, Argo CD health, Prometheus metrics, and Loki logs.
3. Generate a read-only incident summary.
4. Create a proposed remediation only after evidence is attached.
5. Require explicit operator approval before any mutating action.

## Safety Rule
No remediation runs automatically. Every write path must pass through proposal, policy check, and human approval.
