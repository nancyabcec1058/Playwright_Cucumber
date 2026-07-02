const { test, expect } = require('@playwright/test')

test("screenshot capture", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.locator("#displayed-text")).toBeVisible();
    //to take screenshot of specific element
    await page.locator("#displayed-text").screenshot({ path: 'Partial_screenshot.png' });
    await page.locator("#hide-textbox").click();
    //to take full page screenshot
    await page.screenshot({ path: 'screenshot.png' });
    expect(await page.locator("#displayed-text")).toBeHidden();
});
//visual testing-testing images before and after
test("visual testing", async ({ page }) => {

    await page.goto("https://www.rediff.com/");
    //to compare two screenshot
    expect(await page.screenshot()).toMatchSnapshot("landing.png");

});

