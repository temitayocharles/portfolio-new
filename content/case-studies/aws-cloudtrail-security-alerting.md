# AWS CloudTrail Security Alerting

## Status

Draft source content. Verify all implementation details before publishing on the production site.

## Executive Summary

Built an event-driven AWS security monitoring pattern using CloudTrail, EventBridge, Lambda, IAM, KMS, and notification workflows. The project demonstrates how cloud audit events can be converted into actionable alerts for unauthorized or high-risk activity.

## Architecture

Core components:

- AWS CloudTrail for audit events
- EventBridge for event matching
- Lambda for event processing
- SNS, Slack, or equivalent notification target
- IAM for least-privilege permissions
- KMS where encryption is required

High-level flow:

```text
AWS API activity
  -> CloudTrail event
  -> EventBridge rule
  -> Lambda parser
  -> severity classification
  -> notification target
  -> operator review
```

## Implementation

The implementation focuses on identifying suspicious or unauthorized cloud operations and routing them into a notification workflow. EventBridge rules filter relevant CloudTrail events, and Lambda processes the payload into a cleaner operational message.

## Security

Security considerations:

- Lambda role should use least-privilege permissions.
- Notification secrets should not be committed to Git.
- Event payloads should avoid exposing unnecessary sensitive data.
- KMS should protect sensitive event destinations where applicable.
- Alert logic should be explicit and reviewable.

## CI/CD

Recommended delivery model:

- Infrastructure definitions in Git.
- Static validation before deployment.
- Lambda package build workflow.
- IAM policy review before merge.
- Environment-specific variables outside source code.

## Observability

Recommended observability:

- Lambda invocation metrics.
- Lambda error metrics.
- EventBridge matched event count.
- Notification delivery failures.
- Dead-letter queue if productionized.

## Troubleshooting

Common troubleshooting areas:

- EventBridge rule pattern does not match expected events.
- Lambda permissions are too restrictive or too broad.
- Notification target rejects payloads.
- CloudTrail region or organization trail scope is incomplete.
- Alert noise is too high without severity filtering.

## Lessons Learned

- Cloud audit logs become more valuable when tied to actionable routing.
- Event patterns must be tested with real sample events.
- Security alerting requires tuning to avoid noise fatigue.
- Least privilege applies to automation components as much as users.

## Future Roadmap

- Add severity classification.
- Add deduplication.
- Add dashboarding for alert trends.
- Add Terraform or OpenTofu implementation.
- Add runbook links in alert payloads.
- Add AI-assisted event summarization after privacy and security review.

## Proof Points To Add

- EventBridge rule example.
- Lambda handler excerpt.
- Sanitized alert example.
- Architecture diagram.
- TODO: Replace with verified personal metric.
