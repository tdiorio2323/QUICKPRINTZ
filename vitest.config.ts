/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

console.log('vitest.config.ts loaded');

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
