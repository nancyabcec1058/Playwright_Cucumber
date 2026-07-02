const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 20000,
  expect: {
    timeout: 20000,
  },
  reporter:[['list'], ['html']],
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot:'on',
    trace:'retain-on-failure'
  },
});