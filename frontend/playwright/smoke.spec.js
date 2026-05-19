const { test, expect } = require("@playwright/test");

test.describe("portfolio smoke coverage", () => {
  test("homepage renders primary sections and visible content", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#top")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /infrastructure/i }).first()
    ).toBeVisible();
  });

  test("homepage project cards are available", async ({ page }) => {
    await page.goto("/#projects");

    await expect(page.locator("#projects")).toBeVisible();
    await expect(
      page.locator("#projects").getByText(/production|architecture|platform|cloud/i).first()
    ).toBeVisible();
  });

  test("homepage does not horizontally overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBeFalsy();
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await expect(page.locator(".animate-marquee")).toBeHidden();
    }
  });

  test("primary navigation and CTAs are accessible", async ({ page }) => {
    await page.goto("/");

    const mobileMenuToggle = page.getByRole("button", { name: /open navigation menu|close navigation menu/i });
    if ((await mobileMenuToggle.count()) > 0) {
      await expect(mobileMenuToggle).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Explore Projects" })).toBeVisible();
    await expect(page.locator('a[href="/studies"]').first()).toBeAttached();
    await expect(page.getByRole("link", { name: /Download Temitayo Charles Akinniranye resume as PDF/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open Temitayo Charles Akinniranye GitHub profile/i }).first()).toBeAttached();
    await expect(page.getByRole("link", { name: /Open Temitayo Charles Akinniranye LinkedIn profile/i }).first()).toBeAttached();
  });

  test("website hub pages render with expected headings", async ({ page }) => {
    const routes = [
      { path: "/projects", heading: /Products, platforms/i },
      { path: "/news", heading: /Updates and build notes/i },
      { path: "/writing", heading: /Technical writing/i },
      { path: "/studies", heading: /Case studies and architecture studies/i },
      { path: "/lab", heading: /AI infrastructure lab/i },
      { path: "/github", heading: /GitHub and engineering activity digest/i },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      await expect(
        page.getByRole("heading", { name: route.heading }).first()
      ).toBeVisible();
      await expect(page.getByText(/Hub sections/i).first()).toBeVisible();
    }
  });

  test("/projects renders product directory groups", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.getByText(/Flagship systems/i).first()).toBeVisible();
    await expect(page.getByText(/AI Inference Lab/i).first()).toBeVisible();
    await expect(page.getByText(/InfraForge/i).first()).toBeVisible();
    await expect(page.getByText(/ForgeWatch/i).first()).toBeVisible();
    await expect(page.getByText(/Education platforms/i).first()).toBeVisible();
  });

  test("/news renders curated update cards", async ({ page }) => {
    await page.goto("/news");

    await expect(page.getByText(/Engineering updates, curated for public context/i).first()).toBeVisible();
    await expect(page.locator('a[href^="/news/"]').first()).toBeVisible();
  });

  test("/writing renders writing pieces", async ({ page }) => {
    await page.goto("/writing");

    await expect(page.getByText(/Writing for platform operators and product builders/i).first()).toBeVisible();
    await expect(page.locator('a[href^="/writing/"]').first()).toBeVisible();
  });

  test("news detail route loads and unknown route shows safe fallback", async ({ page }) => {
    await page.goto("/news/site-hub-foundation");
    await expect(page.getByRole("heading").first()).toBeVisible();
    await expect(page.getByText(/Update detail/i).first()).toBeVisible();
    await expect(page.locator('a[href="/news"]').first()).toBeVisible();

    await page.goto("/news/unknown-entry-id");
    await expect(page.getByText(/Content not found/i).first()).toBeVisible();
    await expect(page.locator('a[href="/news"]').first()).toBeVisible();
  });

  test("writing detail route loads and unknown route shows safe fallback", async ({ page }) => {
    await page.goto("/writing/w-ai-inference-lab");
    await expect(page.getByRole("heading").first()).toBeVisible();
    await expect(page.getByText(/Editorial detail/i).first()).toBeVisible();
    await expect(page.locator('a[href="/writing"]').first()).toBeVisible();

    await page.goto("/writing/unknown-entry-id");
    await expect(page.getByText(/Content not found/i).first()).toBeVisible();
    await expect(page.locator('a[href="/writing"]').first()).toBeVisible();
  });

  test("/studies renders case study cards with links", async ({ page }) => {
    await page.goto("/studies");

    await expect(page.getByText(/case stud/i).first()).toBeVisible();
    await expect(page.getByText(/Read study/i).first()).toBeVisible();
  });

  test("/lab renders AI infrastructure themes", async ({ page }) => {
    await page.goto("/lab");

    await expect(page.getByText(/Model operations/i).first()).toBeVisible();
    await expect(page.getByText(/Agent surfaces/i).first()).toBeVisible();
    await expect(page.getByText(/Infrastructure experiments/i).first()).toBeVisible();
  });

  test("/github renders curated digest with model explanation", async ({ page }) => {
    await page.goto("/github");

    await expect(page.getByText(/Digest model/i).first()).toBeVisible();
    await expect(page.getByText(/Raw commits exposed/i).first()).toBeVisible();
    await expect(page.getByText(/^None$/).first()).toBeVisible();
    await expect(page.getByText(/curated signal/i).first()).toBeVisible();
  });

  test("legal and policy pages render correctly", async ({ page }) => {
    const routes = [
      { path: "/trust-safety", heading: /Trust, safety/i },
      { path: "/privacy-policy", heading: /Privacy policy/i },
      { path: "/terms", heading: /Terms for using/i },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      await expect(
        page.getByRole("heading", { name: route.heading }).first()
      ).toBeVisible();
      await expect(page.getByText(/Last updated/i).first()).toBeVisible();
    }
  });

  test("critical case study routes load and are not blank", async ({ page }) => {
    const caseRoutes = [
      "/case/ai-inference-lab",
      "/case/infraforge",
      "/case/sentinel-copilot",
      "/case/project-iris",
      "/case/vault-ops",
    ];

    for (const path of caseRoutes) {
      await page.goto(path);
      await expect(page.getByRole("heading").first()).toBeVisible();
      await expect(page.getByText(/^01$/).first()).toBeVisible();
      await expect(page.getByText(/^02$/).first()).toBeVisible();
    }
  });

  test("contact form fields are usable without external email delivery", async ({ page }) => {
    await page.goto("/#contact");

    await expect(page.locator("#contact")).toBeVisible();
    await page.locator('input[name="name"]').fill("CI Smoke Test");
    await page.locator('input[name="email"]').fill("ci@example.com");
    await page.locator('input[name="subject"]').fill("Portfolio smoke validation");
    await page.locator('textarea[name="message"]').fill(
      "This verifies that the contact form remains usable during CI smoke testing."
    );

    await expect(page.locator('input[name="name"]')).toHaveValue("CI Smoke Test");
    await expect(page.locator('input[name="email"]')).toHaveValue("ci@example.com");
    await expect(page.locator('textarea[name="message"]')).toContainText(
      "contact form remains usable"
    );
  });
});
