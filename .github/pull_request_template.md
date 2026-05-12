## Summary

Describe the change and why it is required.

## Validation

- [ ] Backend CI passes.
- [ ] Frontend CI passes.
- [ ] UI smoke tests pass.
- [ ] Security scan impact reviewed.
- [ ] Deployment impact reviewed for Home Lab GitOps.

## Deployment notes

Primary backend deployment target: Home Lab GitOps.
Fallback backend deployment target: Render, only when explicitly promoted.

## Risk assessment

- [ ] No secrets committed.
- [ ] No production endpoint changed unintentionally.
- [ ] No breaking environment variable changes.
