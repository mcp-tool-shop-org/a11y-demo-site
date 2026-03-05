---
title: Getting Started
description: Prerequisites, installation, and running the a11y-demo-site pipeline locally.
sidebar:
  order: 1
---

## Prerequisites

- **Node.js 20+** — required for `a11y-evidence-engine`
- **Python 3.10+** — required for `a11y-assist`

## Install the tools

```bash
npm install -g a11y-evidence-engine
pip install a11y-assist
```

## Clone and run

```bash
git clone https://github.com/mcp-tool-shop-org/a11y-demo-site
cd a11y-demo-site
./scripts/a11y.sh
```

## What happens

The `a11y.sh` script executes the full pipeline in sequence:

1. **Scan** — `a11y-evidence-engine` scans every HTML file in the `html/` directory and writes structured findings to `results/`.
2. **Sign** — Each finding receives a SHA-256 provenance envelope stored alongside the evidence.
3. **Verify** — `a11y-assist` recomputes digests and compares them to stored hashes. A match means the evidence is intact.
4. **Summarize** — A human-readable summary is printed to the console and written to `results/a11y-assist/ingest-summary.json`.

After the script completes, all outputs live in the `results/` directory. See [Inspecting Results](./inspecting-results/) for a walkthrough of what each file contains.
