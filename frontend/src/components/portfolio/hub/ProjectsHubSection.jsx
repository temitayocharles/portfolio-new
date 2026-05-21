import React from "react";
import { ArrowRight, Cpu, Layers, Lock } from "lucide-react";
import siteSections from "@/content/site-sections.json";
import projectMeta from "@/content/project-meta.json";
import { FLAGSHIP_IDS, asArray, groupAccent, groupIcons } from "./HubDesignTokens";
import { MaturityBadge, SectionHeader, SignalPill, Tag } from "./HubPrimitives";

const FlagshipCard = ({ project }) => {
  const meta = projectMeta[project.id] || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  const cs = project.caseStudy || {};

  return (
    <article className="relative flex flex-col rounded-2xl border border-white/[0.10] bg-white/[0.04] p-7 transition hover:border-teal-400/25 hover:bg-white/[0.055]">
      <div className="absolute top-0 left-7 h-px w-16 bg-slate-500/30" />
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent="teal">{project.category}</Tag>
        {meta.status && <MaturityBadge status={meta.status} accent={meta.statusAccent} />}
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{cs.title || project.name}</h3>
      {meta.problemShort && (
        <p className="mt-2 text-sm text-slate-500">
          <span className="text-slate-600">Problem — </span>
          {meta.problemShort}
        </p>
      )}
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{cs.context || project.description}</p>
      {meta.ecosystemRole && (
        <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">Role in ecosystem</p>
          <p className="text-sm text-slate-300">{meta.ecosystemRole}</p>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {asArray(project.pillars).slice(0, 5).map((token) => (
          <SignalPill key={token}>{token}</SignalPill>
        ))}
      </div>
      {project.visibility && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
          <Lock className="h-3 w-3" />
          {project.visibility}
        </p>
      )}
      <a href={slug} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200">
        View case study <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
};

const ProjectCard = ({ project }) => {
  const meta = projectMeta[project.id] || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  const hasCaseStudy = Boolean(project.caseStudyPath);

  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/20 hover:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent={meta.statusAccent === "teal" ? "teal" : "amber"}>{project.category}</Tag>
        {meta.status && <MaturityBadge status={meta.status} accent={meta.statusAccent || "neutral"} />}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{project.name}</h3>
      {meta.problemShort && <p className="mt-2 text-xs text-slate-600">Problem — {meta.problemShort}</p>}
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {asArray(project.pillars).slice(0, 4).map((token) => (
          <SignalPill key={token}>{token}</SignalPill>
        ))}
      </div>
      {project.visibility && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
          <Lock className="h-3 w-3" />
          {project.visibility}
        </p>
      )}
      {hasCaseStudy && (
        <a href={slug} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200">
          Case study <ArrowRight className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
};

const ProjectsHubSection = ({ projects }) => {
  const sectionDef = siteSections.sections.find((section) => section.id === "projects");
  const groups = sectionDef?.groups || [];
  const projectMap = Object.fromEntries(projects.map((project) => [project.id, project]));
  const flagshipProjects = FLAGSHIP_IDS.map((id) => projectMap[id]).filter(Boolean);

  return (
    <div className="space-y-16">
      {flagshipProjects.length > 0 && (
        <section>
          <SectionHeader
            icon={Cpu}
            label="Flagship systems"
            description="The strongest AI, platform, and operations work in the InfraForge estate."
            accent="teal"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {flagshipProjects.map((project) => (
              <FlagshipCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
      {groups.map((group) => {
        const GroupIcon = groupIcons[group.id] || Layers;
        const accent = groupAccent[group.id] || "teal";
        const groupProjects = group.projectIds
          .map((id) => projectMap[id])
          .filter(Boolean)
          .filter((project) => !FLAGSHIP_IDS.includes(project.id));
        if (!groupProjects.length) return null;

        return (
          <section key={group.id}>
            <SectionHeader icon={GroupIcon} label={group.label} description={group.description} accent={accent} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {groupProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProjectsHubSection;
