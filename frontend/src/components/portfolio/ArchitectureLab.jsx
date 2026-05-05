import React, { useMemo, useState } from "react";
import { Activity, ArrowRight, GitBranch, ShieldCheck, Workflow } from "lucide-react";
import { architectureScenarios } from "@/mock";
import { SectionLabel } from "./About";

const icons = [Workflow, ShieldCheck, Activity];
const toneClass = {
  teal: "border-teal-300/35 bg-teal-300/10 text-teal-200 shadow-teal-300/20",
  amber: "border-amber-300/35 bg-amber-300/10 text-amber-200 shadow-amber-300/20",
};

const ArchitectureLab = () => {
  const [activeId, setActiveId] = useState(architectureScenarios[0]?.id);
  const active = useMemo(
    () => architectureScenarios.find((item) => item.id === activeId) || architectureScenarios[0],
    [activeId]
  );

  return (
    <section id="architecture" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.13),transparent_38%),linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="05" title="Architecture" eyebrow="Interactive architecture" />

        <div className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 leading-tight">
              Explore the systems behind the portfolio.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              These diagrams turn the strongest GitHub projects into architecture stories: control planes,
              delivery paths, human-approved AI operations, and recovery-oriented platform design.
            </p>

            <div className="space-y-3 pt-3">
              {architectureScenarios.map((scenario, index) => {
                const Icon = icons[index % icons.length];
                const activeTab = scenario.id === active.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setActiveId(scenario.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
                      activeTab
                        ? "border-teal-300/35 bg-teal-300/[0.08] shadow-[0_18px_70px_-45px_rgba(94,234,212,0.9)]"
                        : "border-white/[0.06] bg-white/[0.025] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 h-9 w-9 rounded-xl border flex items-center justify-center ${activeTab ? "border-teal-300/30 text-teal-300 bg-teal-300/10" : "border-white/10 text-slate-500 bg-white/[0.03]"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{scenario.label}</div>
                        <div className="mt-1 text-sm font-medium text-slate-100">{scenario.title}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative h-full min-h-[540px] rounded-3xl border border-white/10 bg-[#081018]/85 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.14]" />
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 bg-white/[0.025]">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-300">{active.label}</div>
                  <h3 className="mt-1 text-lg font-semibold text-slate-100">{active.title}</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 text-xs font-mono text-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                  {active.metric}
                </div>
              </div>

              <div className="relative h-[360px] sm:h-[420px]">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="archEdge" x1="0" x2="1">
                      <stop offset="0%" stopColor="#5eead4" stopOpacity="0.08" />
                      <stop offset="50%" stopColor="#5eead4" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.18" />
                    </linearGradient>
                  </defs>
                  {active.edges.map(([from, to, label], index) => {
                    const a = active.nodes.find((node) => node.id === from);
                    const b = active.nodes.find((node) => node.id === to);
                    if (!a || !b) return null;
                    const mx = (a.x + b.x) / 2;
                    const my = (a.y + b.y) / 2;
                    return (
                      <g key={`${from}-${to}-${label}`}>
                        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#archEdge)" strokeWidth="0.35" />
                        <circle r="0.7" fill="#5eead4" opacity="0.9">
                          <animateMotion dur={`${4 + (index % 3)}s`} repeatCount="indefinite" path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} begin={`${index * 0.2}s`} />
                        </circle>
                        <text x={mx} y={my - 1.5} textAnchor="middle" fontSize="2.1" fill="#64748b" fontFamily="monospace">
                          {label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {active.nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-xs font-mono backdrop-blur-md shadow-2xl ${toneClass[node.tone] || toneClass.teal}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                    {node.label}
                  </div>
                ))}
              </div>

              <div className="relative border-t border-white/[0.06] p-5 sm:p-6 bg-[#0a0f14]/70">
                <p className="text-sm leading-relaxed text-slate-400 max-w-3xl">{active.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.edges.slice(0, 5).map(([from, to, label]) => (
                    <span key={`${from}-${to}-${label}`} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-mono text-slate-400">
                      <GitBranch className="h-3 w-3 text-teal-300" />
                      {from} <ArrowRight className="h-3 w-3" /> {to}: {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureLab;
