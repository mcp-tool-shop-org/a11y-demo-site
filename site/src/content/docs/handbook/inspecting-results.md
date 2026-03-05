---
title: Inspecting Results
description: How to download and read CI artifacts from GitHub Actions.
sidebar:
  order: 3
---

When the pipeline runs in CI, GitHub Actions uploads the `results/` directory as a downloadable artifact. This page explains how to retrieve and read those outputs.

## Downloading CI artifacts

1. Navigate to the [Actions tab](https://github.com/mcp-tool-shop-org/a11y-demo-site/actions) of the repository.
2. Select the most recent workflow run.
3. Scroll to the **Artifacts** section at the bottom.
4. Download the **a11y-results** artifact (a zip file).

Extract the zip and you will find the full `results/` directory.

## Recommended reading order

Work through the output files in this order for the clearest picture:

### 1. `ingest-summary.json`

Start here. This file contains a high-level summary: how many files were scanned, how many findings were produced, and whether provenance verification passed or failed.

### 2. `advisories.json`

The actionable output. Each entry maps a violation to a fix recommendation with a code snippet. This is the file most useful for developers fixing accessibility issues.

### 3. `digest.json`

The provenance chain. Each entry pairs a finding ID with its SHA-256 digest. Use this to independently verify that no findings were modified after scan time.

### 4. `record.json`

The full verification record. For each finding, this file shows whether the recomputed digest matched the stored digest, along with timestamps.

## What "Provenance: VERIFIED" means

When a finding shows `Provenance: VERIFIED`, it means:

1. The finding was serialized to canonical JSON at scan time.
2. A SHA-256 hash of that serialization was stored in `digest.json`.
3. At verification time, the finding was re-serialized and re-hashed.
4. The two digests matched — the evidence has not been tampered with.

This chain of custody is what separates a verified accessibility audit from an unverified report.
