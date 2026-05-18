const fs = require("fs");
const path = require("path");
const { chromium, devices } = require("@playwright/test");

const BASE_URL = (process.env.SITE_URL || "https://temitayocharles.online").replace(/\/+$/, "");
const OUT_DIR = path.resolve(__dirname, "..", "..", "tmp", "manual-qa-screenshots");
const ROUTES = [
  "/",
  "/projects",
  "/studies",
  "/github",
  "/news/site-hub-foundation",
  "/writing/w-ai-inference-lab",
  "/privacy-policy",
];
const PROFILES = [
  { name: "desktop", viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1, isMobile: false },
  { name: "mobile", ...devices["iPhone 13"] },
];

function isCriticalConsoleError(msg) {
  const text = msg.toLowerCase();
  return (
    (text.includes("mime type") && text.includes("/static/")) ||
    (text.includes("refused to apply style") && text.includes("/static/")) ||
    (text.includes("refused to execute script") && text.includes("/static/")) ||
    (text.includes("content security policy") && text.includes("static.cloudflareinsights.com")) ||
    (text.includes("content security policy") && text.includes("blob:"))
  );
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const findings = [];

  try {
    for (const profile of PROFILES) {
      const context = await browser.newContext({ ...profile, ignoreHTTPSErrors: false });

      for (const route of ROUTES) {
        const page = await context.newPage();
        const url = `${BASE_URL}${route}`;
        const consoleErrors = [];
        const failedRequests = [];

        page.on("console", (msg) => {
          if (msg.type() === "error") {
            consoleErrors.push(msg.text());
          }
        });
        page.on("requestfailed", (request) => {
          failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || "unknown"}`);
        });

        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForTimeout(1200);

        const horizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        const bodyTextLength = await page.locator("body").innerText().then((text) => text.trim().length);
        const criticalConsoleErrors = consoleErrors.filter(isCriticalConsoleError);

        const screenshotName = `${profile.name}-${route === "/" ? "home" : route.replaceAll("/", "_").replace(/^_/, "")}.png`;
        await page.screenshot({ path: path.join(OUT_DIR, screenshotName), fullPage: true });

        findings.push({
          profile: profile.name,
          route,
          status: response?.status() || null,
          bodyTextLength,
          horizontalOverflow,
          criticalConsoleErrors,
          failedRequests,
          screenshot: screenshotName,
        });

        await page.close();
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const failures = findings.filter(
    (item) =>
      item.bodyTextLength < 80 ||
      item.horizontalOverflow ||
      item.criticalConsoleErrors.length > 0 ||
      item.failedRequests.some((entry) => entry.includes("/static/"))
  );

  fs.writeFileSync(path.join(OUT_DIR, "qa-results.json"), JSON.stringify(findings, null, 2) + "\n");
  console.table(
    findings.map((item) => ({
      profile: item.profile,
      route: item.route,
      status: item.status,
      bodyTextLength: item.bodyTextLength,
      horizontalOverflow: item.horizontalOverflow,
      criticalConsoleErrors: item.criticalConsoleErrors.length,
      failedRequests: item.failedRequests.length,
    }))
  );

  if (failures.length > 0) {
    console.error("\nRendered production QA failures:");
    for (const item of failures) {
      console.error(
        `- ${item.profile} ${item.route} bodyTextLength=${item.bodyTextLength} horizontalOverflow=${item.horizontalOverflow} criticalConsoleErrors=${item.criticalConsoleErrors.length} failedRequests=${item.failedRequests.length}`
      );
    }
    process.exit(1);
  }

  console.log("\nRendered production QA passed.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
