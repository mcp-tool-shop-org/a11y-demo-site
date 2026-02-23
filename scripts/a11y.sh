#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-results}"

rm -rf "$OUT"
mkdir -p "$OUT"

echo "==> Scan (a11y-evidence-engine)"
# Run scan but capture exit code
set +e
a11y-engine scan ./html --out "$OUT"
EXIT_CODE=$?
set -e

if [ $EXIT_CODE -ne 0 ] && [ $EXIT_CODE -ne 2 ]; then
  echo "Error: a11y-engine failed with exit code $EXIT_CODE"
  exit $EXIT_CODE
fi

echo "==> Ingest + verify provenance (a11y-assist)"
# Fail CI if any errors exist (default fail-on error)
a11y-assist ingest "$OUT/findings.json" \
  --out "$OUT/a11y-assist" \
  --verify-provenance \
  --fail-on none \
  --format text

echo "==> Done"
