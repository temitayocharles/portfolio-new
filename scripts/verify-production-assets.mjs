const BASE_URL = (process.env.SITE_URL || "https://temitayocharles.online").replace(/\/+$/, "");

const JS_CONTENT_TYPE_PATTERN = /(javascript|ecmascript|x-javascript)/i;
const CSS_CONTENT_TYPE_PATTERN = /text\/css/i;

function toAbsoluteUrl(assetUrl) {
  try {
    return new URL(assetUrl, `${BASE_URL}/`).toString();
  } catch {
    return null;
  }
}

function extractAssetUrls(html) {
  const urls = new Set();
  const attrPattern = /(?:href|src)=["']([^"']+)["']/g;
  let match = null;
  while ((match = attrPattern.exec(html)) !== null) {
    const candidate = match[1];
    if (!candidate || candidate.startsWith("data:")) continue;
    const absolute = toAbsoluteUrl(candidate);
    if (!absolute) continue;
    const parsed = new URL(absolute);
    if (parsed.origin !== BASE_URL) continue;
    if (!parsed.pathname.startsWith("/static/")) continue;
    urls.add(absolute);
  }
  return [...urls];
}

function assetTypeFromPath(url) {
  if (url.includes(".css")) return "css";
  if (url.includes(".js")) return "js";
  return "other";
}

function looksLikeHtml(bodySnippet) {
  return /<!doctype html|<html|<head|<body/i.test(bodySnippet);
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "portfolio-production-assets/1.0" },
  });
  const text = await response.text();
  return { response, text };
}

function isValidContentType(assetType, contentType) {
  if (assetType === "css") return CSS_CONTENT_TYPE_PATTERN.test(contentType);
  if (assetType === "js") return JS_CONTENT_TYPE_PATTERN.test(contentType);
  return true;
}

async function main() {
  const homepage = await fetchText(`${BASE_URL}/`);
  if (!homepage.response.ok) {
    throw new Error(`Homepage fetch failed: ${homepage.response.status}`);
  }

  const assets = extractAssetUrls(homepage.text);
  if (assets.length === 0) {
    throw new Error("No same-origin /static/ assets found in homepage HTML.");
  }

  const results = [];
  for (const assetUrl of assets) {
    const assetType = assetTypeFromPath(assetUrl);
    const { response, text } = await fetchText(assetUrl);
    const contentType = response.headers.get("content-type") || "";
    const bodySnippet = text.slice(0, 256).trim();

    const checks = {
      status2xx: response.ok,
      contentType: isValidContentType(assetType, contentType),
      notHtmlFallback: !looksLikeHtml(bodySnippet),
    };

    results.push({
      url: assetUrl,
      type: assetType,
      status: response.status,
      contentType,
      ok: checks.status2xx && checks.contentType && checks.notHtmlFallback,
      checks,
    });
  }

  console.table(
    results.map((item) => ({
      type: item.type,
      status: item.status,
      ok: item.ok,
      contentType: item.contentType,
      url: item.url,
    }))
  );

  const failed = results.filter((item) => !item.ok);
  if (failed.length > 0) {
    console.error("\nAsset verification failures:");
    for (const item of failed) {
      console.error(
        `- ${item.url}\n  status2xx=${item.checks.status2xx} contentType=${item.checks.contentType} notHtmlFallback=${item.checks.notHtmlFallback}`
      );
    }
    process.exit(1);
  }

  console.log(`\nProduction asset verification passed for ${results.length} /static assets.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
