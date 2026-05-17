#!/usr/bin/env node
/**
 * generate-github-digest.mjs
 *
 * Validates curated digest content and optionally enriches public repository
 * metadata when GH_TOKEN is present.
 *
 * Safety rules:
 *   - Never prints tokens or secrets.
 *   - Never exposes private repository URLs.
 *   - Never publishes raw commit history.
 *   - Fails with clear messages when required fields are missing.
 *   - Exits 0 when GH_TOKEN is absent (validation-only mode).
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const contentDir = resolve(root, "frontend/src/content");

// ─── Required field schemas ───────────────────────────────────────────────────

const DIGEST_REQUIRED = ["id", "title", "sourceType", "repoVisibility", "category", "summary", "publicSafe", "signals"];
const UPDATES_REQUIRED = ["id", "title", "date", "category", "summary", "visibility"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`[ERROR] Could not read ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function validateItems(items, requiredFields, label) {
  let errors = 0;
  for (const item of items) {
    for (const field of requiredFields) {
      if (item[field] === undefined || item[field] === null) {
        console.error(`[ERROR] ${label} item "${item.id || "(no id)"}" is missing required field: ${field}`);
        errors++;
      }
    }
    // publicSafe must be true for publishable digest items
    if (label === "github-digest" && item.publicSafe === false) {
      console.error(
        `[ERROR] github-digest item "${item.id}" has publicSafe=false. Remove or fix before publishing.`
      );
      errors++;
    }
    // Reject any item that looks like it contains a private URL
    const raw = JSON.stringify(item);
    if (/github\.com\/[^"]+\/[^"]+\.git/.test(raw)) {
      console.error(
        `[ERROR] ${label} item "${item.id}" appears to contain a raw repository URL. Remove before publishing.`
      );
      errors++;
    }
  }
  return errors;
}

// ─── Optional GitHub API enrichment (public repos only) ──────────────────────

async function enrichPublicRepo(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  // Only return safe public metadata
  return {
    name: data.name,
    description: data.description,
    stargazers_count: data.stargazers_count,
    language: data.language,
    topics: data.topics,
    html_url: data.private ? null : data.html_url,
    private: data.private,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("[INFO] generate-github-digest: starting validation");

  const digestPath = resolve(contentDir, "github-digest.json");
  const updatesPath = resolve(contentDir, "site-updates.json");

  const digest = loadJson(digestPath);
  const updates = loadJson(updatesPath);

  if (!Array.isArray(digest)) {
    console.error("[ERROR] github-digest.json must be a JSON array.");
    process.exit(1);
  }
  if (!Array.isArray(updates)) {
    console.error("[ERROR] site-updates.json must be a JSON array.");
    process.exit(1);
  }

  let totalErrors = 0;
  totalErrors += validateItems(digest, DIGEST_REQUIRED, "github-digest");
  totalErrors += validateItems(updates, UPDATES_REQUIRED, "site-updates");

  if (totalErrors > 0) {
    console.error(`[ERROR] Validation failed with ${totalErrors} error(s). Fix before publishing.`);
    process.exit(1);
  }

  console.log(`[OK] github-digest.json: ${digest.length} item(s) validated.`);
  console.log(`[OK] site-updates.json: ${updates.length} item(s) validated.`);

  // ── Optional GitHub API enrichment ──────────────────────────────────────────
  const token = process.env.GH_TOKEN;
  if (!token) {
    console.log("[INFO] GH_TOKEN not set. Skipping GitHub API enrichment (validation-only mode).");
    console.log("[INFO] generate-github-digest: completed successfully.");
    return;
  }

  console.log("[INFO] GH_TOKEN present. Attempting public repo metadata enrichment.");

  // Only enrich items that are explicitly public and have a safe repo name
  const publicItems = digest.filter(
    (item) => item.repoVisibility === "public" && item.publicRepoName
  );

  if (publicItems.length === 0) {
    console.log("[INFO] No public repo items with publicRepoName found. Nothing to enrich.");
  }

  for (const item of publicItems) {
    const [owner, repo] = item.publicRepoName.includes("/")
      ? item.publicRepoName.split("/")
      : ["temitayocharles", item.publicRepoName];

    const meta = await enrichPublicRepo(owner, repo, token).catch(() => null);
    if (!meta) {
      console.warn(`[WARN] Could not fetch metadata for ${owner}/${repo}. Skipping.`);
      continue;
    }
    if (meta.private) {
      console.warn(`[WARN] ${owner}/${repo} is private. Skipping enrichment to avoid leaking data.`);
      continue;
    }
    console.log(`[OK] Enriched public repo: ${owner}/${repo} (${meta.stargazers_count} stars, ${meta.language})`);
  }

  console.log("[INFO] generate-github-digest: completed successfully.");
}

main().catch((err) => {
  console.error("[ERROR] Unexpected failure:", err.message);
  process.exit(1);
});
