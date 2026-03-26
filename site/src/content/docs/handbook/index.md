---
title: A11y Demo Site Handbook
description: End-to-end demo of a verified accessibility pipeline using a11y-evidence-engine and a11y-assist.
sidebar:
  order: 0
---

This handbook walks through the **A11y Demo Site** — a reference implementation that shows how `a11y-evidence-engine` and `a11y-assist` work together to scan HTML for WCAG violations, sign evidence with cryptographic provenance, verify integrity, and generate fix-oriented advisories.

## What you will learn

- **[Getting Started](./getting-started/)** — Prerequisites, installation, and running the pipeline locally.
- **[The Pipeline](./pipeline/)** — The four-stage architecture: Scan, Sign, Verify, Advise.
- **[Inspecting Results](./inspecting-results/)** — How to download and read CI artifacts from GitHub Actions.
- **[For Beginners](./beginners/)** — New to accessibility testing? Start here.

## About this demo

The demo repository contains intentionally broken HTML files with real WCAG violations (missing `lang`, missing `alt`, unlabeled inputs). The pipeline detects these violations, signs the evidence, verifies the signatures, and produces actionable fix advisories.

This is a thin, self-contained demo — not a framework. Clone it, run the script, and inspect the output.

[Back to landing page](/a11y-demo-site/)
