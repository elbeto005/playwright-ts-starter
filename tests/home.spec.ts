import { test, expect } from '../fixtures';

test('has title', async ({ page, homePage }) => {
  await homePage.goto();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page, homePage }) => {
  await homePage.goto();

  // Click the get started link.
  await homePage.clickGetStarted();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
});
