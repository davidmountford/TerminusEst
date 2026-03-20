const { test, expect } = require('@playwright/test')

test('homepage smoke test', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Terminus Est/i)
  await expect(page.getByRole('heading', { name: 'Working...' })).toBeVisible()
  await expect(page.getByText('Please wait...')).toBeVisible()
})
