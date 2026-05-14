import "./App.css";
import Portfolio from "@/components/portfolio/Portfolio";
import CaseStudyPage from "@/components/portfolio/CaseStudyPage";

const getCaseStudyIdFromPath = () => {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/^\/(?:case|projects)\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

function App() {
  const caseStudyId = getCaseStudyIdFromPath();

  return (
    <div className="App">
      {caseStudyId ? <CaseStudyPage projectId={caseStudyId} /> : <Portfolio />}
    </div>
  );
}

export default App;
