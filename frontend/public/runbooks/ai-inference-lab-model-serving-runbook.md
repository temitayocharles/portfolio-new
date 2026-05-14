# AI Inference Lab Model-Serving Runbook

## Purpose

Operate the InfraForge AI Inference Lab as a production-style model operations environment with service readiness, benchmark evidence, metrics, container runtime control, GPU capacity planning, and a path into Kubernetes-native LLM serving.

## Operating model

- Treat model serving as a platform workload, not a notebook.
- Validate service health before benchmarking.
- Capture latency, p95, throughput, concurrency, and saturation signals.
- Escalate to GPU capacity only after baseline behavior is measurable.

## Procedure

1. Confirm runtime environment and dependency state.
2. Start the model-serving API and validate `/health`.
3. Send a controlled generation request through `/v1/generate`.
4. Inspect `/metrics` to confirm observability output.
5. Run a benchmark sweep across request counts and concurrency levels.
6. Compare average latency, p95 latency, throughput, and saturation behavior.
7. Document the result before scaling capacity.

## GPU capacity gate

Before moving workload to a GPU provider, confirm model size, memory footprint, target concurrency, latency goal, budget tier, provider selection, rollback path, and metrics coverage.

## Kubernetes progression

Promote into Kubernetes only after the container runtime, metrics, and benchmark baseline are stable. Use Helm, GitOps controls, resource requests, readiness checks, and observable rollout behavior.
