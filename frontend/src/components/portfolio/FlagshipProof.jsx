import React from "react";
import { ArrowUpRight, BrainCircuit, Server, ShieldCheck, Workflow } from "lucide-react";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const ids = ["ai-inference-lab", "project-iris", "sentinel-copilot", "infraforge"];
const systemByProject = {
  "ai-inference-lab": "ai-inference-lab",
  "project-iris": "project-iris",
  "sentinel-copilot": "forgewatch",
  infraforge: "infraforge-platform",
};
const iconByProject = {
  "ai-inference-lab": BrainCircuit,
  "project-iris": Workflow,
  "sentinel-copilot": ShieldCheck,
  infraforge: Server,
};
const asArray = (value) => (Array.isArray(value) ? value : []);

const FlagshipProof = () => {
  const { projects = [], brandSystems = {} } = usePortfolioContent();
  const systems = Object.fromEntries(asArray(brandSystems.systems).map((system) => [system.id, system]));
  const items = ids.map((id) => asArray(projects).find((project) => project.id === id)).filter(Boolean);

  if (!items.length) return null;

  return (
    <section id="flagship-proof" className="relative overflow-hidden bg-[#0a0f14] py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel index="06" title="Flagship Proof" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-amber-300/15 bg-amber-300/[0.055] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-200">
              Product-grade systems
            </div>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-50 lg:text-5xl">
              The clearest evidence sits where real problems meet governed execution.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400 lg:justify-self-end">
            These four systems carry the public story: model operations, personal AI assistance, operational intelligence, and the secure platform foundation behind them.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((project, index) => {
            const system = systems[systemByProject[project.id]] || {};
            const Icon = iconByProject[project.id] || Server;
            const chips = asArray(system.proofSignals?.length ? system.proofSignals : project.pillars).slice(0, 4);
            return (
              <article key={project.id} className="rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.018] p-5 transition-all hover:-translate-y-0.5 hover:border-amber-300/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] text-amber-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-600">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-50">{project.name}</h3>
                <p className="mt-2 text-sm text-amber-100/80">{system.role || project.subtitle}</p>
                <p className="mt-5 text-sm leading-relaxed text-slate-400"><span className="text-slate-200">Problem:</span> {system.problem || project.caseStudy?.problem || project.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300"><span className="text-slate-200">Answer:</span> {system.solution || project.caseStudy?.result || project.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {chips.map((chip) => <span key={chip} className="rounded-md border border-white/[0.07] bg-black/10 px-2 py-1 font-mono text-[11px] text-slate-400">{chip}</span>)}
                </div>
                <a href={project.caseStudyPath || `/case/${project.id}`} className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-amber-200 hover:border-amber-300/35" aria-label={`Open ${project.name} case study`}>
                  View case study <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlagshipProof;
