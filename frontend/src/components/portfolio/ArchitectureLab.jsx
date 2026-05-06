import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  Filter,
  GitBranch,
  Layers,
  Network,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { projectArchitectures } from "@/mock";
import { SectionLabel } from "./About";

const iconMap = {
  infraforge: Building2,
  "project-iris": Sparkles,
  "ai-builders-academy": Workflow,
  "vault-ops": ShieldCheck,
  forgewatch: Activity,
  openleaf: Network,
};

const toneClass = {
  teal: "border-teal-300/35 bg-teal-300/10 text-teal-100 shadow-teal-300/20",
  amber: "border-amber-300/35 bg-amber-300/10 text-amber-100 shadow-amber-300/20",
};

const nodeToneDot = {
  teal: "bg-teal-300 shadow-teal-300/50",
  amber: "bg-amber-300 shadow-amber-300/50",
};

const ArchitectureLab = () => {
  const [activeId, setActiveId] = useState(projectArchitectures[0]?.id);
  const [activeTab, setActiveTab] = useState(projectArchitectures[0]?.diagramImage ? "Visual" : "Topology");
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(projectArchitectures[0]?.nodes?.[0]?.id);

  const active = useMemo(
    () => projectArchitectures.find((item) => item.id === activeId) || projectArchitectures[0],
    [activeId]
  );

  const selectedNode = useMemo(
    () => active.nodes.find((node) => node.id === selectedNodeId) || active.nodes[0],
    [active, selectedNodeId]
  );

  const filteredNodes = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return active.nodes;
    return active.nodes.filter((node) =>
      [node.label, node.layer, node.details].join(" ").toLowerCase().includes(needle)
    );
  }, [active.nodes, query]);

  const visibleNodeIds = new Set(filteredNodes.map((node) => node.id));
  const visibleEdges = active.edges.filter(([from, to, label]) => {
    if (!query.trim()) return true;
    return visibleNodeIds.has(from) || visibleNodeIds.has(to) || label.toLowerCase().includes(query.trim().toLowerCase());
  });

  const chooseArchitecture = (id) => {
    const next = projectArchitectures.find((item) => item.id === id) || projectArchitectures[0];
    setActiveId(id);
    setActiveTab(next.diagramImage ? "Visual" : "Topology");
    setQuery("");
    setSelectedNodeId(next.nodes[0]?.id);
  };

  return (
    <section id="architecture" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.13),transparent_38%),linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/30 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="05" title="Architecture" eyebrow="Interactive infrastructure" />

        <div className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <aside className="lg:col-span-4 space-y-5">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50 leading-tight">
                Explore the systems behind each company-grade project.
              </h2>
              <p className="mt-5 text-slate-400 text-sm leading-relaxed">
                Each map turns repository structure and operating intent into a clickable architecture view: services,
                trust boundaries, evidence paths, delivery lanes, and recovery controls.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter nodes, layers, controls"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition focus:border-teal-300/40 focus:ring-2 focus:ring-teal-300/15"
              />
            </div>

            <div className="grid gap-3">
              {projectArchitectures.map((item) => {
                const Icon = iconMap[item.id] || Layers;
                const isActive = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseArchitecture(item.id)}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-teal-300/35 bg-teal-300/[0.08] shadow-[0_18px_70px_-45px_rgba(94,234,212,0.9)]"
                        : "border-white/[0.06] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 h-10 w-10 rounded-xl border flex items-center justify-center ${isActive ? "border-teal-300/30 text-teal-300 bg-teal-300/10" : "border-white/10 text-slate-500 bg-white/[0.03] group-hover:text-slate-300"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                        <div className="mt-1 text-sm font-medium text-slate-100">{item.title}</div>
                        <div className="mt-1 truncate text-xs text-slate-500">{item.repo}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081018]/90 shadow-2xl">
              <div className="absolute inset-0 bg-grid opacity-[0.13]" />
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl" />

              <div className="relative border-b border-white/[0.06] bg-white/[0.025] p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-300">{active.label}</div>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-50">{active.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{active.summary}</p>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 text-xs font-mono text-amber-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                    {active.metric}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono transition ${
                        activeTab === tab
                          ? "border-teal-300/35 bg-teal-300/10 text-teal-200"
                          : "border-white/[0.07] bg-white/[0.025] text-slate-500 hover:text-slate-300 hover:border-white/15"
                      }`}
                    >
                      {tab === "Visual" && <Sparkles className="h-3 w-3" />}
                      {tab === "Topology" && <Route className="h-3 w-3" />}
                      {tab === "Flows" && <GitBranch className="h-3 w-3" />}
                      {tab === "Controls" && <ShieldCheck className="h-3 w-3" />}
                      {tab}
                    </button>
                  ))}
                </div>
              </div>


              {activeTab === "Visual" && active.diagramImage && (
                <div className="relative p-4 sm:p-6">
                  <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] shadow-[0_28px_90px_-50px_rgba(15,23,42,0.9)]">
                    <div className="relative bg-slate-950/40">
                      <img
                        src={active.diagramImage.src}
                        alt={active.diagramImage.alt}
                        loading="lazy"
                        className="block w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081018]/85 to-transparent" />
                    </div>
                    <div className="grid gap-4 border-t border-white/[0.06] bg-[#0a0f14]/88 p-4 sm:grid-cols-[1.2fr_0.8fr] sm:p-5">
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-300">Curated systems visual</div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          This board is the executive visual for the project. Use the topology, flows, and controls tabs for the interactive technical drill-down.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Source</div>
                        <div className="mt-2 text-sm font-medium text-slate-200">{active.repo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Topology" && (
                <div className="relative grid min-h-[620px] lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="relative h-[520px] sm:h-[580px]">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      <defs>
                        <linearGradient id="projectArchEdge" x1="0" x2="1">
                          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.08" />
                          <stop offset="50%" stopColor="#5eead4" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.22" />
                        </linearGradient>
                      </defs>
                      {visibleEdges.map(([from, to, label], index) => {
                        const a = active.nodes.find((node) => node.id === from);
                        const b = active.nodes.find((node) => node.id === to);
                        if (!a || !b) return null;
                        const mx = (a.x + b.x) / 2;
                        const my = (a.y + b.y) / 2;
                        const selected = selectedNode && (selectedNode.id === from || selectedNode.id === to);
                        return (
                          <g key={`${from}-${to}-${label}`} opacity={query.trim() || selected ? selected || !selectedNode ? 1 : 0.45 : 1}>
                            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#projectArchEdge)" strokeWidth={selected ? "0.55" : "0.32"} />
                            <circle r="0.7" fill={selected ? "#fbbf24" : "#5eead4"} opacity="0.95">
                              <animateMotion dur={`${4 + (index % 3)}s`} repeatCount="indefinite" path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} begin={`${index * 0.18}s`} />
                            </circle>
                            <text x={mx} y={my - 1.5} textAnchor="middle" fontSize="2.1" fill={selected ? "#cbd5e1" : "#64748b"} fontFamily="monospace">
                              {label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {filteredNodes.map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left text-xs font-mono backdrop-blur-md shadow-2xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 ${toneClass[node.tone] || toneClass.teal} ${selectedNode?.id === node.id ? "ring-2 ring-teal-300/40" : ""}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                        <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full shadow-lg ${nodeToneDot[node.tone] || nodeToneDot.teal}`} />
                        {node.label}
                      </button>
                    ))}
                  </div>

                  <aside className="relative border-t border-white/[0.06] bg-[#0a0f14]/72 p-5 lg:border-l lg:border-t-0">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      <Filter className="h-3.5 w-3.5" /> Selected node
                    </div>
                    <h4 className="mt-3 text-xl font-semibold text-slate-100">{selectedNode?.label}</h4>
                    <div className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-mono text-slate-400">
                      {selectedNode?.layer}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{selectedNode?.details}</p>

                    <div className="mt-6 border-t border-white/[0.06] pt-5">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Business value</div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{active.businessValue}</p>
                    </div>
                  </aside>
                </div>
              )}

              {activeTab === "Flows" && (
                <div className="relative p-5 sm:p-6">
                  <div className="grid gap-4">
                    {active.flows.map((flow, index) => (
                      <div key={flow} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-teal-300/25 hover:bg-teal-300/[0.045]">
                        <div className="flex items-start gap-4">
                          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/10 font-mono text-xs text-teal-200">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div>
                            <div className="text-sm leading-relaxed text-slate-300">{flow}</div>
                            {active.edges[index] && (
                              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/15 px-3 py-1.5 text-[11px] font-mono text-slate-500">
                                {active.edges[index][0]} <ArrowRight className="h-3 w-3" /> {active.edges[index][1]}: {active.edges[index][2]}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Controls" && (
                <div className="relative p-5 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {active.controls.map((control) => (
                      <div key={control} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-300" />
                          <div>
                            <div className="font-medium text-slate-100">{control}</div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                              This control is visible in the architecture so users can see how the system is operated, secured, or recovered.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureLab;
