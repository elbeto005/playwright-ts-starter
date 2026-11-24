// Extends Playwright's test with custom fixtures.
// Tests import { test, expect } from here instead of '@playwright/test'.

import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
