---
title: For Beginners
description: New to a11y-demo-site? Start here for a gentle introduction.
sidebar:
  order: 99
---

## What is this tool?

a11y-demo-site is a working reference implementation that shows how to build an automated accessibility testing pipeline with cryptographic proof. It combines two tools — `a11y-evidence-engine` (scanner) and `a11y-assist` (verifier + advisor) — into a single script that scans HTML, signs findings, verifies integrity, and produces fix recommendations.

It is a **demo**, not a framework. The HTML files in this repo contain intentional accessibility bugs so the pipeline always has something to find and verify.

## Who is this for?

- **Developers** learning how to add accessibility checks to their CI/CD pipeline
- **QA engineers** who want to see what a verified accessibility report looks like
- **Accessibility advocates** building the case for automated compliance tooling
- **Anyone** curious about how cryptographic provenance works in practice

## Prerequisites

- **Node.js 20+** — check with `node --version`
- **Python 3.10+** — check with `python --version`
- **Git** — to clone the repository
- **Basic terminal skills** — you'll run shell scripts

## Your First 5 Minutes

### 1. Install the scanner and verifier

```bash
npm install -g a11y-evidence-engine
pip install a11y-assist
```

### 2. Clone the demo repo

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-demo-site
cd a11y-demo-site
```

### 3. Run the pipeline

```bash
./scripts/a11y.sh
```

You'll see output like:

```
==> Scan (a11y-evidence-engine)
==> Ingest + verify provenance (a11y-assist)
==> Done
```

### 4. Inspect the results

Open `results/a11y-assist/ingest-summary.json` — it shows how many findings were detected and whether provenance verification passed.

Open `results/a11y-assist/advisories.json` — it contains fix recommendations for each violation.

### 5. Verify demo integrity

```bash
./scripts/check-demo-integrity.sh
```

This confirms the intentional bugs in the HTML files haven't been accidentally fixed.

## Common Mistakes

1. **Missing global npm install** — `a11y-evidence-engine` must be installed globally (`npm install -g`), not locally. The script invokes `a11y-engine` as a shell command.

2. **Accidentally fixing the HTML** — The demo HTML contains intentional bugs. If you fix them, the pipeline has nothing to find. Use `check-demo-integrity.sh` to verify the bugs are still present.

3. **Wrong Python version** — `a11y-assist` requires Python 3.10+. Older versions will fail on import.

4. **Running on Windows without Git Bash** — The `a11y.sh` script is a bash script. On Windows, use Git Bash, WSL, or another bash-compatible shell.

5. **Confusing "VERIFIED" with "PASSED"** — "Provenance: VERIFIED" means the evidence wasn't tampered with. It does NOT mean the HTML has no accessibility issues. The pipeline is designed to find issues and prove they're real.

## Next Steps

- **[Getting Started](../getting-started/)** — Detailed prerequisites and installation
- **[The Pipeline](../pipeline/)** — How the four stages (Scan, Sign, Verify, Advise) work
- **[Inspecting Results](../inspecting-results/)** — How to read CI artifacts

## Glossary

| Term | Definition |
|------|-----------|
| **a11y** | Short for "accessibility" (a, then 11 letters, then y) |
| **WCAG** | Web Content Accessibility Guidelines — the international standard for web accessibility |
| **Scorecard** | A JSON file listing accessibility findings from a scan |
| **Finding** | A single accessibility violation (e.g., missing alt text on an image) |
| **Provenance** | Proof of where evidence came from and that it hasn't been modified |
| **Digest** | A SHA-256 hash that acts as a fingerprint for a piece of evidence |
| **Envelope** | The wrapper containing a finding's digest and metadata |
| **Advisory** | A fix recommendation generated from a verified finding |
