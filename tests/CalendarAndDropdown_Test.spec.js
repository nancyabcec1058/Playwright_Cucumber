const { test, expect } = require('@playwright/test')


test.describe.configure({ mode: 'parallel' })
test("@web calendar test", async ({ page }) => {
    const month = "08";
    const date = "22";
    const year = "2027";
    const expectdate = year + "-" + month + "-" + date;
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").dblclick();
    await page.getByText(year).click();
    //to convert string month to number use Number function
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    expect(await page.locator("//input[@name='date']").getAttribute("value")).toEqual(expectdate);



});
test("popup validations", async ({ page }) => {
    await page.goto("https://www.google.com");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //to move back and forward in navigation
    await page.goBack();
    await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //to handle popup
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    // handle frames
    const framePage = page.frameLocator("#courses-iframe");
    //here is only one element u can see and others are hidden and u want to select visible element
    await framePage.locator("li  a[href='lifetime-access']:visible").click();
    const text = await framePage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

 



});


//npx playwright test --grep @web to run only test with tag @web
//npm install -D allure-playwright and npm install -D allure-commandline  to install allure reporting
//npx playwright test --grep @web --reporter=line,allure-playwright  :line reporting gives result in plane format allure will take this report and generate its own report
//npx allure generate ./allure-results --clean  to get reports from allure folder
//npm run webtest
//npx allure open to open report