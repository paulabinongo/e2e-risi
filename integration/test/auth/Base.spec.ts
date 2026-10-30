import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

import { capitalizedApp } from '../../../config/environment';

test.describe('Base Page Functional Tests', () => {
  test(`User should be able to be redirected to the ${capitalizedApp} App - Login Page`, async ({ page }) => {
  const authPage = new LoginPage(page);

  // Navigate to the target portal app dynamically
  await authPage.openPortal();
});
});
