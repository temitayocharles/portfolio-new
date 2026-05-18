import React from "react";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import HubSectionShell from "./hub/HubSectionShell";
import ProjectsHubSection from "./hub/ProjectsHubSection";
import NewsHubSection from "./hub/NewsHubSection";
import WritingHubSection from "./hub/WritingHubSection";
import StudiesHubSection from "./hub/StudiesHubSection";
import LabHubSection from "./hub/LabHubSection";
import GitHubDigestSection from "./hub/GitHubDigestSection";
import { asArray, routeConfig } from "./hub/HubDesignTokens";

export const isSiteHubPath = (pathname) => Object.prototype.hasOwnProperty.call(routeConfig, pathname);

const SiteHubPage = ({ path }) => {
  const content = usePortfolioContent();
  const page = routeConfig[path] || routeConfig["/projects"];
  const projects = asArray(content.projects);
  const writings = asArray(content.writings);

  const sectionByType = {
    projects: <ProjectsHubSection projects={projects} />,
    updates: <NewsHubSection />,
    writing: writings.length > 0 ? <WritingHubSection writings={writings} /> : null,
    studies: <StudiesHubSection projects={projects} />,
    lab: <LabHubSection projects={projects} />,
    github: <GitHubDigestSection />,
  };

  return (
    <HubSectionShell page={page} routeConfig={routeConfig}>
      {sectionByType[page.type] || null}
    </HubSectionShell>
  );
};

export default SiteHubPage;
