import React, { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, GitBranch, Network, ShieldCheck } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SectionLabel } from "./About";
import { Toaster } from "@/components/ui/toaster";
import { PortfolioContentProvider, usePortfolioContent } from "@/context/PortfolioContentContext";
import { projects as fallbackProjects } from "@/mock";

const asArray = (value) => (Array.isArray(value) ? value : []);
const FEATURED_CASE_STUDIES = ["ai-inference-lab", "project-iris", "sentinel-copilot", "infraforge", "jerry", "openleaf", "vault-ops"];

const CaseStudyPage = ({ projectId }) => (
  <PortfolioContentProvider>
    <CaseStudyPageContent projectId={projectId} />
  </PortfolioContentProvider>
);

const CaseStudyPageContent = ({ projectId }) => {
  const { projects = fallbackProjects } = usePortfolioContent();
  const allProjects = asArray(projects);
  const project = allProjects.find((item) => item.id === projectId) || allProjects.find((item) => item.caseStudyPath === `/case/${projectId}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0f14] text-slate-200 antialiased selection:bg-amber-300/20 selection:text-amber-100">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 lg:px-10 py-32">
          <SectionLabel index="404" title="Case study" />
          <h1 className="mt-8 text-4xl font-semibold text-slate-50">Case study not found.</h1>
          <p className="mt-4 text-slate-400">The requested project route does not match a published case study.</p>
          <a href="/#projects" className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-amber-300 hover:border-amber-300/30">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </a>
        </main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  const caseStudy = project.caseStudy || {};
  const hasArchitectureMap = project.diagramSvg || project.diagramPng || project.caseStudyPath;
  const artifactLinks = [
    hasArchitectureMap && { label: "Explore interactive architecture", href: "/#architecture", icon: Network, internal: true },
    project.runbookUrl && { label: "Open runbook sample", href: project.runbookUrl, icon: ShieldCheck },
    project.repoUrl && project.visibility === "Public repo" && { label: "Open public repository", href: project.repoUrl, icon: GitBranch },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0a0f14] text-slate-200 antialiased selection:bg-amber-300/20 selection:text-amber-100">
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24">
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <a href="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-300">
              <ArrowLeft className="h-4 w-4" /> Back to featured projects
            </a>
            <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <SectionLabel index="CASE" title={project.category} />
                <h1 className="mt-6 text-4xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-slate-50">
                  {caseStudy.title || project.name}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-400">{caseStudy.context || project.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {asArray(project.pillars).map((item) => (
                    <span key={item} className="rounded-md border border-teal-300/15 bg-white/[0.035] px-3 py-1.5 font-mono text-xs text-amber-200">{item}</span>
                  ))}
                </div>
              </div>
              <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Artifacts</div>
                <div className="mt-4 space-y-3">
                  {artifactLinks.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-black/10 px-4 py-3 text-sm text-slate-300 hover:border-amber-300/30 hover:text-amber-200">
                      <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" /> {label}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="pb-24 lg:pb-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
            <CaseBlock title="Problem" body={caseStudy.problem || project.description} />
            <CaseList title="Constraints" items={caseStudy.constraints} />
            <CaseList title="Architecture decisions" items={caseStudy.decisions || project.outcomes} />
            <CaseList title="Operational controls" items={caseStudy.operationalControls} />
            <CaseList title="Evidence behind the metrics" items={caseStudy.evidence} />
            <CaseBlock title="Result" body={caseStudy.result} highlight />
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#081018] py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Measurement notes</div>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {Object.entries(caseStudy.measurementNotes || {}).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="font-mono text-xs text-amber-300">{key}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">More case studies</div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-50">Operational proof across platform, AIOps, SaaS, and secrets.</h2>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allProjects.filter((item) => FEATURED_CASE_STUDIES.includes(item.id)).map((item) => (
                <a key={item.id} href={`/case/${item.id}`} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm text-slate-300 hover:border-amber-300/30 hover:text-amber-200">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.category}</div>
                  <div className="mt-2 font-semibold text-slate-100">{item.name}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

const CaseBlock = ({ title, body, highlight = false }) => (
  <article className={`rounded-3xl border p-5 ${highlight ? "border-amber-300/20 bg-white/[0.035]" : "border-white/[0.07] bg-white/[0.025]"}`}>
    <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{title}</h2>
    <p className="mt-4 text-sm leading-relaxed text-slate-300">{body}</p>
  </article>
);

const CaseList = ({ title, items }) => (
  <article className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5">
    <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{title}</h2>
    <ul className="mt-4 space-y-3">
      {asArray(items).map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

export default CaseStudyPage;
