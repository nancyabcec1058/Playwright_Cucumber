const { test, expect } = require('@playwright/test')

test("Special Locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    //select will work if it is within select tag it is dropdown
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    const visible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    console.log(visible);
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();


});


//getby label ,get by placeholder
//npx playwright test --ui one terminal will open with all ur test.its like test runner.After run it will give u all screeshot step by step
//await page.pause(); will pause the test and open debugger
//getby lable for text box will work if for in lable and id in eneter text is same or all is under same tag label
//npx playwright test SpecialLocator.spec.js --debug inspector to debug
//npx playwright codegen https://rahulshettyacademy.com/angularpractice --record and playback tool