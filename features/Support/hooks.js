const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../PageObjects/POManager');
const playwright = require('@playwright/test');


Before({tags:"@Regression or @ErrorValidation"},async function () {
    //to generate browser.by default it run in headed mode
    //to run cuucmber cases npx cucumber-js --exit
    const browser = await playwright.chromium.launch(
        {
            headless: false
        }
    );
    const context = await browser.newContext();
    this.page = await context.newPage();
    //world constructor
    this.poManager = new POManager(this.page);
})
BeforeStep(function () {

})
AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'failedtest.png' });
    }
})
After(function () {
    console.log("All test executed successfully");
})