---
title: The Pipeline
description: The four-stage accessibility pipeline — Scan, Sign, Verify, Advise.
sidebar:
  order: 2
---

The demo implements a four-stage pipeline that takes raw HTML and produces verified, actionable accessibility advisories.

## Stage 1 — Scan

`a11y-evidence-engine` scans HTML files for WCAG violations. Each violation is emitted as a structured finding with:

- The violated rule (e.g. `html-has-lang`, `image-alt`)
- A JSON Pointer to the offending element
- Severity and impact metadata

Findings are written to `results/a11y-evidence-engine/`.

## Stage 2 — Sign

Every finding receives a **provenance envelope**: the finding is serialized to canonical JSON, hashed with SHA-256, and the digest is stored alongside the evidence in `results/a11y-evidence-engine/digest.json`.

This ensures any later modification to the findings is detectable.

## Stage 3 — Verify

`a11y-assist ingest --verify-provenance` re-reads the findings, recomputes the SHA-256 digest from the raw evidence, and compares it to the stored hash.

- **Match** — `Provenance: VERIFIED`. The evidence is authentic.
- **Mismatch** — `Provenance: FAILED`. The evidence was modified after signing.

Verification results are recorded in `results/a11y-assist/record.json`.

## Stage 4 — Advise

Verified findings are converted into **fix-oriented advisories**. Each advisory includes:

- The original violation and its severity
- A plain-language explanation of the problem
- A code snippet showing how to fix it

Advisories are written to `results/a11y-assist/advisories.json`.

## Project structure

```
a11y-demo-site/
  html/            # Intentionally broken HTML files
  scripts/         # a11y.sh — runs the full pipeline
  results/         # Generated output (gitignored)
    findings.json
    provenance/
      finding-0001/
        record.json
        digest.json
        envelope.json
    a11y-assist/
      ingest-summary.json
      advisories.json
```
