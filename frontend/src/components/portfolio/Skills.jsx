import React from "react";
import {
  Cloud,
  Boxes,
  GitBranch,
  ShieldCheck,
  Activity,
  Sparkles,
  Code2,
  Users,
} from "lucide-react";
import { skillGroups as fallbackSkillGroups } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const iconMap = {
  Cloud,
  Boxes,
  GitBranch,
  ShieldCheck,
  Activity,
  Sparkles,
  Code2,
  Users,
};

const Skills = () => {
  const { skillGroups = fallbackSkillGroups } = usePortfolioContent();
  return (
    <section id="skills" className="relative py-24 lg:py-32 bg-[#0b1117]">
      <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="02" title="Skills" />

        <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 max-w-3xl leading-tight">
            A platform engineer's toolkit, from
            <span className="text-teal-300"> Kubernetes & GitOps </span>
            to AI-assisted operations.
          </h2>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Eight years of compounding experience across cloud infrastructure,
            automation, security, observability, and modern AI workflow design.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon] || Code2;
            return (
              <div
                key={group.id}
                className="group relative rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 hover:border-teal-300/25 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-teal-300/10 border border-teal-300/20 flex items-center justify-center text-teal-300 group-hover:bg-teal-300/15 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-medium text-slate-100">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md font-mono text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.06] hover:border-teal-300/30 hover:text-teal-200 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
