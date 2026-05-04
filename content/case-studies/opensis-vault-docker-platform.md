# openSIS Vault Docker Platform

## Status

Draft source content. Verify all implementation details before publishing on the production site.

## Executive Summary

Built a secure containerized application platform using Docker, MariaDB, HashiCorp Vault, Vault Agent, AppRole, Traefik, and TLS. The project focuses on practical secrets management, service separation, reverse proxy routing, and troubleshooting production-style container behavior.

## Architecture

Core components:

- openSIS application container
- MariaDB database container
- HashiCorp Vault
- Vault Agent
- AppRole authentication
- Traefik reverse proxy
- TLS termination
- environment-specific configuration

High-level flow:

```text
Vault secret path
  -> Vault Agent authentication
  -> rendered runtime secret file or environment
  -> application container
  -> MariaDB service
  -> Traefik public route
```

## Implementation

The platform uses Docker-based service isolation. Vault is responsible for secret storage and delivery while Traefik handles external routing and TLS. Vault Agent and AppRole provide a controlled mechanism for application access to secrets without hardcoding database credentials directly into source code.

## Security

Security themes:

- Secrets stored outside application source.
- Vault Agent used for controlled secret retrieval.
- AppRole used for service authentication.
- Database credentials separated from public configuration.
- Reverse proxy controls public access.
- TLS protects external traffic.

## CI/CD

Potential CI/CD model:

- Lint Docker Compose or container configuration.
- Validate required environment examples.
- Scan images for vulnerabilities.
- Deploy through controlled environment-specific configuration.

## Observability

Recommended observability additions:

- container health checks
- database availability checks
- Traefik access logs
- Vault Agent logs
- application logs

## Troubleshooting

Troubleshooting areas:

- Vault Agent template rendering issues.
- AppRole role ID or secret ID mismatch.
- file permissions for rendered secrets.
- database connection failures.
- Traefik routing and TLS configuration.
- service startup order.

## Lessons Learned

- Secrets management introduces operational complexity but improves security posture.
- Vault Agent permissions and template paths must be precise.
- Reverse proxy configuration should be documented carefully.
- Local Docker platforms can teach production security patterns when treated seriously.

## Future Roadmap

- Add automated security scanning.
- Add stronger health checks.
- Add backup and restore validation.
- Add Kubernetes migration path.
- Add observability dashboards.

## Proof Points To Add

- Docker architecture diagram.
- Vault Agent flow diagram.
- Traefik route screenshot or config excerpt.
- Troubleshooting timeline.
- TODO: Replace with verified personal metric.
