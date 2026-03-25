#!/usr/bin/env bash
set -euo pipefail

# Verify the intentional accessibility bugs are still present in the demo HTML.
# If someone accidentally fixes them, this script catches it — because the demo
# only works when the bugs exist for the scanner to find.

PASS=0
FAIL=0
ERRORS=()

pass() {
  echo "  ✓ $1"
  PASS=$((PASS + 1))
}

fail() {
  echo "  ✗ $1"
  ERRORS+=("$1")
  FAIL=$((FAIL + 1))
}

echo "==> Checking demo integrity"
echo ""

# --- html/index.html ---
echo "html/index.html:"

# Bug 1: <html> must NOT have a lang attribute
if grep -q 'lang=' html/index.html; then
  fail "<html> should be missing lang attribute"
else
  pass "<html> missing lang attribute"
fi

# Bug 2: <img> must NOT have alt attribute
if grep -q '<img' html/index.html && ! grep -q 'alt=' html/index.html; then
  pass "<img> missing alt attribute"
else
  fail "<img> should be missing alt attribute"
fi

# Bug 3: <button> must be empty
if grep -q '<button></button>' html/index.html; then
  pass "<button> empty (no accessible name)"
else
  fail "<button> should be empty (no accessible name)"
fi

# Bug 4: <a> must be empty (no text)
if grep -qE '<a href="[^"]*"></a>' html/index.html; then
  pass "<a> empty link (no accessible name)"
else
  fail "<a> should be empty link (no accessible name)"
fi

echo ""

# --- html/contact.html ---
echo "html/contact.html:"

# Bug 5: <html lang=""> (empty lang)
if grep -q 'lang=""' html/contact.html; then
  pass '<html lang=""> (empty lang)'
else
  fail '<html lang=""> should have empty lang attribute'
fi

# Bug 6: <input> must NOT have an associated <label>
if grep -q '<label' html/contact.html; then
  fail "<input> should be missing its <label>"
else
  pass "<input> missing associated label"
fi

echo ""
echo "---"
echo "Passed: $PASS  Failed: $FAIL"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "INTEGRITY FAILURE — intentional demo bugs were modified:"
  for e in "${ERRORS[@]}"; do
    echo "  - $e"
  done
  echo ""
  echo "This demo requires broken HTML so the a11y pipeline has something to find."
  echo "If you want to show a 'fixed' version, add html-fixed/ instead of editing html/."
  exit 1
fi

echo "All intentional demo bugs are intact."
exit 0
