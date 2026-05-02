import React from "react";
import { aboutParagraphs, aboutHighlights, heroVisuals } from "@/mock";
import { Quote } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="01" title="About" />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 leading-tight">
              Eight years connecting infrastructure,
              <span className="text-teal-300"> reliability</span>, and
              <span className="text-teal-300"> AI workflows</span> into systems
              that solve real business problems.
            </h2>

            <div className="mt-8 space-y-5 text-slate-400 leading-relaxed">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {aboutHighlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-4"
                >
                  <div className="text-2xl font-semibold text-slate-100 font-mono">
                    {h.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5]">
                <img
                  src={heroVisuals.aboutVisual}
                  alt="Abstract infrastructure network nodes"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] via-transparent to-[#0a0f14]/40" />
              </div>

              <div className="absolute -bottom-6 left-6 right-6 bg-[#0e1620] border border-white/10 rounded-xl p-5 shadow-2xl">
                <Quote className="h-5 w-5 text-teal-300 mb-2" />
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  Reliable platforms aren't built from frameworks alone — they
                  emerge from disciplined automation, sharp observability, and
                  thoughtful human-in-the-loop controls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionLabel = ({ index, title, eyebrow }) => (
  <div className="flex items-center gap-4">
    <span className="font-mono text-xs text-teal-300">{index}</span>
    <span className="h-px w-10 bg-teal-300/40" />
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
      {eyebrow || title}
    </span>
  </div>
);

export default About;
