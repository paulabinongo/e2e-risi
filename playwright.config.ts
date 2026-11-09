/// <reference types="node" />
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// 1. Explicitly load environment variables from your local .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 2. Import your dynamic base URL from your environment configuration file
import { baseURL } from './config/environment'; // Update path if your file location differs

export default defineConfig({
  testDir: './integration',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev */
  reporter: [['html', {open: 'never'}]],
  
  /* Shared settings for all the projects below. See https://playwright.dev. */
  use: {
    /* Use the dynamic base URL determined by your APP and ENV variables */
    baseURL: baseURL || process.env.BASE_URL || 'https://risi.biz',

    /* Collect trace when retrying the failed test. See https://playwright.dev */
    trace: 'on-first-retry',
    
    // Set to false so it launches visually on your desktop
    headless: false,
    
    launchOptions: {
      // Keep slowMo on your local computer, but turn it off in CI to speed up the run
      slowMo: process.env.CI ? 0 : 1000, 
      args: [
        '--kiosk', // Forces native full screen on macOS, bypassing top menu and bottom dock gaps
        '--no-sandbox',             
        '--disable-gpu'             
      ], 
    },
    
    // Removing static viewport numbers allows the browser context to dynamically fill the maximized space natively
    viewport: null, 
  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        // ⚡ THE FIX: Explicitly target the chromium browser directly.
        // Removing `...devices['Desktop Chrome']` completely cleans out hidden options
        // like "deviceScaleFactor" that crash when combined with viewport: null.
        browserName: 'chromium',
        viewport: null, 
      },
    },
  ],
});