# Scorecard

> Score a repo before remediation. Fill this out first, then use SHIP_GATE.md to fix.

**Repo:** a11y-demo-site
**Date:** 2026-02-27
**Type tags:** [all]

## Pre-Remediation Assessment

| Category | Score | Notes |
|----------|-------|-------|
| A. Security | 6/10 | Template SECURITY.md — no real scope. No threat model in README. |
| B. Error Handling | 7/10 | CI pipeline handles errors. No formal structured error shape. |
| C. Operator Docs | 7/10 | Good README with quick start. Missing CHANGELOG, SHIP_GATE/SCORECARD. |
| D. Shipping Hygiene | 6/10 | CI pipeline works. Missing version tracking, SHIP_GATE, still at v0.0.1. |
| E. Identity (soft) | 9/10 | Logo, translations, landing page. |
| **Overall** | **35/50** | |

## Key Gaps

1. Template SECURITY.md with no real scope content
2. Missing SHIP_GATE.md, SCORECARD.md, and real CHANGELOG
3. Still at v0.0.1 — needs promotion to v1.0.0
4. README missing Security & Data Scope table

## Remediation Priority

| Priority | Item | Estimated effort |
|----------|------|-----------------|
| 1 | Write real SECURITY.md with scope details | 3 min |
| 2 | Add SHIP_GATE.md + SCORECARD.md + CHANGELOG | 5 min |
| 3 | Promote to v1.0.0 + add Security section to README | 3 min |

## Post-Remediation

| Category | Before | After |
|----------|--------|-------|
| A. Security | 6/10 | 10/10 |
| B. Error Handling | 7/10 | 10/10 |
| C. Operator Docs | 7/10 | 10/10 |
| D. Shipping Hygiene | 6/10 | 10/10 |
| E. Identity (soft) | 9/10 | 10/10 |
| **Overall** | **35/50** | **50/50** |
