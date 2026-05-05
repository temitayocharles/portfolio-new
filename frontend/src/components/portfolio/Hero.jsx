import React, { useEffect, useState } from "react";
import { ArrowRight, Download, MapPin, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, heroStats, heroVisuals } from "@/mock";
import AnimatedStat from "./AnimatedStat";

const ROTATING = [
  "reliable cloud platforms",
  "secure automation",
  "AI-ready infrastructure",
  "observable systems",
  "GitOps delivery",
];

const TERMINAL_LINES = [
  { p: "$", c: "kubectl get platforms --all-namespaces", out: ["NAME           STATUS    AGE", "tca-infraforge READY     8y"] },
  { p: "$", c: "argocd app sync prod --prune --strict", out: ["Synced → 99.99% availability"] },
  { p: "$", c: "terraform apply -auto-approve", out: ["Plan: 14 to add, 0 to destroy"] },
];

const MARQUEE_TECH = [
  "Kubernetes", "ArgoCD", "Terraform", "AWS", "Helm", "Vault", "Prometheus",
  "Grafana", "GitHub Actions", "Envoy", "Istio", "Loki", "Datadog", "Python",
  "FastAPI", "Trivy", "Checkov", "Velero", "Cloudflare", "Tailscale",
];

const Hero = () => {
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
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.4]" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-teal-500/15 blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-amber-400/[0.08] blur-[120px] pointer-events-none animate-drift-rev" />
      <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-teal-300/[0.06] blur-[100px] pointer-events-none animate-glow" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-300/25 bg-teal-300/[0.07] text-teal-300 text-xs font-mono tracking-wide mb-7 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-300" />
              </span>
              Available for new platform engagements
            </div>

            <h1 className="text-[2.7rem] sm:text-5xl lg:text-[4.25rem] font-semibold leading-[1.02] tracking-[-0.03em] text-slate-50 hero-headline">
              <span className="hero-headline-row">
                I build{" "}
                <span className="hero-rotating-slot" aria-live="polite">
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
                for the teams shipping{" "}
                <span className="text-slate-50">tomorrow's</span>{" "}
                <span className="text-teal-300">infrastructure</span>.
              </span>
            </h1>

            <p className="mt-7 text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile.title} with{" "}
              <span className="text-slate-200 font-medium">{profile.yearsExperience} years</span>{" "}
              designing reliable systems, automating infrastructure, and supporting
              production-grade cloud environments, Kubernetes, GitOps, AWS, Terraform,
              DevSecOps, observability, SRE, and AI-assisted operations.
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

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                onClick={() => scrollTo("#projects")}
                size="lg"
                className="bg-teal-300 hover:bg-teal-200 text-[#0a0f14] font-medium shadow-[0_0_36px_-6px] shadow-teal-400/50 group"
              >
                View Projects
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
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
              <div className="absolute -top-12 -right-8 w-44 h-44 rounded-2xl overflow-hidden border border-white/5 rotate-6 opacity-80 hidden md:block">
                <img
                  src={heroVisuals.abstract}
                  alt="Kubernetes cluster network visualization"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f14] via-transparent to-transparent" />
              </div>

              {/* Headshot card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-teal-500/15 via-transparent to-amber-400/[0.08] p-1.5 shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-[#0e1620]">
                  <div className="aspect-[4/5]">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* glowing ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-300/20 pointer-events-none" />
              </div>

              {/* Animated terminal card */}
              <div className="absolute -bottom-8 -left-6 right-2 lg:-left-16 lg:right-6 bg-[#0b121b]/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-300/70" />
                  <div className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <Terminal className="h-3 w-3" /> tca, zsh
                  </div>
                </div>
                <div className="px-3.5 py-3 font-mono text-[11.5px] leading-relaxed">
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
      <div className="relative mt-20 border-y border-white/5 bg-white/[0.015] py-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0f14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0f14] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[...MARQUEE_TECH, ...MARQUEE_TECH].map((t, i) => (
            <span
              key={i}
              className="font-mono text-sm text-slate-500 hover:text-teal-300 transition-colors flex items-center gap-2.5"
            >
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
