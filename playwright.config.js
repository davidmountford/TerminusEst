const { defineConfig, devices } = require('@playwright/test')

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const configuredWebServerCommand =
  process.env.PLAYWRIGHT_WEB_SERVER_COMMAND || 'npm run dev'
const webServerCommand =
  process.platform === 'win32'
    ? configuredWebServerCommand.replace(/^npm(?=\s|$)/, npmCommand)
    : configuredWebServerCommand

module.exports = defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.js$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: webServerCommand,
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
})
