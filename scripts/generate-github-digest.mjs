#!/usr/bin/env node
/**
 * generate-github-digest.mjs
 *
 * Validation-first script for curated site content.
 * Optional public-repo enrichment is allowed when GH_TOKEN is present, but
 * this script never prints token values.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const contentDir = resolve(root, "frontend/src/content");

const DIGEST_REQUIRED = [
  "id",
  "title",
  "sourceType",
  "repoVisibility",
  "category",
  "summary",
  "publicSafe",
  "signals",
  "publishNotes",
];
const UPDATES_REQUIRED = ["id", "title", "date", "category", "summary", "visibility"];
const PROJECT_META_REQUIRED = ["id", "status", "statusAccent", "ecosystemRole", "problemShort", "publicSafe"];
const ROUTE_META_REQUIRED = ["path", "title", "description", "type", "publicSafe"];
const ALLOWED_REPO_VISIBILITY = new Set(["public", "private", "mixed"]);
const ALLOWED_STUDY_TYPES = new Set(["case-study", "architecture-study", "operational-study"]);

const SECRET_LIKE_RE = /\b(?:ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_\-]{35})\b/i;
const PRIVATE_URL_RE = /\b(?:https?:\/\/)?(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?(?:\/[^\s"']*)?/i;
const RAW_GITHUB_REPO_URL_RE = /https?:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?(?:\/[\w./-]*)?/i;
const PRIVATE_IMPLEMENTATION_URL_RE = /\b(?:https?:\/\/)?(?:internal\.|private\.|staging\.|dev\.|preview\.|corp\.|intranet\.)[A-Za-z0-9.-]+(?:\/[^\s"']*)?/i;

function fail(message) {
  console.error(`[ERROR] ${message}`);
}

function loadJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (err) {
    fail(`Could not read ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function scanForSensitiveContent(raw, label, id, options = {}) {
  const identifier = id || "(no id)";

  if (SECRET_LIKE_RE.test(raw)) {
    return `${label} item "${identifier}" appears to contain a token or secret-like value.`;
  }
  if (RAW_GITHUB_REPO_URL_RE.test(raw)) {
    return `${label} item "${identifier}" contains a raw GitHub repository URL.`;
  }
  if (PRIVATE_IMPLEMENTATION_URL_RE.test(raw)) {
    return `${label} item "${identifier}" contains a private implementation URL.`;
  }
  if (PRIVATE_URL_RE.test(raw) && !options.allowLocalhost) {
    return `${label} item "${identifier}" contains a localhost URL that is not allowed for published content.`;
  }

  return null;
}

function validateDigestItem(item) {
  const errors = [];

  for (const field of DIGEST_REQUIRED) {
    if (item[field] === undefined || item[field] === null) {
      errors.push(`github-digest item "${item.id || "(no id)"}" is missing required field: ${field}`);
    }
  }

  if (item.publicSafe !== true) {
    errors.push(`github-digest item "${item.id || "(no id)"}" must set publicSafe=true.`);
  }
  if (!Array.isArray(item.signals)) {
    errors.push(`github-digest item "${item.id || "(no id)"}" must use an array for signals.`);
  }
  if (!ALLOWED_REPO_VISIBILITY.has(item.repoVisibility)) {
    errors.push(`github-digest item "${item.id || "(no id)"}" has invalid repoVisibility: ${item.repoVisibility}`);
  }

  const sensitiveError = scanForSensitiveContent(JSON.stringify(item), "github-digest", item.id, {
    allowLocalhost: item.publicSafe !== true,
  });
  if (sensitiveError) errors.push(sensitiveError);

  return errors;
}

function validateUpdateItem(item) {
  const errors = [];

  for (const field of UPDATES_REQUIRED) {
    if (item[field] === undefined || item[field] === null) {
      errors.push(`site-updates item "${item.id || "(no id)"}" is missing required field: ${field}`);
    }
  }

  const sensitiveError = scanForSensitiveContent(JSON.stringify(item), "site-updates", item.id);
  if (sensitiveError) errors.push(sensitiveError);

  return errors;
}

function validateProjectMeta(meta) {
  const errors = [];

  if (!meta || typeof meta !== "object" || Array.isArray(meta)) {
    errors.push("project-meta.json must be a JSON object keyed by project id.");
    return errors;
  }

  for (const [key, item] of Object.entries(meta)) {
    for (const field of PROJECT_META_REQUIRED) {
      if (item[field] === undefined || item[field] === null || item[field] === "") {
        errors.push(`project-meta entry "${key}" is missing required field: ${field}`);
      }
    }

    if (item.id && item.id !== key) {
      errors.push(`project-meta entry "${key}" must have id matching the object key.`);
    }
    if (item.publicSafe !== true) {
      errors.push(`project-meta entry "${key}" must set publicSafe=true.`);
    }

    const hasAnyStudyField = item.studyType || item.studyLabel || item.studyAccent;
    if (hasAnyStudyField && (!item.studyType || !item.studyLabel || !item.studyAccent)) {
      errors.push(`project-meta entry "${key}" must include studyType, studyLabel, and studyAccent together.`);
    }
    if (item.studyType && !ALLOWED_STUDY_TYPES.has(item.studyType)) {
      errors.push(`project-meta entry "${key}" has invalid studyType: ${item.studyType}`);
    }

    const sensitiveError = scanForSensitiveContent(JSON.stringify(item), "project-meta", key);
    if (sensitiveError) errors.push(sensitiveError);
  }

  return errors;
}

function validateRouteMetadata(metadata) {
  const errors = [];

  if (!Array.isArray(metadata)) {
    errors.push("route-metadata.json must be a JSON array.");
    return errors;
  }

  for (const item of metadata) {
    for (const field of ROUTE_META_REQUIRED) {
      if (item[field] === undefined || item[field] === null || item[field] === "") {
        errors.push(`route-metadata entry "${item.path || "(no path)"}" is missing required field: ${field}`);
      }
    }

    if (item.publicSafe !== true) {
      errors.push(`route-metadata entry "${item.path || "(no path)"}" must set publicSafe=true.`);
    }

    const sensitiveError = scanForSensitiveContent(JSON.stringify(item), "route-metadata", item.path);
    if (sensitiveError) errors.push(sensitiveError);
  }

  return errors;
}

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
  return {
    name: data.name,
    stargazers_count: data.stargazers_count,
    language: data.language,
    private: data.private,
  };
}

async function main() {
  console.log("[INFO] generate-github-digest: starting validation");

  const digestPath = resolve(contentDir, "github-digest.json");
  const updatesPath = resolve(contentDir, "site-updates.json");
  const projectMetaPath = resolve(contentDir, "project-meta.json");
  const routeMetadataPath = resolve(contentDir, "route-metadata.json");

  const digest = loadJson(digestPath);
  const updates = loadJson(updatesPath);
  const projectMeta = loadJson(projectMetaPath);
  const routeMetadata = loadJson(routeMetadataPath);

  const errors = [];

  if (!Array.isArray(digest)) {
    errors.push("github-digest.json must be a JSON array.");
  } else {
    for (const item of digest) {
      errors.push(...validateDigestItem(item));
    }
  }

  if (!Array.isArray(updates)) {
    errors.push("site-updates.json must be a JSON array.");
  } else {
    for (const item of updates) {
      errors.push(...validateUpdateItem(item));
    }
  }

  errors.push(...validateProjectMeta(projectMeta));
  errors.push(...validateRouteMetadata(routeMetadata));

  if (errors.length > 0) {
    for (const err of errors) fail(err);
    fail(`Validation failed with ${errors.length} error(s). Fix before publishing.`);
    process.exit(1);
  }

  console.log(`[OK] github-digest.json: ${digest.length} item(s) validated.`);
  console.log(`[OK] site-updates.json: ${updates.length} item(s) validated.`);
  console.log(`[OK] project-meta.json: ${Object.keys(projectMeta).length} item(s) validated.`);
  console.log(`[OK] route-metadata.json: ${routeMetadata.length} item(s) validated.`);

  const token = process.env.GH_TOKEN;
  if (!token) {
    console.log("[INFO] GH_TOKEN not set. Skipping GitHub API enrichment (validation-only mode).");
    console.log("[INFO] generate-github-digest: completed successfully.");
    return;
  }

  console.log("[INFO] GH_TOKEN present. Attempting public repo metadata enrichment.");

  const publicItems = digest.filter((item) => item.repoVisibility === "public" && item.publicRepoName);
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
  fail(`Unexpected failure: ${err.message}`);
  process.exit(1);
});
