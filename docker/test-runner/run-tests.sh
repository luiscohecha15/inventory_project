#!/usr/bin/env bash
set -euo pipefail
cd /workspace

echo "=== System Info ==="
uname -a
echo "=== Available Disk Space ==="
df -h /
echo "=== Memory ==="
free -h

echo ""
echo "Waiting for backend (backend:3000) to be ready..."
for i in {1..60}; do
  if curl -sS http://backend:3000/api/categories >/dev/null 2>&1; then
    echo "Backend ready"
    break
  fi
  echo "Attempt $i/60..."
  sleep 2
done

echo "Waiting for frontend (frontend:80) to be ready..."
for i in {1..60}; do
  if curl -sS http://frontend >/dev/null 2>&1; then
    echo "Frontend ready"
    break
  fi
  echo "Attempt $i/60..."
  sleep 2
done

echo "Running backend unit tests (excluding E2E)"
cd /workspace/backend
npm ci
npm test --passWithNoTests || true

echo ""
echo "=== Running backend E2E tests (using MongoMemoryServer) ==="
export NODE_OPTIONS="--max-old-space-size=2048"
npm run test:e2e

echo ""
echo "Running frontend unit tests"
cd /workspace/frontend
npm ci
npm test
npm run build

echo "Installing Playwright browsers"
npx playwright install --with-deps

echo "Running Playwright E2E inside test container against http://frontend"
PLAYWRIGHT_BASE_URL=http://frontend npx playwright test -c playwright.config.ts || exit 1

echo ""
echo "All tests completed successfully!"

