# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |
| < 1.0   | No        |

## Scope

a11y-demo-site is a **demonstration project** for accessibility scanning pipelines. It contains intentionally broken HTML to showcase `a11y-evidence-engine` and `a11y-assist`.

- **Data touched:** Static HTML files (read-only scan targets), JSON results written to `results/` directory
- **Data NOT touched:** No user data, no credentials, no databases, no external services
- **Permissions:** Read: `html/` directory. Write: `results/` directory (scan output only)
- **Network:** None at runtime — CI downloads dependencies during setup only
- **Telemetry:** None collected or sent
- **Code execution:** Shell scripts run accessibility scanners on static HTML — no dynamic content

## Security Features

- **Cryptographic provenance:** Evidence bundles are SHA-256 signed to detect tampering
- **Integrity verification:** `a11y-assist ingest --verify-provenance` recomputes digests and compares

## Reporting a Vulnerability

Email: **64996768+mcp-tool-shop@users.noreply.github.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Version affected
- Potential impact

### Response timeline

| Action | Target |
|--------|--------|
| Acknowledge report | 48 hours |
| Assess severity | 7 days |
| Release fix | 30 days |
