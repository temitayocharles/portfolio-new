import React from "react";
import { ArrowUpRight, Eye, GitBranch, Layers, LockKeyhole, Sparkles } from "lucide-react";
import { projects } from "@/mock";
import { SectionLabel } from "./About";

const accentMap = {
  teal: {
    border: "hover:border-teal-300/35",
    chipBorder: "border-teal-300/20",
    chipText: "text-teal-200",
    iconBg: "bg-teal-300/10 border-teal-300/20 text-teal-300",
    pillarBg: "bg-teal-300/[0.06] text-teal-200 border-teal-300/15",
    glow: "from-teal-300/15",
  },
  amber: {
    border: "hover:border-amber-300/35",
    chipBorder: "border-amber-300/20",
    chipText: "text-amber-200",
    iconBg: "bg-amber-300/10 border-amber-300/20 text-amber-300",
    pillarBg: "bg-amber-300/[0.06] text-amber-200 border-amber-300/15",
    glow: "from-amber-300/15",
  },
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[#0b1117]">
      <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="04" title="Projects" />

        <div className="mt-10 mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 max-w-3xl leading-tight">
            GitHub-backed builds with
            <span className="text-teal-300"> production-shaped</span> constraints.
          </h2>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            I selected the projects that best show platform engineering, AIOps,
            secrets automation, product delivery, and cloud-native architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const accent = accentMap[p.accent] || accentMap.teal;
            const isPublic = p.visibility === "Public repo" && p.repoUrl;
            return (
              <article
                key={p.id}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_-48px_rgba(94,234,212,0.75)] ${accent.border}`}
              >
                <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${accent.glow} to-transparent blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <div className="relative flex items-start justify-between gap-4">
                  <div className={`h-11 w-11 rounded-lg border flex items-center justify-center ${accent.iconBg}`}>
                    {p.accent === "amber" ? <Sparkles className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
                  </div>
                  <span className="font-mono text-xs text-slate-500">/repo.{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="relative mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  <span>{p.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span>{p.signal}</span>
                </div>

                <h3 className="relative mt-3 text-xl font-semibold text-slate-100">{p.name}</h3>
                <div className="relative mt-1 text-sm text-slate-400">{p.subtitle}</div>

                <p className="relative mt-4 text-[14px] text-slate-400 leading-relaxed">{p.description}</p>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {p.pillars.map((pl) => (
                    <span key={pl} className={`px-2.5 py-1 rounded-md font-mono text-[11px] border ${accent.pillarBg}`}>
                      {pl}
                    </span>
                  ))}
                </div>

                <div className="relative mt-5 rounded-xl border border-white/[0.06] bg-black/10 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Eye className="h-3 w-3" /> Proof points
                  </div>
                  <ul className="space-y-1.5">
                    {p.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-teal-300/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-5 pt-5 border-t border-white/5">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 8).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded font-mono text-[11px] text-slate-400 bg-white/[0.03] border border-white/[0.06]">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 8 && (
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] text-slate-500 bg-white/[0.02] border border-white/[0.04]">
                        +{p.stack.length - 8}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative mt-6 flex items-center justify-between gap-3 text-sm">
                  <div className="inline-flex items-center gap-1.5 text-slate-500">
                    {isPublic ? <GitBranch className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
                    <span>{p.visibility}</span>
                  </div>
                  {isPublic ? (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors">
                      View repo <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      Case study <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
