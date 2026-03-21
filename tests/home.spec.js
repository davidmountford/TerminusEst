const { test, expect } = require('@playwright/test')

test('homepage smoke test', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Terminus Est/i)
  await expect(page.getByRole('heading', { name: 'David Mountford' })).toBeVisible()
  await expect(page.getByText(/Please wait/i)).toBeVisible()
  await expect(page.getByText('// Init TerminusEst')).toBeVisible()
  await expect(page.getByText('/__style-lab')).toBeVisible()
})
