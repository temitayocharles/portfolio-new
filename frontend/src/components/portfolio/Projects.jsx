import React from "react";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { projects } from "@/mock";
import { SectionLabel } from "./About";

const accentMap = {
  teal: {
    border: "hover:border-teal-300/30",
    chipBorder: "border-teal-300/20",
    chipText: "text-teal-200",
    iconBg: "bg-teal-300/10 border-teal-300/20 text-teal-300",
    pillarBg: "bg-teal-300/[0.06] text-teal-200 border-teal-300/15",
  },
  amber: {
    border: "hover:border-amber-300/30",
    chipBorder: "border-amber-300/20",
    chipText: "text-amber-200",
    iconBg: "bg-amber-300/10 border-amber-300/20 text-amber-300",
    pillarBg: "bg-amber-300/[0.06] text-amber-200 border-amber-300/15",
  },
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[#0b1117]">
      <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="04" title="Projects" />

        <div className="mt-10 mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 max-w-3xl leading-tight">
            Production-style platforms,
            <span className="text-teal-300"> AIOps experiments</span>, and
            cloud-native simulations.
          </h2>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Hands-on engineering builds focused on reliability, security,
            observability, and AI-assisted operations, not slideware.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const accent = accentMap[p.accent] || accentMap.teal;
            return (
              <article
                key={p.id}
                className={`group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-7 transition-colors ${accent.border}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`h-11 w-11 rounded-lg border flex items-center justify-center ${accent.iconBg}`}
                  >
                    {p.accent === "amber" ? (
                      <Sparkles className="h-5 w-5" />
                    ) : (
                      <Layers className="h-5 w-5" />
                    )}
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    /proj.{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-100">
                  {p.name}
                </h3>
                <div className="mt-1 text-sm text-slate-400">{p.subtitle}</div>

                <p className="mt-4 text-[14.5px] text-slate-400 leading-relaxed">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.pillars.map((pl) => (
                    <span
                      key={pl}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] border ${accent.pillarBg}`}
                    >
                      {pl}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-white/5">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded font-mono text-[11px] text-slate-400 bg-white/[0.03] border border-white/[0.06]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-sm text-slate-400 group-hover:text-teal-300 transition-colors">
                  <span>Case study</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
