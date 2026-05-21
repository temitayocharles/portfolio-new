import React from "react";
import { Activity, BookOpen, BrainCircuit, Layers3, LockKeyhole, MonitorSmartphone, ShieldCheck, Workflow } from "lucide-react";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const iconMap = {
  "infraforge-platform": ShieldCheck,
  "ai-inference-lab": BrainCircuit,
  forgewatch: Activity,
  "project-iris": Workflow,
  jerry: MonitorSmartphone,
  "young-coders": BookOpen,
  "ai-builders-academy": BookOpen,
  "vault-ops": LockKeyhole,
};

const priorityTone = {
  foundation: "border-amber-300/25 bg-amber-300/[0.055] text-amber-200",
  flagship: "border-stone-400/22 bg-stone-400/[0.05] text-stone-200",
  "supporting-flagship": "border-white/10 bg-white/[0.04] text-slate-200",
  "education-layer": "border-amber-300/20 bg-amber-300/[0.04] text-amber-100",
  "supporting-proof": "border-white/10 bg-white/[0.035] text-slate-300",
};

const fallbackBrandSystems = {
  thesis: "InfraForge builds governed AI systems and the infrastructure they need to operate reliably.",
  systems: [],
  relationshipModel: [],
};

const take = (value, count) => (Array.isArray(value) ? value.slice(0, count) : []);

// Static four-zone ecosystem diagram — no animation, no canvas, no library
const EcosystemMap = () => (
  <div className="mt-12 mb-2">
    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">Platform dependency map</div>
    <div className="relative w-full overflow-x-auto">
      <svg
        viewBox="0 0 640 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl"
        aria-label="InfraForge ecosystem dependency map"
        role="img"
      >
        {/* Zone: Foundation (bottom-left) */}
        <rect x="8" y="148" width="168" height="100" rx="10" fill="rgba(251,191,36,0.04)" stroke="rgba(251,191,36,0.18)" strokeWidth="1" />
        <text x="20" y="168" fontFamily="monospace" fontSize="8" fill="rgba(251,191,36,0.5)" letterSpacing="2">FOUNDATION</text>
        <text x="20" y="185" fontFamily="monospace" fontSize="10" fill="#e2e8f0">InfraForge Platform</text>
        <text x="20" y="200" fontFamily="monospace" fontSize="10" fill="#e2e8f0">Vault Ops</text>
        <text x="20" y="218" fontFamily="monospace" fontSize="8" fill="#475569">secure runtime · secrets</text>

        {/* Zone: AI & Observability (top-left) */}
        <rect x="8" y="12" width="168" height="120" rx="10" fill="rgba(139,147,153,0.03)" stroke="rgba(139,147,153,0.18)" strokeWidth="1" />
        <text x="20" y="32" fontFamily="monospace" fontSize="8" fill="rgba(139,147,153,0.55)" letterSpacing="2">AI &amp; OBSERVABILITY</text>
        <text x="20" y="50" fontFamily="monospace" fontSize="10" fill="#e2e8f0">AI Inference Lab</text>
        <text x="20" y="67" fontFamily="monospace" fontSize="10" fill="#e2e8f0">ForgeWatch</text>
        <text x="20" y="85" fontFamily="monospace" fontSize="8" fill="#475569">model ops · signal watching</text>

        {/* Zone: Operator Layer (top-right) */}
        <rect x="302" y="12" width="168" height="120" rx="10" fill="rgba(139,147,153,0.02)" stroke="rgba(139,147,153,0.12)" strokeWidth="1" />
        <text x="314" y="32" fontFamily="monospace" fontSize="8" fill="rgba(139,147,153,0.45)" letterSpacing="2">OPERATOR LAYER</text>
        <text x="314" y="50" fontFamily="monospace" fontSize="10" fill="#e2e8f0">Project Iris</text>
        <text x="314" y="67" fontFamily="monospace" fontSize="10" fill="#e2e8f0">Jerry</text>
        <text x="314" y="85" fontFamily="monospace" fontSize="8" fill="#475569">governed AI · mobile access</text>

        {/* Zone: Education (bottom-right) */}
        <rect x="302" y="148" width="168" height="100" rx="10" fill="rgba(148,163,184,0.025)" stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
        <text x="314" y="168" fontFamily="monospace" fontSize="8" fill="rgba(148,163,184,0.4)" letterSpacing="2">EDUCATION</text>
        <text x="314" y="185" fontFamily="monospace" fontSize="10" fill="#e2e8f0">AI Builders Academy</text>
        <text x="314" y="200" fontFamily="monospace" fontSize="10" fill="#e2e8f0">Young Coders</text>
        <text x="314" y="218" fontFamily="monospace" fontSize="8" fill="#475569">knowledge layer · products</text>

        {/* Arrows between zones */}
        {/* Foundation → AI & Observability: serves inference runtime */}
        <line x1="92" y1="148" x2="92" y2="132" stroke="rgba(251,191,36,0.25)" strokeWidth="1" strokeDasharray="3 2" />
        <polygon points="88,133 92,124 96,133" fill="rgba(251,191,36,0.35)" />
        <text x="96" y="142" fontFamily="monospace" fontSize="7.5" fill="#64748b">serves inference runtime</text>

        {/* Foundation → Operator Layer: secrets + platform APIs */}
        <line x1="176" y1="198" x2="302" y2="198" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3 2" />
        <polygon points="293,194 302,198 293,202" fill="rgba(251,191,36,0.3)" />
        <text x="185" y="192" fontFamily="monospace" fontSize="7.5" fill="#64748b">secrets + platform APIs</text>

        {/* AI & Observability → Operator Layer: model context */}
        <line x1="176" y1="72" x2="302" y2="72" stroke="rgba(139,147,153,0.22)" strokeWidth="1" strokeDasharray="3 2" />
        <polygon points="293,68 302,72 293,76" fill="rgba(139,147,153,0.30)" />
        <text x="185" y="66" fontFamily="monospace" fontSize="7.5" fill="#64748b">model context</text>

        {/* Operator Layer → Education: platform model */}
        <line x1="386" y1="132" x2="386" y2="148" stroke="rgba(148,163,184,0.2)" strokeWidth="1" strokeDasharray="3 2" />
        <polygon points="382,147 386,156 390,147" fill="rgba(148,163,184,0.25)" />
        <text x="312" y="144" fontFamily="monospace" fontSize="7.5" fill="#64748b">platform model</text>
      </svg>
    </div>
  </div>
);

