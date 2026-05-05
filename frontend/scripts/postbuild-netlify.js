const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "build", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/<script\b(?![^>]*\bdata-cfasync=)/g, '<script data-cfasync="false"');
html = html.replace(/<script([^>]*?)src="\/static\//g, '<script$1src="/static/');

fs.writeFileSync(indexPath, html, "utf8");
console.log("Patched build/index.html for stable CDN delivery and React hydration.");
