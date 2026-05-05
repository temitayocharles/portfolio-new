const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const files = {
  projects: read("src/components/portfolio/Projects.jsx"),
  writing: read("src/components/portfolio/Writing.jsx"),
  hero: read("src/components/portfolio/Hero.jsx"),
  mock: read("src/mock.js"),
  css: read("src/index.css"),
};

const requiredChecks = [
  ["Projects open case-study dialog", files.projects.includes("data-portfolio-action=\"open-case-study\"") && files.projects.includes("createPortal") && files.projects.includes("aria-haspopup=\"dialog\"")],
  ["Writing opens note dialog", files.writing.includes("data-portfolio-action=\"open-writing-note\"") && files.writing.includes("createPortal") && files.writing.includes("aria-haspopup=\"dialog\"")],
  ["Project case-study content exists", (files.mock.match(/caseStudy:\s*{/g) || []).length >= 5],
  ["Writing note content exists", (files.mock.match(/noteBody:/g) || []).length >= 5],
  ["Hero rotating slot is layout stable", files.hero.includes("hero-rotating-slot") && files.css.includes("scrollbar-gutter: stable")],
  ["No em dash in portfolio copy", !Object.values(files).some((content) => content.includes("\u2014"))],
];

const failures = requiredChecks.filter(([, passed]) => !passed);

if (failures.length > 0) {
  console.error("Portfolio QA smoke check failed:");
  for (const [name] of failures) console.error("- " + name);
  process.exit(1);
}

console.log("Portfolio QA smoke check passed.");
