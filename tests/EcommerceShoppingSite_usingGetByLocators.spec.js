const { test, expect } = require('@playwright/test')

test("browser playwright test", async ({ page }) => {
    const email = "radha21@mymail.com";
    const productName = "ZARA COAT 3";
    const products = await page.locator(".card-body");
    //Login
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Abc&xyz123");
    await page.getByRole("button", { name: "login" }).click();

    //Select product to add to cart
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").last().waitFor();
    await page.locator(".card-body").filter({ hasText: productName }).getByRole("button", { name: " Add To Cart" }).click();

    //Navigate to cart
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await page.locator("div ul li").last().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    //Navigate to checkoutpage
    await page.getByRole("button", { name: "Checkout" }).click();
    //pressSequentially to enter character one by one
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
    await page.getByRole("button", { name: "India" }).nth(1).click();
    //.user__name [type='text']
    await expect(page.locator("div label")).toHaveText(email);
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const cleanedText = orderId?.replace(/\|/g, "").trim();
    console.log(cleanedText);

    //Navigate to orders page
    await page.getByRole("listitem").getByRole("button", { name: "Orders" }).click();
    await page.locator("tbody").waitFor();
    await page.locator("tbody tr").filter({ hasText: cleanedText }).getByRole("button", { name: "View" }).click();
    await expect(page.getByText(cleanedText)).toBeVisible();


});
