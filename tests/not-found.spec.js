const { test, expect } = require('@playwright/test')

test('unknown routes render the custom 404 page', async ({ page }) => {
  await page.goto('/ghost-sector')

  await expect(page).toHaveTitle(/Terminus Est/i)
  await expect(page.getByRole('heading', { name: /the route dissolved in transit/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /trace route/i })).toBeVisible()
  await expect(page.getByText(/signal lost \/\/ error 404/i)).toBeVisible()
})
