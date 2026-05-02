import React from "react";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, heroStats, heroVisuals } from "@/mock";

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative pt-32 pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.35]" />
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-0 h-[360px] w-[360px] rounded-full bg-amber-400/[0.06] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-300/20 bg-teal-300/5 text-teal-300 text-xs font-mono tracking-wide mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
              Available for new platform engagements
            </div>

            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[4rem] font-semibold leading-[1.05] tracking-tight text-slate-50">
              I build{" "}
              <span className="text-teal-300">reliable cloud platforms</span>,
              <br className="hidden sm:block" />
              secure automation, and{" "}
              <span className="relative inline-block">
                <span className="text-teal-300">AI-ready infrastructure</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5 Q 50 0 100 4 T 200 3"
                    stroke="#5eead4"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.55"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile.title} with {profile.yearsExperience} years designing
              reliable systems, automating infrastructure, and supporting
              production-grade cloud environments — Kubernetes, GitOps, AWS,
              Terraform, DevSecOps, observability, SRE, and AI-assisted
              operations.
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Sparkles className="h-3.5 w-3.5 text-amber-300/80" />
                {profile.yearsExperience}+ yrs · DevOps · Platform · AIOps
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                onClick={() => scrollTo("#projects")}
                size="lg"
                className="bg-teal-300 hover:bg-teal-200 text-[#0a0f14] font-medium shadow-[0_0_30px_-6px] shadow-teal-400/40"
              >
                View Projects
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-slate-200 hover:text-white"
              >
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 mr-1.5" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="group rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-teal-300/20 px-4 py-3 transition-colors"
                >
                  <div className="text-xl font-semibold text-slate-100 font-mono tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md mx-auto">
              {/* Decorative abstract image */}
              <div className="absolute -top-10 -right-6 w-44 h-44 rounded-2xl overflow-hidden border border-white/5 rotate-6 opacity-80 hidden md:block">
                <img
                  src={heroVisuals.abstract}
                  alt="Kubernetes cluster network visualization"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f14] via-transparent to-transparent" />
              </div>

              {/* Headshot card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-teal-500/10 to-transparent p-1.5 shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-[#0e1620]">
                  <div className="aspect-[4/5]">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating tag bottom-left */}
              <div className="absolute -bottom-5 -left-5 bg-[#0e1620] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl">
                <div className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_10px] shadow-teal-300" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">
                    Currently
                  </div>
                  <div className="text-sm text-slate-200 font-medium">
                    Senior DevOps & Platform Engineer
                  </div>
                </div>
              </div>

              {/* Floating tag top-right */}
              <div className="absolute -top-4 left-4 bg-[#0e1620] border border-white/10 rounded-lg px-3 py-2 font-mono text-[11px] text-teal-300 shadow-xl">
                kubectl get platforms --all-namespaces
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
