import React from "react";
import { Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { experiences as fallbackExperiences } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const Experience = () => {
  const { experiences = fallbackExperiences } = usePortfolioContent();
  return (
    <section id="experience" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="03" title="Experience" />

        <div className="mt-10 mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 max-w-3xl leading-tight">
            From Linux systems to{" "}
            <span className="text-teal-300">AI-assisted platform engineering</span>.
          </h2>
        </div>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-teal-300/40 via-white/10 to-transparent" />

          <ol className="space-y-10">
            {experiences.map((exp, idx) => (
              <li key={exp.id} className="relative pl-12 md:pl-16">
                {/* Marker */}
                <span className="absolute left-0 md:left-1 top-1 h-7 w-7 rounded-full bg-[#0e1620] border border-teal-300/40 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-teal-300" />
                </span>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] hover:border-teal-300/20 transition-colors p-6 lg:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-teal-300 font-mono uppercase tracking-wider">
                        <Briefcase className="h-3.5 w-3.5" />
                        {exp.period}
                      </div>
                      <h3 className="mt-2 text-xl lg:text-[1.35rem] font-semibold text-slate-100 leading-snug">
                        {exp.role}
                      </h3>
                      <div className="mt-1 text-sm text-slate-400">
                        <span className="text-slate-200">{exp.company}</span>
                        <span className="mx-2 text-slate-600">•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {String(experiences.length - idx).padStart(2, "0")} /{" "}
                      {String(experiences.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-4 text-slate-400 leading-relaxed text-[15px]">
                    {exp.summary}
                  </p>

                  <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2.5 text-sm text-slate-300/90 leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-teal-300/80 flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
