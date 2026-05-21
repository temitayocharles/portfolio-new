import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Network,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  Layers,
  Activity,
  Lightbulb,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SectionLabel } from "./About";
import { Toaster } from "@/components/ui/toaster";
import {
  PortfolioContentProvider,
  usePortfolioContent,
} from "@/context/PortfolioContentContext";
import { projects as fallbackProjects } from "@/mock";

const asArray = (value) => (Array.isArray(value) ? value : []);

const FEATURED_CASE_STUDIES = [
  "ai-inference-lab",
  "project-iris",
  "sentinel-copilot",
  "infraforge",
  "jerry",
  "openleaf",
  "vault-ops",
];

// ─── Category accent mapping ──────────────────────────────────────────────────

const CATEGORY_ACCENT = {
  "InfraForge AI Lab": "amber",
  "Founder-led Platform Company": "teal",
  "AIOps / Platform Operations": "teal",
  "Personal AI": "amber",
  "Mobile AI Companion": "amber",
  "Security Automation": "amber",
  "Cloud-Native Architecture": "teal",
};

const ACCENT = {
  teal: {
    border: "border-teal-400/20",
    bg: "bg-teal-400/[0.08]",
    text: "text-teal-300",
    dot: "bg-teal-400",
    rule: "bg-teal-400",
    pill: "border-teal-400/20 bg-teal-400/[0.06] text-teal-200",
  },
  amber: {
    border: "border-amber-400/20",
    bg: "bg-amber-400/[0.08]",
    text: "text-amber-300",
    dot: "bg-amber-400",
    rule: "bg-amber-400",
    pill: "border-amber-400/20 bg-amber-400/[0.06] text-amber-200",
  },
};

// ─── Primitives ───────────────────────────────────────────────────────────────

const SectionNum = ({ num, label, accent = "teal" }) => {
  const a = ACCENT[accent] || ACCENT.teal;
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className={`font-mono text-xs font-bold ${a.text}`}>{num}</span>
      <div className={`h-px flex-1 ${a.rule} opacity-20`} />
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
        {label}
      </span>
    </div>
  );
};

const ContentBlock = ({ title, body, highlight = false, accent = "teal" }) => {
  if (!body) return null;
  return (
    <article
      className={`rounded-2xl border p-6 ${
        highlight
          ? "border-amber-400/20 bg-amber-400/[0.04]"
          : "border-white/[0.07] bg-white/[0.025]"
      }`}
    >
      {title && (
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
          {title}
        </h3>
      )}
      <p className="text-sm leading-relaxed text-slate-300">{body}</p>
    </article>
  );
};

