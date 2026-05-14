const BASE_URL = process.env.SITE_URL || "https://temitayocharles.online";

const internalRoutes = [
  "/",
  "/#about",
  "/#skills",
  "/#experience",
  "/#projects",
  "/#architecture",
  "/#writing",
  "/#testimonials",
  "/#contact",
  "/case/ai-inference-lab",
  "/case/infraforge",
  "/case/sentinel-copilot",
  "/case/openleaf",
  "/case/vault-ops",
  "/assets/TCA-Resume-DevOps.pdf",
  "/images/architecture/ai-inference-lab-model-operations.svg",
  "/images/architecture/infraforge-operating-platform.svg",
  "/images/architecture/forgewatch-aiops-control-plane.svg",
  "/images/architecture/openleaf-reference-saas.svg",
  "/images/architecture/vault-ops-secret-control-plane.svg",
  "/runbooks/ai-inference-lab-model-serving-runbook.md",
  "/runbooks/infraforge-cutover-runbook.md",
  "/runbooks/forgewatch-triage-runbook.md",
  "/runbooks/openleaf-release-runbook.md",
  "/runbooks/vault-ops-secret-rotation-runbook.md",
  "/sitemap.xml",
  "/robots.txt",
];

const externalRoutes = [
  "https://github.com/temitayocharles",
  "https://linkedin.com/in/temitayocharles",
  "https://github.com/temitayocharles/sentinel-copilot",
  "https://github.com/temitayocharles/OpenLeaf-Reader-Platform",
];

async function checkUrl(url) {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: {
      "User-Agent": "portfolio-route-audit/1.0",
    },
  });

  return {
    url,
    status: response.status,
    ok: response.ok,
    finalUrl: response.url,
    contentType: response.headers.get("content-type") || "",
  };
}

async function main() {
  const internalChecks = internalRoutes.map((route) => checkUrl(`${BASE_URL}${route}`));
  const externalChecks = externalRoutes.map((route) => checkUrl(route));
  const results = await Promise.all([...internalChecks, ...externalChecks]);
  const failed = results.filter((result) => !result.ok);

  console.table(results);

  if (failed.length > 0) {
    console.error("\nFailed route checks:");
    console.table(failed);
    process.exit(1);
  }

  console.log("\nAll route checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