const SystemCard = ({ system, index }) => {
  const Icon = iconMap[system.id] || Layers3;
  const tone = priorityTone[system.websitePriority] || priorityTone["supporting-proof"];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/25 hover:bg-white/[0.04]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-[11px] text-slate-600">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="mt-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{system.role}</div>
        <h3 className="mt-2 text-lg font-semibold text-slate-100">{system.name}</h3>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <p className="text-slate-400">
          <span className="text-slate-200">Problem:</span> {system.problem}
        </p>
        <p className="text-slate-400">
          <span className="text-slate-200">Solution:</span> {system.solution}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {take(system.proofSignals, 4).map((signal) => (
          <span key={signal} className="rounded-md border border-white/[0.07] bg-black/10 px-2 py-1 font-mono text-[11px] text-slate-400">
            {signal}
          </span>
        ))}
      </div>
    </article>
  );
};

const InfraForgeEcosystem = () => {
  const { brandSystems = fallbackBrandSystems } = usePortfolioContent();
  const systems = take(brandSystems.systems, 8);
  const relationshipModel = take(brandSystems.relationshipModel, 5);

  if (!systems.length) return null;

  return (
    <section id="ecosystem" className="relative overflow-hidden border-y border-white/5 bg-[#080d12] py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-600/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel index="05" title="InfraForge Ecosystem" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.055] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-200">
              <Layers3 className="h-3.5 w-3.5" /> Brand systems map
            </div>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-50 lg:text-5xl">
              One company story, multiple problem-solving systems.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              {brandSystems.thesis}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
              The public story is intentionally simple: model operations, operational intelligence, personal AI, mobile AI interaction, secure platform foundations, and practical education products.
            </p>

            <div className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5">
              <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-slate-500">How the loop reads publicly</div>
              <div className="space-y-3">
                {relationshipModel.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-300/80" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <EcosystemMap />
          </div>

          <div className="relative rounded-[2rem] border border-white/[0.07] bg-[#0b1117] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              {systems.map((system, index) => (
                <SystemCard key={system.id} system={system} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfraForgeEcosystem;