const ContentList = ({ title, items, accent = "teal" }) => {
  const list = asArray(items);
  if (!list.length) return null;
  const a = ACCENT[accent] || ACCENT.teal;
  return (
    <article className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
      {title && (
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {list.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300">
            <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${a.dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

// ─── CaseStudyPage wrapper ────────────────────────────────────────────────────

const CaseStudyPage = ({ projectId }) => (
  <PortfolioContentProvider>
    <CaseStudyPageContent projectId={projectId} />
  </PortfolioContentProvider>
);

// ─── Main content ─────────────────────────────────────────────────────────────

const CaseStudyPageContent = ({ projectId }) => {
  const { projects = fallbackProjects } = usePortfolioContent();
  const allProjects = asArray(projects);
  const project =
    allProjects.find((item) => item.id === projectId) ||
    allProjects.find((item) => item.caseStudyPath === `/case/${projectId}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [projectId]);

  // ─── 404 ──────────────────────────────────────────────────────────────────

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0f14] text-slate-200 antialiased">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-32 lg:px-10">
          <SectionLabel index="404" title="Case study" />
          <h1 className="mt-8 text-4xl font-semibold text-slate-50">
            Case study not found.
          </h1>
          <p className="mt-4 text-slate-400">
            The requested project route does not match a published case study.
          </p>
          <a
            href="/#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-amber-300 hover:border-amber-300/30"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </a>
        </main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  // ─── Project data ──────────────────────────────────────────────────────────

  const caseStudy = project.caseStudy || {};
  const accentKey = CATEGORY_ACCENT[project.category] || "teal";
  const a = ACCENT[accentKey];

  const artifactLinks = [
    project.diagramSvg || project.diagramPng || project.caseStudyPath
      ? { label: "Explore interactive architecture", href: `/#architecture?project=${project.id}`, icon: Network, internal: true }
      : null,
    project.runbookUrl
      ? { label: "Open runbook sample", href: project.runbookUrl, icon: ShieldCheck }
      : null,
    project.repoUrl && project.visibility === "Public repo"
      ? { label: "Open public repository", href: project.repoUrl, icon: GitBranch }
      : null,
  ].filter(Boolean);

  const measurementEntries = Object.entries(caseStudy.measurementNotes || {});

  return (
    <div className="min-h-screen bg-[#0a0f14] text-slate-200 antialiased selection:bg-amber-300/20 selection:text-amber-100">
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/[0.05] pt-32 pb-20 lg:pt-36 lg:pb-24">
          {/* Accent rule */}
          <div className={`absolute top-0 left-0 h-px w-40 ${a.rule}`} />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
            {/* Back link */}
            <a
              href="/studies"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-amber-300"
            >
              <ArrowLeft className="h-4 w-4" /> All studies
            </a>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              {/* Title block */}
              <div>
                {/* Eyebrow */}
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] ${a.border} ${a.bg} ${a.text}`}
                >
                  {project.category}
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-50 lg:text-6xl lg:leading-[1.02]">
                  {caseStudy.title || project.name}
                </h1>

                {/* Context / subtitle */}
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                  {caseStudy.context || project.description}
                </p>

                {/* Pillars */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {asArray(project.pillars).map((item) => (
                    <span
                      key={item}
                      className={`rounded-full border px-3 py-1.5 font-mono text-xs ${a.pill}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Artifacts sidebar */}
              {artifactLinks.length > 0 && (
                <aside className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
                    Artifacts
                  </div>
                  <div className="mt-4 space-y-3">
                    {artifactLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-black/10 px-4 py-3 text-sm text-slate-300 transition hover:border-amber-300/30 hover:text-amber-200"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Icon className="h-4 w-4" /> {label}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* ── 01 Problem ────────────────────────────────────────────────────── */}
        {caseStudy.problem && (
          <section className="border-b border-white/[0.04] py-16">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionNum num="01" label="Problem" accent={accentKey} />
              <div className="grid gap-5 lg:grid-cols-2">
                <ContentBlock body={caseStudy.problem} />
                <ContentList
                  title="Constraints"
                  items={caseStudy.constraints}
                  accent={accentKey}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── 02 System ─────────────────────────────────────────────────────── */}
        {asArray(caseStudy.decisions).length > 0 && (
          <section className="border-b border-white/[0.04] py-16 bg-[#080c11]">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionNum num="02" label="System" accent={accentKey} />
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {asArray(caseStudy.decisions).map((decision, i) => (
                  <article
                    key={i}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                  >
                    <span className={`font-mono text-xs font-bold ${a.text}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{decision}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 03 Operating model ────────────────────────────────────────────── */}
        {asArray(caseStudy.operationalControls).length > 0 && (
          <section className="border-b border-white/[0.04] py-16">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionNum num="03" label="Operating model" accent={accentKey} />
              <div className="grid gap-4 md:grid-cols-2">
                {asArray(caseStudy.operationalControls).map((ctrl, i) => (
                  <div
                    key={i}
                    className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-5 py-4"
                  >
                    <span
                      className={`mt-1 h-2 w-2 flex-none rounded-full ${a.dot}`}
                    />
                    <p className="text-sm leading-relaxed text-slate-300">{ctrl}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 04 Proof ──────────────────────────────────────────────────────── */}
        {asArray(caseStudy.evidence).length > 0 && (
          <section className="border-b border-white/[0.04] py-16 bg-[#080c11]">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionNum num="04" label="Proof" accent={accentKey} />
              <div className="grid gap-4 md:grid-cols-2">
                {asArray(caseStudy.evidence).map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                  >
                    <p className="text-sm leading-relaxed text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 05 Measurement ────────────────────────────────────────────────── */}
        {measurementEntries.length > 0 && (
          <section className="border-b border-white/[0.04] py-16">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionNum num="05" label="Measurement" accent={accentKey} />
              <div className="grid gap-4 md:grid-cols-2">
                {measurementEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                  >
                    <div className={`mb-2 font-mono text-xs font-bold ${a.text}`}>
                      {key}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Result ────────────────────────────────────────────────────────── */}
        {caseStudy.result && (
          <section className="border-b border-white/[0.04] py-16 bg-[#080c11]">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                  Result
                </p>
                <p className="text-lg leading-relaxed text-slate-200">{caseStudy.result}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── 06 Next evolution ─────────────────────────────────────────────── */}
        {caseStudy.nextEvolution && (
          <section className="border-b border-white/[0.04] py-16">
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <SectionNum num="06" label="Next evolution" accent={accentKey} />
              <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
                <div
                  className={`rounded-2xl border p-6 ${a.border} ${a.bg.replace("[0.08]", "[0.04]")}`}
                >
                  <Lightbulb className={`h-5 w-5 mb-4 ${a.text}`} />
                  <p className="text-sm leading-relaxed text-slate-300">
                    {caseStudy.nextEvolution}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-5 py-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-slate-600 mb-1">
                      Stage
                    </p>
                    <p className="text-sm text-slate-300">Active roadmap</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-5 py-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-slate-600 mb-1">
                      Visibility
                    </p>
                    <p className="text-sm text-slate-300">
                      {project.visibility || "Private lab"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── More case studies ──────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
                  More case studies
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-50">
                  Operational proof across platform, AIOps, SaaS, and secrets.
                </h2>
              </div>
              <a
                href="/studies"
                className="hidden items-center gap-1.5 text-sm text-slate-500 hover:text-amber-300 md:flex"
              >
                All studies <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {allProjects
                .filter(
                  (item) =>
                    FEATURED_CASE_STUDIES.includes(item.id) && item.id !== project.id
                )
                .slice(0, 4)
                .map((item) => (
                  <a
                    key={item.id}
                    href={`/case/${item.id}`}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-amber-300/25 hover:bg-white/[0.04]"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      {item.category}
                    </div>
                    <div className="mt-2 font-semibold text-slate-100 group-hover:text-amber-200">
                      {item.name}
                    </div>
                    <ChevronRight className="mt-3 h-3.5 w-3.5 text-slate-700 group-hover:text-amber-400" />
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default CaseStudyPage;
