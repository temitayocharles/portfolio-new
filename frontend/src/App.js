import "./App.css";
import Portfolio from "@/components/portfolio/Portfolio";
import CaseStudyPage from "@/components/portfolio/CaseStudyPage";
import LegalPage, { isLegalPagePath } from "@/components/portfolio/LegalPage";
import SiteHubPage, { isSiteHubPath } from "@/components/portfolio/SiteHubPage";
import EditorialDetailPage from "@/components/portfolio/EditorialDetailPage";
import useRouteMetadata from "@/components/portfolio/useRouteMetadata";
import siteUpdates from "@/content/site-updates.json";
import portfolioContent from "@/content/portfolio-content.json";

const getCaseStudyIdFromPath = () => {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/^\/(?:case|projects)\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const getEditorialDetailRoute = () => {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/^\/(news|writing)\/([^/?#]+)/);
  if (!match) return null;
  return {
    type: match[1],
    id: decodeURIComponent(match[2]),
  };
};

const getEditorialMetadataOverride = (detailRoute) => {
  if (!detailRoute) return null;
  if (detailRoute.type === "news") {
    const entry = siteUpdates.find((item) => item.id === detailRoute.id);
    if (!entry) return null;
    return {
      title: `${entry.title} | News | Temitayo Charles Akinniranye`,
      description: entry.summary,
    };
  }
  if (detailRoute.type === "writing") {
    const entry = (portfolioContent.writings || []).find((item) => item.id === detailRoute.id);
    if (!entry) return null;
    return {
      title: `${entry.title} | Writing | Temitayo Charles Akinniranye`,
      description: entry.excerpt || entry.summary || "Editorial detail page.",
    };
  }
  return null;
};

function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const caseStudyId = getCaseStudyIdFromPath();
  const editorialDetail = getEditorialDetailRoute();
  const metadataPath = caseStudyId
    ? `/case/${caseStudyId}`
    : editorialDetail
      ? `/${editorialDetail.type}/${editorialDetail.id}`
      : pathname;
  const metadataOverride = getEditorialMetadataOverride(editorialDetail);

  useRouteMetadata(metadataPath, metadataOverride);

  return (
    <div className="App">
      {isLegalPagePath(pathname) ? (
        <LegalPage path={pathname} />
      ) : isSiteHubPath(pathname) ? (
        <SiteHubPage path={pathname} />
      ) : caseStudyId ? (
        <CaseStudyPage projectId={caseStudyId} />
      ) : editorialDetail ? (
        <EditorialDetailPage type={editorialDetail.type} entryId={editorialDetail.id} />
      ) : (
        <Portfolio />
      )}
    </div>
  );
}

export default App;
