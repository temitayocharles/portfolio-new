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
  "/case/project-iris",
  "/case/jerry",
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
  {
    url: "https://github.com/temitayocharles",
    name: "GitHub profile",
    allowStatusCodes: [],
  },
  {
    url: "https://www.linkedin.com/in/temitayocharles",
    name: "LinkedIn profile",
    allowStatusCodes: [999],
    warning:
      "LinkedIn commonly returns 999 to automated checks while the browser-visible profile can still be valid.",
  },
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

async function checkExternalRoute(route) {
  const result = await checkUrl(route.url);
  const allowed = route.allowStatusCodes.includes(result.status);

  return {
    ...result,
    name: route.name,
    ok: result.ok || allowed,
    warning: allowed ? route.warning : "",
  };
}

async function main() {
  const internalChecks = internalRoutes.map((route) => checkUrl(`${BASE_URL}${route}`));
  const externalChecks = externalRoutes.map((route) => checkExternalRoute(route));
  const results = await Promise.all([...internalChecks, ...externalChecks]);
  const failed = results.filter((result) => !result.ok);
  const warnings = results.filter((result) => result.warning);

  console.table(results);

  if (warnings.length > 0) {
    console.warn("\nWarnings:");
    console.table(warnings.map(({ name, url, status, warning }) => ({ name, url, status, warning })));
  }

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
