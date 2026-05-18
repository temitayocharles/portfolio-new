import "./App.css";
import Portfolio from "@/components/portfolio/Portfolio";
import CaseStudyPage from "@/components/portfolio/CaseStudyPage";
import LegalPage, { isLegalPagePath } from "@/components/portfolio/LegalPage";
import SiteHubPage, { isSiteHubPath } from "@/components/portfolio/SiteHubPage";
import useRouteMetadata from "@/components/portfolio/useRouteMetadata";

const getCaseStudyIdFromPath = () => {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/^\/(?:case|projects)\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const caseStudyId = getCaseStudyIdFromPath();
  const metadataPath = caseStudyId ? `/case/${caseStudyId}` : pathname;

  useRouteMetadata(metadataPath);

  return (
    <div className="App">
      {isLegalPagePath(pathname) ? (
        <LegalPage path={pathname} />
      ) : isSiteHubPath(pathname) ? (
        <SiteHubPage path={pathname} />
      ) : caseStudyId ? (
        <CaseStudyPage projectId={caseStudyId} />
      ) : (
        <Portfolio />
      )}
    </div>
  );
}

export default App;
