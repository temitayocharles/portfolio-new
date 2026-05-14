import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "@/components/portfolio/Portfolio";
import CaseStudyPage from "@/components/portfolio/CaseStudyPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/case/:projectId" element={<CaseStudyPage />} />
          <Route path="/projects/:projectId" element={<CaseStudyPage />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
