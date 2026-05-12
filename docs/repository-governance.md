# Repository Governance Baseline

## Branch protection target

Enable the following protection rules for `main`:

- Require pull request before merge.
- Require status checks to pass.
- Require signed commits.
- Dismiss stale pull request approvals.
- Require branches to be up to date before merge.
- Block force pushes.
- Block branch deletion.

## Required checks

Initial required checks:

- `Backend CI`
- `Frontend CI`
- `Secret Scan`
- `Backend Container Scan`
- `UI Smoke Tests`

## Commit discipline

Use conventional commits where possible:

```text
feat: add portfolio content API
fix: harden contact rate limiting
ci: add backend container scan
docs: document home lab deployment path
```

## Deployment ownership

Application source code lives here.
Runtime deployment state for the backend is promoted through `homelab-gitops`.


## Runner baseline

GitHub Actions must use the Home Lab ARC self-hosted runners, not GitHub-hosted `ubuntu-latest`.

```text
General jobs: [self-hosted, linux]
Docker jobs:  [self-hosted, linux, homelab-docker]
```
