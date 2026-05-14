import React, { useState } from "react";
import { ArrowRight, ExternalLink, GraduationCap, Layers3, Rocket, Sparkles } from "lucide-react";

const platforms = [
  {
    id: "academy",
    label: "Live platform",
    title: "AI Builders Academy",
    summary: "A public academy brand built around real tools, guided cohorts, parent-visible progress, and portfolio-ready learner work.",
    proof: ["Live product", "Education brand", "Builder outcomes"],
    href: "https://ai-builders-academy.online",
    action: "Open academy",
    icon: GraduationCap,
  },
  {
    id: "coders",
    label: "Release build",
    title: "Young Coders",
    summary: "A product platform for missions, progress, recaps, media workflows, account-owner workspaces, billing, auth, and staged Kubernetes delivery.",
    proof: ["Missions", "Progress", "Workspace platform"],
    href: null,
    action: "Launching soon",
    icon: Rocket,
  },
  {
    id: "infra",
    label: "Architecture proof",
    title: "InfraForge Architecture",
    summary: "A public-facing map for the infrastructure layer behind the products: GitOps, Kubernetes, routing, secrets, observability, and operations.",
    proof: ["GitOps", "Kubernetes", "Operations"],
    href: null,
    action: "DNS pending",
    icon: Layers3,
  },
];

const PlatformShowcase = () => {
  const [activeId, setActiveId] = useState(platforms[0].id);
  const active = platforms.find((item) => item.id === activeId) || platforms[0];
  const ActiveIcon = active.icon;

  return (
    <div className="mt-10 max-w-3xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/[0.06] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-teal-200">
        <Sparkles className="h-3.5 w-3.5" />
        Flagship platforms
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-[0_28px_90px_-34px_rgba(20,184,166,0.65)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[300px] p-6 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(96,165,250,0.14),transparent_34%)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200">
                  <ActiveIcon className="h-4 w-4 text-teal-200" />
                  {active.label}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">{active.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">{active.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.proof.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-200">{item}</span>
                ))}
              </div>
              <div className="mt-6">
                {active.href ? (
                  <a href={active.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-200">
                    {active.action}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-slate-300">
                    {active.action}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/20 p-3 lg:border-l lg:border-t-0">
            <div className="grid gap-2">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                const isActive = platform.id === active.id;
                return (
                  <button key={platform.id} type="button" onClick={() => setActiveId(platform.id)} className={`group rounded-2xl border p-4 text-left transition ${isActive ? "border-teal-200/40 bg-white/[0.10]" : "border-white/10 bg-white/[0.035] hover:bg-white/[0.07]"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <span className={`grid h-9 w-9 place-items-center rounded-xl ${isActive ? "bg-teal-300 text-slate-950" : "bg-white/10 text-slate-300"}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">0{index + 1}</div>
                          <div className="mt-1 text-sm font-semibold text-slate-100">{platform.title}</div>
                          <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">{platform.summary}</div>
                        </div>
                      </div>
                      <ArrowRight className={`mt-1 h-4 w-4 shrink-0 transition ${isActive ? "text-teal-200" : "text-slate-600 group-hover:text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformShowcase;
