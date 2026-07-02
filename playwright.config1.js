const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries:1,
  workers:3,
  timeout: 20000,
  expect: {
    timeout: 20000,
  },
  reporter: 'html',
  projects:
    [
      {
        name: 'safari',
        use: {
          browserName: 'webkit',
          headless: false,
          screenshot: 'on',
          trace: 'retain-on-failure'
          //...devices['Nokia Lumia 520']
          
        }
      },
      {
        name: 'chrome',
        use: {
          browserName: 'chromium',
          headless: false,
          screenshot: 'off',
          trace: 'retain-on-failure',
          video:'retain-on-failure',
          colorScheme: 'dark',
          timezoneId: 'Europe/Paris',
          locale: 'de-DE',//german
          ignoreHTTPSErrors:true,
          permissions:['geolocation'],
          //viewport:{width:720,height:720}
          //...devices['Galaxy S8']
          //isMobile: false,
        }
      },
    ]

});