import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['./vitest.setup.js'],
  },
  server: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
});
