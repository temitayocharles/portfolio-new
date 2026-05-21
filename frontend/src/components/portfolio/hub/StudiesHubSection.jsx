import React from "react";
import projectMeta from "@/content/project-meta.json";
import siteSections from "@/content/site-sections.json";
import { asArray, studyTypeConfig, studyTypeOrder } from "./HubDesignTokens";
import { SectionHeader, SignalPill, Tag } from "./HubPrimitives";
import { ArrowRight } from "lucide-react";

const StudyCard = ({ project }) => {
  const typeMeta = projectMeta[project.id] || {};
  const studyAccent = typeMeta.studyAccent || "teal";
  const studyLabel = typeMeta.studyLabel || "Study";
  const cs = project.caseStudy || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  const evidenceSnippet = asArray(cs.evidence)[0] || null;

  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-stone-400/18 hover:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent={studyAccent}>{studyLabel}</Tag>
        <Tag accent={typeMeta.statusAccent || "neutral"}>{project.category}</Tag>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{cs.title || project.name}</h2>
      {typeMeta.problemShort && (
        <div className="mt-4 border-l-2 border-amber-400/40 pl-4">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">Problem</p>
          <p className="text-sm text-slate-300">{typeMeta.problemShort}</p>
        </div>
      )}
      {cs.result && (
        <div className="mt-4">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">System response</p>
          <p className="text-sm leading-7 text-slate-400">{cs.result}</p>
        </div>
      )}
      {evidenceSnippet && (
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/15 px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">Proof</p>
          <p className="text-xs leading-6 text-slate-400">{evidenceSnippet}</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {asArray(project.pillars).slice(0, 4).map((token) => (
          <SignalPill key={token}>{token}</SignalPill>
        ))}
      </div>
      <a href={slug} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200">
        Read study <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
};

const StudiesHubSection = ({ projects }) => {
  const sectionDef = siteSections.sections.find((section) => section.id === "studies");
  const studyIds = sectionDef?.studyIds || [];
  const projectMap = Object.fromEntries(projects.map((project) => [project.id, project]));
  const grouped = {};

  for (const id of studyIds) {
    const project = projectMap[id];
    if (!project) continue;
    const typeMeta = projectMeta[id] || {};
    const studyType = typeMeta.studyType || "case-study";
    if (!grouped[studyType]) grouped[studyType] = [];
    grouped[studyType].push(project);
  }

  const totalCount = studyIds.filter((id) => projectMap[id]).length;

  return (
    <div className="space-y-16">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
        {totalCount} stud{totalCount !== 1 ? "ies" : "y"} · problem-solution architecture breakdowns
      </p>
      {studyTypeOrder.map((typeKey) => {
        const group = grouped[typeKey];
        if (!group?.length) return null;
        const config = studyTypeConfig[typeKey];

        return (
          <section key={typeKey}>
            <SectionHeader icon={config.icon} label={config.label} description={config.description} accent={config.accent} />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {group.map((project) => (
                <StudyCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default StudiesHubSection;
