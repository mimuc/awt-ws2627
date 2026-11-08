import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest reads its settings from here, too.
  test: {
    environment: 'jsdom',          // a simulated browser DOM for the tests
    globals: true,                 // test, it, expect without importing them
    setupFiles: './src/setupTests.js',
  },
});
