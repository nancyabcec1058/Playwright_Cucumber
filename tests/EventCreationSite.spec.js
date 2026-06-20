const { test, expect } = require('@playwright/test')
const baseURL = "https://eventhub.rahulshettyacademy.com";
const mail = "nandini@myemail.com";

test.beforeEach("Login", async ({ page }) => {
    await page.goto(baseURL + "/login");
    await page.getByPlaceholder("you@email.com").fill(mail);
    await page.locator("#password").fill("Abc&xyz123");
    await page.locator("#login-btn").click();
});
test("Create Event", async ({ page }) => {
    const eventName = "Navratri Holiday Planning";
    const eventDate = "2026-10-12T10:30";
    //navigate to manage event page
    await expect(page.getByText("Browse Events →")).toBeVisible();
    await page.getByRole("button", { name: "Admin" }).click();
    await page.locator("[href='/admin/events']").first().click();
    //delete event if already exists
    const deleteButton = page.getByRole('button', { name: 'Delete' });

    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    const confirmBtn = page.locator('#confirm-dialog-yes');
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();
    //create event
    await page.locator("#event-title-input").fill(eventName);
    await page.locator("textarea").fill("This planner is for preperation for diwali holiday event");
    await page.locator("//*[@id='category']").selectOption("Festival");
    await page.getByLabel("City").fill("Delhi");
    await page.getByLabel("Venue").fill("12 Park Street");
    await page.getByLabel("Event Date & Time").fill(eventDate);
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event Created")).toBeVisible();
    //navigate to events page
    await page.locator("#nav-events").click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(eventName)).toBeVisible();
    const card = await page.locator('[data-testid="event-card"]').filter({ hasText: eventName });
    const seatsBeforeBooking = parseInt((await card.locator(".text-emerald-600").textContent()).split(" ")[0]);
    console.log(seatsBeforeBooking);
    await card.locator("#book-now-btn").click();
    //fill booking form
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Nandini Singh");
    await page.locator("#customer-email").fill(mail);
    await page.getByPlaceholder("+91 98765 43210").fill("+919876543210");
    await page.locator(".confirm-booking-btn").click();
    await expect(page.getByText("Booking Ref")).toBeVisible();
    //booking confirmation
    const bookingRef = await page.locator(".booking-ref").textContent();
    await page.locator(".flex-col [href='/bookings']").click();
    await expect(page).toHaveURL(baseURL + "/bookings");

    await expect(page.locator("#booking-card").first().isVisible());
    const matchedCard = page.locator("#booking-card").filter({
        has: page.locator(".booking-ref", { hasText: bookingRef })
    });
    await expect(matchedCard).toBeVisible();
    await expect(matchedCard.locator("h3")).toHaveText(eventName);

    //navigate to events to check seats
    await page.locator("#nav-events").click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(eventName)).toBeVisible();
    const myCard = await page.locator('[data-testid="event-card"]').filter({ hasText: eventName });
    await page.waitForTimeout(2000);
    const seatsAfterBooking = parseInt((await myCard.locator(".text-emerald-600").textContent()).split(" ")[0]);
    console.log(seatsAfterBooking);
    await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);



});