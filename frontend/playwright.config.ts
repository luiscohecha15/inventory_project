import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.(ts|js|tsx|jsx)$/,
  timeout: 30_000,
  // Start the frontend dev server before running tests
  webServer: {
    // Start backend and frontend in parallel using concurrently (installed as devDependency)
    // --kill-others: stops the other process if one exits; --success first: consider success when the first process
    command: 'npx concurrently "npm --prefix ../backend run start:dev" "npm run dev" --kill-others --success first',
    url: 'http://localhost:5173',
    cwd: __dirname,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    headless: true,
    actionTimeout: 5000,
  },
});
