const { test, expect } = require('@playwright/test')

test('style lab smoke test', async ({ page }) => {
  await page.goto('/__style-lab')

  await expect(page).toHaveTitle(/Style Lab/i)
  await expect(page.getByRole('heading', { name: 'Style Lab' })).toBeVisible()
  await expect(page.getByTestId('lab-colors')).toBeVisible()
  await expect(page.getByTestId('swatch-primary')).toBeVisible()
  await expect(page.getByTestId('lab-buttons')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible()
  await expect(page.getByTestId('lab-input-email')).toBeVisible()
  await expect(page.getByText('Cyberpunk Hero Card')).toBeVisible()
})
