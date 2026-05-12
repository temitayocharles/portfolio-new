const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const failures = [];
const assert = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

const parseJson = (relativePath) => {
  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    failures.push(`${relativePath} is valid JSON: ${error.message}`);
    return {};
  }
};

const contentPath = "src/content/portfolio-content.json";
const backendContentPath = "../backend/content/portfolio-content.json";
const mock = read("src/mock.js");
const content = parseJson(contentPath);
const backendContent = exists(backendContentPath) ? parseJson(backendContentPath) : null;

const requiredSections = [
  "profile",
  "heroStats",
  "aboutParagraphs",
  "aboutHighlights",
  "skillGroups",
  "experiences",
  "projects",
  "projectArchitectures",
  "navLinks",
  "writings",
  "testimonials",
  "heroVisuals",
];

assert(exists(contentPath), "Frontend portfolio content JSON exists");
assert(mock.includes('portfolio-content.json'), "mock.js re-exports the JSON content artifact");
assert(mock.length < 2500, "mock.js remains a thin compatibility layer");

for (const section of requiredSections) {
  assert(Object.prototype.hasOwnProperty.call(content, section), `Content section exists: ${section}`);
}

if (backendContent) {
  assert(
    JSON.stringify(content) === JSON.stringify(backendContent),
    "Frontend and backend bundled content artifacts are synchronized"
  );
}

const projects = Array.isArray(content.projects) ? content.projects : [];
const architectures = Array.isArray(content.projectArchitectures) ? content.projectArchitectures : [];
const writings = Array.isArray(content.writings) ? content.writings : [];

assert(content.profile && content.profile.name && content.profile.title, "Profile contains name and title");
assert(projects.length >= 3, "Project case-study content exists");
assert(writings.length >= 1, "Writing note content exists");
assert(architectures.length >= 1, "Project architecture data exists");

for (const project of projects) {
  assert(project.title, `Project has title: ${project.id || "unknown"}`);
  assert(project.summary || project.description, `Project has summary or description: ${project.title || project.id}`);
  assert(Array.isArray(project.tags), `Project tags array exists: ${project.title || project.id}`);
  assert(Array.isArray(project.outcomes), `Project outcomes array exists: ${project.title || project.id}`);
  assert(Array.isArray(project.links), `Project links array exists: ${project.title || project.id}`);
}

for (const architecture of architectures) {
  assert(architecture.title, `Architecture has title: ${architecture.id || "unknown"}`);
  assert(Array.isArray(architecture.nodes), `Architecture nodes array exists: ${architecture.title || architecture.id}`);
  assert(Array.isArray(architecture.edges), `Architecture edges array exists: ${architecture.title || architecture.id}`);
  assert(
    architecture.diagramImage || architecture.diagram || architecture.nodes.length > 0,
    `Architecture diagram assets or topology data are referenced: ${architecture.title || architecture.id}`
  );
}

const serialized = JSON.stringify(content).toLowerCase();
assert(serialized.includes("forgewatch"), "ForgeWatch content is present");
assert(serialized.includes("sentinel-copilot"), "ForgeWatch uses sentinel-copilot as source");

if (failures.length > 0) {
  console.error("Portfolio QA smoke check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Portfolio QA smoke check passed.");
console.log(`Validated ${projects.length} projects, ${architectures.length} architectures, and ${writings.length} writing entries.`);
