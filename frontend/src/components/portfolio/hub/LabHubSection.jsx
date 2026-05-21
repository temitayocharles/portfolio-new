import React from "react";
import { ChevronRight } from "lucide-react";
import projectMeta from "@/content/project-meta.json";
import { ACCENT, LAB_LANES } from "./HubDesignTokens";

const LabSystemLink = ({ project }) => {
  const meta = projectMeta[project.id] || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;

  return (
    <a
      href={slug}
      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3.5 transition hover:border-stone-400/22 hover:bg-white/[0.03]"
    >
      <div>
        <p className="text-sm font-medium text-slate-200">{project.name}</p>
        {meta.ecosystemRole && <p className="mt-0.5 text-xs text-slate-600">{meta.ecosystemRole}</p>}
      </div>
      <ChevronRight className="h-4 w-4 flex-none text-slate-600" />
    </a>
  );
};

const LabLaneCard = ({ lane, projects }) => {
  const LaneIcon = lane.icon;
  const accent = ACCENT[lane.accent] || ACCENT.teal;
  const relatedProjects = lane.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

  return (
    <article className={`flex flex-col rounded-2xl border bg-white/[0.03] p-6 ${accent.border}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}>
          <LaneIcon className="h-4 w-4" />
        </span>
        <h2 className="text-base font-semibold text-white">{lane.label}</h2>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-400">{lane.description}</p>
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-4">
        <p className="text-xs leading-6 text-slate-400">{lane.positioning}</p>
      </div>
      {relatedProjects.length > 0 && (
        <div className="mt-5 space-y-2.5">
          {relatedProjects.map((project) => (
            <LabSystemLink key={project.id} project={project} />
          ))}
        </div>
      )}
      {lane.standalone && (
        <div className="mt-5 rounded-xl border border-stone-400/10 bg-stone-400/[0.03] px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-stone-400">Cross-cutting concern</p>
          <p className="text-xs leading-6 text-slate-500">
            Observability practices span all lab systems and are not isolated to a single project.
          </p>
        </div>
      )}
    </article>
  );
};

const LabLoopDiagram = () => (
  <div className="mb-10">
    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">How the four lanes relate</div>
    <svg
      viewBox="0 0 580 72"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-2xl"
      aria-label="Lab lane dependency loop: Model Ops feeds Agent Surfaces feeds Operator Interfaces, Observability closes the loop"
      role="img"
    >
      {/* Lane boxes */}
      <rect x="2" y="16" width="118" height="40" rx="8" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.22)" strokeWidth="1"/>
      <text x="61" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(251,191,36,0.7)" letterSpacing="1">MODEL OPS</text>
      <text x="61" y="47" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#475569">AI Inference Lab</text>

      <rect x="156" y="16" width="118" height="40" rx="8" fill="rgba(139,147,153,0.04)" stroke="rgba(139,147,153,0.20)" strokeWidth="1"/>
      <text x="215" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(139,147,153,0.72)" letterSpacing="1">AGENT SURFACES</text>
      <text x="215" y="47" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#475569">Iris · Jerry · ForgeWatch</text>

      <rect x="310" y="16" width="118" height="40" rx="8" fill="rgba(139,147,153,0.03)" stroke="rgba(139,147,153,0.14)" strokeWidth="1"/>
      <text x="369" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(139,147,153,0.58)" letterSpacing="1">INFRA PLATFORM</text>
      <text x="369" y="47" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#475569">InfraForge · VaultOps</text>

      <rect x="464" y="16" width="114" height="40" rx="8" fill="rgba(148,163,184,0.03)" stroke="rgba(148,163,184,0.12)" strokeWidth="1"/>
      <text x="521" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(148,163,184,0.5)" letterSpacing="1">EVAL / OBS</text>
      <text x="521" y="47" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#475569">Prometheus · Loki</text>

      {/* Forward arrows */}
      <line x1="120" y1="36" x2="154" y2="36" stroke="rgba(139,147,153,0.28)" strokeWidth="1"/>
      <polygon points="150,33 154,36 150,39" fill="rgba(139,147,153,0.42)"/>

      <line x1="274" y1="36" x2="308" y2="36" stroke="rgba(139,147,153,0.22)" strokeWidth="1"/>
      <polygon points="304,33 308,36 304,39" fill="rgba(139,147,153,0.32)"/>

      <line x1="428" y1="36" x2="462" y2="36" stroke="rgba(148,163,184,0.2)" strokeWidth="1"/>
      <polygon points="458,33 462,36 458,39" fill="rgba(148,163,184,0.25)"/>

      {/* Loop-back arc from Eval/Obs back to Model Ops */}
      <path d="M521 56 Q521 68 280 68 Q60 68 61 56" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="1" strokeDasharray="3 3"/>
      <polygon points="57,53 61,57 65,53" fill="rgba(148,163,184,0.2)"/>
    </svg>
  </div>
);

const LabHubSection = ({ projects }) => (
  <div className="space-y-10">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      AI infrastructure · model operations · agent systems · platform experiments
    </p>
    <LabLoopDiagram />
    <div className="grid gap-5 md:grid-cols-2">
      {LAB_LANES.map((lane) => (
        <LabLaneCard key={lane.id} lane={lane} projects={projects} />
      ))}
    </div>
  </div>
);

export default LabHubSection;
