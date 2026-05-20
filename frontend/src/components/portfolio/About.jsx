import React from "react";
import { aboutParagraphs as fallbackAboutParagraphs, aboutHighlights as fallbackAboutHighlights, heroVisuals as fallbackHeroVisuals } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { Quote } from "lucide-react";
import Topology from "./Topology";
import AnimatedStat from "./AnimatedStat";

const About = () => {
  const { aboutParagraphs = fallbackAboutParagraphs, aboutHighlights = fallbackAboutHighlights, heroVisuals = fallbackHeroVisuals } = usePortfolioContent();
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="01" title="About" />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-slate-50 leading-tight">
              Founder and platform engineer connecting infrastructure,
              <span className="text-teal-300"> reliability</span>, and
              <span className="text-teal-300"> AI workflows</span> into systems
              companies can operate.
            </h2>

            <div className="mt-8 space-y-5 text-slate-300 leading-[1.75] text-[0.9375rem]">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {aboutHighlights.map((h) => (
                <AnimatedStat key={h.label} value={h.value} label={h.label} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-gradient-to-br from-[#0e1620] via-[#0b121b] to-[#080c11] relative">
                {/* Animated topology */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <Topology />
                </div>
                {/* subtle header label */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300/60" />
                    topology
                  </span>
                  <span>prod.us-east-1</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-6 left-6 right-6 bg-[#0e1620] border border-white/10 rounded-xl p-5 shadow-2xl">
                <Quote className="h-5 w-5 text-teal-300 mb-2" />
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  Reliable platforms aren't built from frameworks alone. They
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
