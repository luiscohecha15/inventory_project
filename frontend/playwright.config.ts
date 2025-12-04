import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.(ts|js|tsx|jsx)$/,
  timeout: 30_000,
  // Start the frontend dev server before running tests
  // Tests expect a running frontend at PLAYWRIGHT_BASE_URL or http://localhost:5173.
  // We do not start servers here; CI brings up services via docker compose.
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    headless: true,
    actionTimeout: 5000,
  },
});
