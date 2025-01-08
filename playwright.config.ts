import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  timeout: 60000, // Set global timeout to 60 seconds
  
  testDir: './tests',

 
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
 
  /* Retry on CI only */
 
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
 
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  
  
  reporter: [['html', { open: 'always' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
  
  baseURL: 'http://localhost:3100',

  headless: true, // Run tests in headed mode
    // Other options...
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  trace: 'on-first-retry',

    /* Capture a screenshot for failed tests */
  screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],

});