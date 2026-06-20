const { test, expect } = require('@playwright/test');
const { request } = require('node:http');

/*test("first playwright",function()
{
});*/
//anonymous function
test("browser playwright test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    //to block css
    //page.route('**/*.css',route=>route.abort());
    //to block images
    //page.route('**/*.{jpg,png,jpeg}',route=>route.abort());

    const username = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const prodTitles = page.locator(".card-body .card-title");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //to get all request and response log
    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(), response.status()));
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill('rahulshetty');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await signIn.click();
    await console.log(page.locator("[style*='display']").textContent());
    await expect(page.locator("[style*='display']")).toContainText('Incorrect username/password.');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();
    //to get first element use first and nth(0) to access at element at 0,1 etc 
    await console.log(await prodTitles.first().textContent());
    await console.log(await prodTitles.nth(1).textContent());
    const allProdTitles = await prodTitles.allTextContents();
    console.log(allProdTitles);

});
//if u add page fixture playwright will automatically know that u need browser and page and it will create one
test("page playwright test", async ({ page }) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});
test("@web dropdowns", async ({ page }) => {
    const docLink = page.locator("[href*='documents']");
    const username = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill('rahulshetty');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    //static dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("teach");
    //to pause it will open playwright inspector
    //await page.pause();
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    //radio button-ischecked will not throw error but exception will
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    //checkbox
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //to uncheck and verify it is unchecked
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //to check blinking text.In html if u give this the text blinks and we can use to have attribute to check value
    await expect(docLink).toHaveAttribute("class", "blinkingText");
});

test("window handle", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink = page.locator("[href*='documents']");
    //promise.all if two or more steps u want to go parallel.
    // in below case child page should wait for click.will wait for both steps to pass and takes array.
    const [newPage] = await Promise.all(
        //to switch to new page window.will listen to new page for pending,rejected,fulfilled
        [context.waitForEvent('page'),
        docLink.click()])
    const link = await newPage.locator(".red").textContent();
    console.log(link);
    const arrayText = (link.split("@"))[1].split(".com")[0];
    //console.log(arrayText);
    //text content will return text only when it is attached to dom here below in input field it will not work use inputvalue.
    await username.fill(arrayText);
    console.log(await username.inputValue());
});


//javascript is asynchronous.things will not get executed in sequence.
// use await to tell playwright that we want to wait before next step.
//use async function to use await otherwise will not have any use to tell this function is asynchronous
//npx playwright test-to run test non header mode and npx playwright test --headed to run in head mode
//to run only that test case marked as test.only
//css,xpath locators->css is preferred
//type and fill to enter text but type is deprecated
//npx playwright test tests/AcademyTest.spec.js -to run specific file under test