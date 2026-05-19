import React, { useEffect, useState } from "react";
import { ArrowRight, Download, MapPin, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile as fallbackProfile, heroStats as fallbackHeroStats, heroVisuals as fallbackHeroVisuals } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import AnimatedStat from "./AnimatedStat";
import PlatformShowcase from "./PlatformShowcase";

const ROTATING = [
  "company-ready platforms",
  "secure automation",
  "AI-ready infrastructure",
  "observable systems",
  "GitOps delivery",
];

const TERMINAL_LINES = [
  { p: "$", c: "kubectl get platforms --all-namespaces", out: ["NAME           STATUS    AGE", "tca-infraforge READY     founder"] },
  { p: "$", c: "argocd app sync prod --prune --strict", out: ["Synced → 99.99% availability"] },
  { p: "$", c: "terraform apply -auto-approve", out: ["Plan: 14 to add, 0 to destroy"] },
];

const MARQUEE_TECH = [
  "Kubernetes", "ArgoCD", "Terraform", "AWS", "Helm", "Vault", "Prometheus",
  "Grafana", "GitHub Actions", "Envoy", "Istio", "Loki", "Datadog", "Python",
  "FastAPI", "Trivy", "Checkov", "Velero", "Cloudflare", "Tailscale",
];

const Hero = () => {
  const { profile = fallbackProfile, heroStats = fallbackHeroStats, heroVisuals = fallbackHeroVisuals } = usePortfolioContent();
  const [wordIdx, setWordIdx] = useState(0);
  const [termLine, setTermLine] = useState(0);
  const [typed, setTyped] = useState("");

  // Rotating tagline word
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Terminal typewriter
  useEffect(() => {
    const line = TERMINAL_LINES[termLine];
    let i = 0;
    setTyped("");
    const typer = setInterval(() => {
      i += 1;
      setTyped(line.c.slice(0, i));
      if (i >= line.c.length) {
        clearInterval(typer);
        setTimeout(() => setTermLine((n) => (n + 1) % TERMINAL_LINES.length), 2200);
      }
    }, 55);
    return () => clearInterval(typer);
  }, [termLine]);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentLine = TERMINAL_LINES[termLine];

  return (
    <section id="top" className="relative pt-32 pb-24 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* bg-grid only — orbs removed */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.18]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-300/25 bg-teal-300/[0.07] text-teal-300 text-xs font-mono tracking-wide mb-7 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-300" />
              </span>
              Available for new platform engagements
            </div>

            <h1 className="text-[2.7rem] sm:text-5xl lg:text-[4.25rem] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-50 hero-headline">
              <span className="sr-only">I build secure automation for the teams shipping tomorrow's infrastructure.</span>
              <span aria-hidden="true">
              <span className="hero-headline-row">
                I build{" "}
                <span className="hero-rotating-slot" aria-live="polite" aria-atomic="true">
                  <span
                    key={wordIdx}
                    className="hero-rotating-word bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 bg-clip-text text-transparent"
                  >
                    {ROTATING[wordIdx]}
                  </span>
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M0 5 Q 50 0 100 4 T 200 3" stroke="#5eead4" strokeWidth="2" fill="none" opacity="0.5" />
                  </svg>
                </span>
              </span>
              <span className="block mt-1 lg:mt-2">
                {" for the teams shipping "}
                <span className="text-slate-50">tomorrow's</span>{" "}
                <span className="text-teal-300">infrastructure</span>.
              </span>
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {profile.title} with{" "}
              <span className="font-medium text-slate-200">{profile.yearsExperience} years</span>{" "}
              shipping reliable platforms across Kubernetes, GitOps, AWS, Terraform,
              DevSecOps, observability, and AI-assisted operations.
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Sparkles className="h-3.5 w-3.5 text-amber-300/80" />
                DevOps · Platform · AIOps
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <Button
                onClick={() => scrollTo("#projects")}
                size="lg"
                className="min-h-11 w-full bg-teal-300 font-medium text-[#0a0f14] hover:bg-teal-200 sm:w-auto group"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 w-full border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:text-white sm:w-auto"
              >
                <a href="/studies" aria-label="Read architecture and case studies">
                  Read Case Studies
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 w-full border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:text-white sm:w-auto"
              >
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" aria-label="Download Temitayo Charles Akinniranye resume as PDF">
                  <Download className="h-4 w-4 mr-1.5" />
                  Download Resume
                </a>
              </Button>
            </div>

            <PlatformShowcase />

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {heroStats.map((s, i) => (
                <div key={s.label} style={{ animation: `fade-up 0.6s ease-out ${i * 80}ms both` }}>
                  <AnimatedStat value={s.value} label={s.label} />
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md mx-auto">
              {/* Decorative abstract image */}
              <div className="absolute -top-12 -right-8 w-44 h-44 rounded-2xl overflow-hidden border border-white/5 rotate-6 opacity-80 hidden md:block pointer-events-none">
                <img
                  src={heroVisuals.abstract}
                  alt="Kubernetes cluster network visualization"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f14] via-transparent to-transparent" />
              </div>

              {/* Headshot card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0f1a14]/40 p-1.5 shadow-2xl">
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

              {/* Animated terminal card */}
              <div className="absolute -bottom-8 -left-6 right-2 lg:-left-16 lg:right-6 min-h-[126px] bg-[#0b121b]/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-300/70" />
                  <div className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <Terminal className="h-3 w-3" /> tca, zsh
                  </div>
                </div>
                <div className="px-3.5 py-3 min-h-[90px] font-mono text-[11.5px] leading-relaxed">
                  <div className="text-teal-300">
                    <span className="text-slate-500 mr-1.5">{currentLine.p}</span>
                    <span className="term-cursor">{typed}</span>
                  </div>
                  {typed === currentLine.c &&
                    currentLine.out.map((line, i) => (
                      <div key={i} className="text-slate-400 pl-3 mt-0.5">
                        {line}
                      </div>
                    ))}
                </div>
              </div>

              {/* Floating tag top-right */}
              <div className="absolute -top-3 left-2 bg-[#0e1620] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-[11px] text-amber-200/90 shadow-xl flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                99.99% uptime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee tech stack */}
      <div className="relative mt-16 overflow-hidden border-y border-white/5 bg-white/[0.015] py-3.5 sm:mt-20 sm:py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0f14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0f14] to-transparent z-10 pointer-events-none" />
        <div className="hidden md:flex animate-marquee gap-7 whitespace-nowrap md:gap-10" aria-hidden="true">
          {[...MARQUEE_TECH, ...MARQUEE_TECH].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-teal-300 sm:gap-2.5 sm:text-sm font-mono"
            >
              <span className="h-1 w-1 rounded-full bg-teal-300/40" />
              {t}
            </span>
          ))}
        </div>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 md:hidden">
          {MARQUEE_TECH.map((t) => (
            <span key={t} className="inline-flex min-w-0 items-center gap-1.5 break-words font-mono text-xs text-slate-500">
              <span className="h-1 w-1 rounded-full bg-teal-300/40" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
