// Compatibility exports for portfolio content.
// Source of truth lives in src/content/portfolio-content.json and is also served by the backend /api/content endpoint.

import content from "./content/portfolio-content.json";

export const profile = content.profile;
export const heroStats = content.heroStats;
export const aboutParagraphs = content.aboutParagraphs;
export const aboutHighlights = content.aboutHighlights;
export const skillGroups = content.skillGroups;
export const experiences = content.experiences;
export const projects = content.projects;
export const projectArchitectures = content.projectArchitectures;
export const navLinks = content.navLinks;
export const writings = content.writings;
export const testimonials = content.testimonials;
export const heroVisuals = content.heroVisuals;

export default content;
