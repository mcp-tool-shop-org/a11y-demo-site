<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="assets/logo.png" alt="A11y Demo Site Logo" width="200" />
</p>

<p align="center">
    <em>Automated Accessibility Compliance & Provenance</em>
</p>

<p align="center">
    <a href="https://github.com/mcp-tool-shop-org/a11y-demo-site/actions/workflows/a11y-artifacts.yml">
        <img src="https://github.com/mcp-tool-shop-org/a11y-demo-site/actions/workflows/a11y-artifacts.yml/badge.svg" alt="CI">
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    </a>
    <a href="https://mcp-tool-shop-org.github.io/a11y-demo-site/">
        <img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page">
    </a>
</p>

---

This repository demonstrates a **verified accessibility pipeline**. It shows how to use `a11y-evidence-engine` to scan for issues and `a11y-assist` to ingest, verify, and report on them.

**Key Features:**

*   **Evidence Generation**: Scans HTML for accessibility violations.
*   **Cryptographic Provenance**: Signs evidence bundles to ensure they haven't been tampered with.
*   **Automated Advisories**: Converts findings into fix-oriented guidance.
*   **CI/CD Integration**: Demonstrates how to block builds on regressions (or warn on findings).

## Quick Start

### Prerequisites

*   Node.js 20+
*   Python 3.10+
*   `npm install -g a11y-evidence-engine`
*   `pip install a11y-assist`

### Run Locally

```bash
./scripts/a11y.sh
```

This will:
1.  Scan the `html/` directory.
2.  Generate findings in `results/`.
3.  Ingest findings and verify provenance.
4.  Output a summary to the console.

## Project Structure

*   `html/`: The web content being scanned (contains intentional accessibility errors).
*   `scripts/`: Automation scripts for running the pipeline.
*   `.github/workflows`: CI configurations.

## License

MIT


---

## Inspecting results in GitHub Actions (artifacts)

This repo's CI uploads the full `results/` directory as a GitHub Actions artifact on every run (even when the job fails because the HTML is intentionally broken).

### Where to download the artifact

1. Go to the **Actions** tab in GitHub.
2. Click the most recent workflow run:
   - **"A11y (upload results)"** (recommended for inspection)
3. Scroll to the bottom of the run page.
4. Under **Artifacts**, download:
   - **`a11y-results`**

Unzip it locally. You'll see:

```
results/
├── findings.json
├── provenance/
│   └── finding-0001/
│       ├── record.json
│       ├── digest.json
│       └── envelope.json
└── a11y-assist/
    ├── ingest-summary.json
    └── advisories.json
```

### What to open first (recommended order)

1. **`results/a11y-assist/ingest-summary.json`**
   Quick overview of counts, top rules, and top files.

2. **`results/a11y-assist/advisories.json`**
   The fix-oriented task list. Each advisory includes `instances[]` with `evidence_ref` links.

3. **`results/provenance/finding-*/digest.json`**
   The stored `integrity.digest.sha256` record.

4. **`results/provenance/finding-*/record.json`**
   The evidence record (`engine.extract.evidence.json_pointer`) showing what was captured.

### What "Provenance: VERIFIED" means

When `a11y-assist ingest --verify-provenance` runs, it recomputes the SHA-256 digest from the canonicalized evidence and compares it to the stored digest.

If they match, CI prints:

```
Provenance: VERIFIED
```

This proves the captured evidence has not been tampered with since it was produced by the scan (**integrity**).
It does not, by itself, prove the original scan environment was trustworthy.

---

## The intentional bugs (for demo purposes)

**html/index.html:**
- `<html>` missing `lang` attribute
- `<img>` missing `alt` attribute
- `<button>` missing accessible name
- `<a>` (empty link) missing accessible name

**html/contact.html:**
- `<html lang="">` (empty lang)
- `<input>` missing associated label

---

## Fixing the demo (optional)

To make CI pass, fix the HTML:

```html
<!-- index.html -->
<html lang="en">
  ...
  <img src="hero.png" alt="Hero image">
  <button>Click me</button>
  <a href="/contact.html">Contact us</a>
```

```html
<!-- contact.html -->
<html lang="en">
  ...
  <label for="email">Email</label>
  <input type="email" id="email" />
```

---

## Related repos

| Repo | Description |
|------|-------------|
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | Formal provenance specification |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | Accessibility scanner with provenance |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | Fix advisor with provenance verification |

---

## License

MIT
