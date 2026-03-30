import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /.*\.[jt]sx?$/,
    exclude: [],
  },
  resolve: {
    alias: {
      '@': rootDir,
      '@components': fileURLToPath(new URL('./components', import.meta.url)),
      '@styles': fileURLToPath(new URL('./styles', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.js'],
    include: ['tests/unit/**/*.test.{js,jsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['components/**/*.js', 'lib/**/*.js'],
      exclude: ['tests/**', 'components/HomePageShell.js', 'components/NotFoundPageClient.js'],
    },
  },
})
