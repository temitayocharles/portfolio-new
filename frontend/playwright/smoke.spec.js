const { test, expect } = require("@playwright/test");

const MIN_RENDERED_TEXT_LENGTH = 200;

function installRuntimeGuards(page) {
  const runtimeErrors = [];

  page.on("pageerror", (error) => {
    runtimeErrors.push(`pageerror: ${error.message}`);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(`console.error: ${message.text()}`);
    }
  });

  return async () => {
    expect(runtimeErrors, `Browser runtime errors:\n${runtimeErrors.join("\n")}`).toEqual([]);
  };
}

async function expectRenderedApplication(page, expectedText = []) {
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("#root")).toBeVisible();

  const rootText = await page.locator("#root").innerText({ timeout: 10_000 });
  expect(rootText.trim().length, "#root must contain substantial rendered text, not a blank shell").toBeGreaterThan(MIN_RENDERED_TEXT_LENGTH);

  for (const textMatcher of expectedText) {
    await expect(page.getByText(textMatcher).first()).toBeVisible();
  }
}

async function openAndAssertRendered(page, path, expectedText = []) {
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  expect(response, `${path} should return an HTTP response`).not.toBeNull();
  expect(response.ok(), `${path} should return a successful HTTP status`).toBeTruthy();

  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
  await expectRenderedApplication(page, expectedText);
}

test.describe("portfolio smoke coverage", () => {
  test("renders the primary portfolio sections without browser runtime errors", async ({ page }) => {
    const assertNoRuntimeErrors = installRuntimeGuards(page);

    await openAndAssertRendered(page, "/", [/Infrastructure/i, /Projects/i, /Architecture/i, /Contact/i]);

    await expect(page.locator("#top")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#architecture")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.getByRole("heading", { name: /infrastructure/i }).first()).toBeVisible();

    await assertNoRuntimeErrors();
  });

  test("renders critical case-study routes without blank-page regressions", async ({ page }) => {
    const assertNoRuntimeErrors = installRuntimeGuards(page);

    const criticalRoutes = [
      { path: "/case/ai-inference-lab", expectedText: [/AI Inference Lab/i, /model/i] },
      { path: "/case/project-iris", expectedText: [/Project Iris/i, /personal/i] },
      { path: "/case/jerry", expectedText: [/Jerry/i, /mobile/i] },
      { path: "/case/sentinel-copilot", expectedText: [/ForgeWatch|Sentinel/i, /operational|cluster|signal/i] },
    ];

    for (const route of criticalRoutes) {
      await openAndAssertRendered(page, route.path, route.expectedText);
    }

    await assertNoRuntimeErrors();
  });

  test("keeps project cards available for hiring and architecture review", async ({ page }) => {
    const assertNoRuntimeErrors = installRuntimeGuards(page);

    await openAndAssertRendered(page, "/#projects", [/production|architecture|platform|cloud/i]);
    await expect(page.locator("#projects")).toBeVisible();

    await assertNoRuntimeErrors();
  });

  test("validates contact form fields without depending on external email delivery", async ({ page }) => {
    const assertNoRuntimeErrors = installRuntimeGuards(page);

    await openAndAssertRendered(page, "/#contact", [/Contact/i]);

    await expect(page.locator("#contact")).toBeVisible();
    await page.locator('input[name="name"]').fill("CI Smoke Test");
    await page.locator('input[name="email"]').fill("ci@example.com");
    await page.locator('input[name="subject"]').fill("Portfolio smoke validation");
    await page.locator('textarea[name="message"]').fill("This verifies that the contact form remains usable during CI smoke testing.");

    await expect(page.locator('input[name="name"]')).toHaveValue("CI Smoke Test");
    await expect(page.locator('input[name="email"]')).toHaveValue("ci@example.com");
    await expect(page.locator('textarea[name="message"]')).toContainText("contact form remains usable");

    await assertNoRuntimeErrors();
  });
});
