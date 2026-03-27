const { test, expect } = require('@playwright/test')

test('homepage smoke test', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Terminus Est/i)
  await expect(page.getByRole('heading', { name: 'David Mountford' })).toBeVisible()
  await expect(page.getByText('Software Engineer')).toBeVisible()
  await expect(page.getByText('Init TerminusEst')).toBeVisible()
  await expect(page.getByText(/Selected Skills\s*=>/i)).toBeVisible()
  await expect(page.getByRole('button', { name: /trace route/i })).toBeVisible()
})

test('navigation routes resolve to real pages', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /trace route/i }).click()
  await page.getByRole('button', { name: /about/i }).click()

  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByText('Operator Profile')).toBeVisible()

  await page.getByRole('button', { name: /trace route/i }).click()
  await page.getByRole('button', { name: /projects/i }).click()

  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByText('Selected Systems')).toBeVisible()

  await page.getByRole('button', { name: /trace route/i }).click()
  await page.getByRole('dialog', { name: /active sectors/i }).getByRole('button', { name: /home route/i }).click()

  await expect(page).toHaveURL(/\/$/)
})
