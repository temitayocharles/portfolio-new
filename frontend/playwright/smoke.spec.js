const { test, expect } = require("@playwright/test");

test.describe("portfolio smoke coverage", () => {
  test("renders the primary portfolio sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#top")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.getByRole("heading", { name: /infrastructure/i }).first()).toBeVisible();
  });

  test("keeps project cards available for hiring and architecture review", async ({ page }) => {
    await page.goto("/#projects");

    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#projects").getByText(/production|architecture|platform|cloud/i).first()).toBeVisible();
  });

  test("validates contact form fields without depending on external email delivery", async ({ page }) => {
    await page.goto("/#contact");

    await expect(page.locator("#contact")).toBeVisible();
    await page.locator('input[name="name"]').fill("CI Smoke Test");
    await page.locator('input[name="email"]').fill("ci@example.com");
    await page.locator('input[name="subject"]').fill("Portfolio smoke validation");
    await page.locator('textarea[name="message"]').fill("This verifies that the contact form remains usable during CI smoke testing.");

    await expect(page.locator('input[name="name"]')).toHaveValue("CI Smoke Test");
    await expect(page.locator('input[name="email"]')).toHaveValue("ci@example.com");
    await expect(page.locator('textarea[name="message"]')).toContainText("contact form remains usable");
  });
});
