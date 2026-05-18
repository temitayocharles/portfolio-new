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
      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3.5 transition hover:border-teal-400/25 hover:bg-white/[0.03]"
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
        <div className="mt-5 rounded-xl border border-teal-400/10 bg-teal-400/[0.03] px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-teal-300">Cross-cutting concern</p>
          <p className="text-xs leading-6 text-slate-500">
            Observability practices span all lab systems and are not isolated to a single project.
          </p>
        </div>
      )}
    </article>
  );
};

const LabHubSection = ({ projects }) => (
  <div className="space-y-10">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      AI infrastructure · model operations · agent systems · platform experiments
    </p>
    <div className="grid gap-5 md:grid-cols-2">
      {LAB_LANES.map((lane) => (
        <LabLaneCard key={lane.id} lane={lane} projects={projects} />
      ))}
    </div>
  </div>
);

export default LabHubSection;
