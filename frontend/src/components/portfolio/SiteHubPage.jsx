import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  FlaskConical,
  Newspaper,
  PanelsTopLeft,
  PenLine,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Layers,
  GitBranch,
  Lock,
  CheckCircle2,
  Activity,
  Server,
  Brain,
  ChevronRight,
  Zap,
} from "lucide-react";
import Footer from "@/components/portfolio/Footer";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import siteUpdates from "@/content/site-updates.json";
import githubDigest from "@/content/github-digest.json";
import siteSections from "@/content/site-sections.json";

// ─── Route configuration ──────────────────────────────────────────────────────

const routeConfig = {
  "/projects": {
    label: "Projects",
    eyebrow: "Product directory",
    title: "Products, platforms, and operating systems",
    description:
      "A structured view of the InfraForge platform estate, AI infrastructure work, education products, and public case-study surfaces.",
    icon: PanelsTopLeft,
    type: "projects",
    accent: "teal",
  },
  "/news": {
    label: "News",
    eyebrow: "Build notes",
    title: "Updates and build notes",
    description:
      "A curated update stream for launches, infrastructure improvements, platform milestones, and public-facing product movement.",
    icon: Newspaper,
    type: "updates",
    accent: "teal",
  },
  "/writing": {
    label: "Writing",
    eyebrow: "Technical writing",
    title: "Technical writing and platform thinking",
    description:
      "Engineering notes, implementation narratives, operating-model essays, and public technical communication.",
    icon: PenLine,
    type: "writing",
    accent: "amber",
  },
  "/studies": {
    label: "Studies",
    eyebrow: "Case study library",
    title: "Case studies and architecture studies",
    description:
      "Deeper problem-solution breakdowns for flagship systems, including AI operations, GitOps, observability, secrets, education, and platform reliability.",
    icon: BookOpen,
    type: "studies",
    accent: "amber",
  },
  "/lab": {
    label: "Lab",
    eyebrow: "AI infrastructure lab",
    title: "AI infrastructure lab and experiments",
    description:
      "A focused surface for AI Inference Lab, GPU/model operations, agent systems, mobile AI interfaces, and platform experiments.",
    icon: FlaskConical,
    type: "lab",
    accent: "amber",
  },
  "/github": {
    label: "GitHub",
    eyebrow: "Engineering digest",
    title: "GitHub and engineering activity digest",
    description:
      "A curated digest for public and private-source development signals, designed to publish reviewed updates without leaking sensitive implementation detail.",
    icon: Code2,
    type: "github",
    accent: "teal",
  },
};

export const isSiteHubPath = (pathname) =>
  Object.prototype.hasOwnProperty.call(routeConfig, pathname);

const asArray = (v) => (Array.isArray(v) ? v : []);

// ─── Design tokens ────────────────────────────────────────────────────────────

const ACCENT = {
  teal: {
    border: "border-teal-400/20",
    bg: "bg-teal-400/[0.08]",
    text: "text-teal-300",
    dot: "bg-teal-400",
    rule: "bg-teal-400",
  },
  amber: {
    border: "border-amber-400/20",
    bg: "bg-amber-400/[0.08]",
    text: "text-amber-300",
    dot: "bg-amber-400",
    rule: "bg-amber-400",
  },
  neutral: {
    border: "border-slate-400/15",
    bg: "bg-slate-400/[0.07]",
    text: "text-slate-300",
    dot: "bg-slate-400",
    rule: "bg-slate-400",
  },
};

const Tag = ({ children, accent = "teal" }) => {
  const a = ACCENT[accent] || ACCENT.teal;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${a.border} ${a.bg} ${a.text}`}
    >
      {children}
    </span>
  );
};

const SignalPill = ({ children }) => (
  <span className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-xs text-slate-400">
    {children}
  </span>
);

const MaturityBadge = ({ status, accent }) => {
  const a = ACCENT[accent] || ACCENT.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${a.border} ${a.bg} ${a.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
      {status}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, label, description, accent = "teal" }) => {
  const a = ACCENT[accent] || ACCENT.teal;
  return (
    <div className="flex items-start gap-4 border-b border-white/[0.06] pb-6">
      {Icon && (
        <span
          className={`mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl border ${a.border} ${a.bg} ${a.text}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      )}
      <div>
        <h2 className="text-lg font-semibold text-white">{label}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
};

// ─── Project metadata ─────────────────────────────────────────────────────────

const PROJECT_META = {
  "ai-inference-lab": {
    status: "Active Lab",
    statusAccent: "amber",
    ecosystemRole: "Model operations and AI serving foundation",
    problemShort: "AI models are easy to demo but hard to operate, measure, and scale reliably.",
  },
  infraforge: {
    status: "Operating",
    statusAccent: "teal",
    ecosystemRole: "Core platform operating model and GitOps foundation",
    problemShort: "Small teams need production discipline across K8s delivery, secrets, and recovery.",
  },
  "sentinel-copilot": {
    status: "Active Development",
    statusAccent: "amber",
    ecosystemRole: "Operational intelligence and cluster guardian layer",
    problemShort: "Infrastructure teams are overwhelmed by scattered alerts, metrics, and incidents.",
  },
  "project-iris": {
    status: "Active Development",
    statusAccent: "amber",
    ecosystemRole: "Governed personal AI assistant for everyday work",
    problemShort: "People lose time context-switching between email, calendar, research, and decisions.",
  },
  jerry: {
    status: "Active Development",
    statusAccent: "amber",
    ecosystemRole: "Mobile operator interface for the InfraForge ecosystem",
    problemShort: "Useful AI assistance stays locked in desktop workflows when mobile access is needed.",
  },
  "ai-builders-academy": {
    status: "In Development",
    statusAccent: "neutral",
    ecosystemRole: "AI education platform for builders aged 6-16",
    problemShort: "Young learners lack structured, project-based AI and coding education.",
  },
  "young-coders": {
    status: "In Development",
    statusAccent: "neutral",
    ecosystemRole: "Practical coding education platform",
    problemShort: "Coding education lacks a practical, product-building curriculum for learners.",
  },
  "vault-ops": {
    status: "Operating",
    statusAccent: "teal",
    ecosystemRole: "Secrets operations toolkit for Kubernetes platform teams",
    problemShort: "Platform teams need repeatable, safe secret operations without fragile manual steps.",
  },
  openleaf: {
    status: "Published Study",
    statusAccent: "teal",
    ecosystemRole: "Reference SaaS architecture and cloud-native case study",
    problemShort: "Digital product teams need a reference architecture showing the full SaaS operating model.",
  },
};

// ─── Hub navigation sidebar ───────────────────────────────────────────────────

const HubNavigation = () => {
  const currentPath = typeof window === "undefined" ? "/" : window.location.pathname;
  return (
    <aside className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Hub sections</p>
      <nav className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(routeConfig).map(([path, item]) => {
          const Icon = item.icon;
          const active = path === currentPath;
          return (
            <a
              key={path}
              href={path}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition ${
                active
                  ? "border-teal-400/30 bg-teal-400/[0.08] text-teal-100"
                  : "border-white/[0.06] bg-black/10 text-slate-400 hover:border-teal-400/20 hover:text-teal-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5 flex-none" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

// ─── Page shell ───────────────────────────────────────────────────────────────

const SectionShell = ({ page, children }) => {
  const Icon = page.icon;
  const a = ACCENT[page.accent] || ACCENT.teal;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${page.label} | Temitayo Charles Akinniranye`;
  }, [page.label]);

  return (
    <main className="min-h-screen bg-[#0a0f14] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/[0.05] px-6 py-12 lg:px-10 lg:py-20">
        <div className={`absolute top-0 left-0 h-px w-32 ${a.rule}`} />
        <div className="relative mx-auto max-w-7xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400 transition hover:border-teal-400/30 hover:text-teal-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] ${a.border} ${a.bg} ${a.text}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {page.eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
                {page.description}
              </p>
            </div>
            <HubNavigation />
          </div>
        </div>
      </section>
      <section className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
      <Footer />
    </main>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// /projects
// ═══════════════════════════════════════════════════════════════════════════════

const FLAGSHIP_IDS = ["ai-inference-lab", "infraforge", "sentinel-copilot"];

const groupIcons = {
  "flagship-ai-platform": Cpu,
  "personal-ai": Brain,
  education: GraduationCap,
  "infrastructure-devsecops": ShieldCheck,
};

const groupAccent = {
  "flagship-ai-platform": "teal",
  "personal-ai": "amber",
  education: "teal",
  "infrastructure-devsecops": "amber",
};

const FlagshipCard = ({ project }) => {
  const meta = PROJECT_META[project.id] || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  const cs = project.caseStudy || {};
  return (
    <article className="relative flex flex-col rounded-2xl border border-white/[0.10] bg-white/[0.04] p-7 transition hover:border-teal-400/25 hover:bg-white/[0.055]">
      <div className="absolute top-0 left-7 h-px w-16 bg-teal-400/60" />
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent="teal">{project.category}</Tag>
        {meta.status && (
          <MaturityBadge status={meta.status} accent={meta.statusAccent} />
        )}
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{cs.title || project.name}</h3>
      {meta.problemShort && (
        <p className="mt-2 text-sm text-slate-500">
          <span className="text-slate-600">Problem — </span>
          {meta.problemShort}
        </p>
      )}
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
        {cs.context || project.description}
      </p>
      {meta.ecosystemRole && (
        <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">
            Role in ecosystem
          </p>
          <p className="text-sm text-slate-300">{meta.ecosystemRole}</p>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {asArray(project.pillars).slice(0, 5).map((t) => (
          <SignalPill key={t}>{t}</SignalPill>
        ))}
      </div>
      {project.visibility && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
          <Lock className="h-3 w-3" />
          {project.visibility}
        </p>
      )}
      <a
        href={slug}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
      >
        View case study <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
};

const ProjectCard = ({ project }) => {
  const meta = PROJECT_META[project.id] || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  const hasCaseStudy = !!project.caseStudyPath;
  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/20 hover:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent={meta.statusAccent === "teal" ? "teal" : "amber"}>
          {project.category}
        </Tag>
        {meta.status && (
          <MaturityBadge status={meta.status} accent={meta.statusAccent || "neutral"} />
        )}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{project.name}</h3>
      {meta.problemShort && (
        <p className="mt-2 text-xs text-slate-600">Problem — {meta.problemShort}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {asArray(project.pillars).slice(0, 4).map((t) => (
          <SignalPill key={t}>{t}</SignalPill>
        ))}
      </div>
      {project.visibility && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
          <Lock className="h-3 w-3" />
          {project.visibility}
        </p>
      )}
      {hasCaseStudy && (
        <a
          href={slug}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          Case study <ArrowRight className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
};

const ProjectDirectory = ({ projects }) => {
  const sectionDef = siteSections.sections.find((s) => s.id === "projects");
  const groups = sectionDef?.groups || [];
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));
  const flagshipProjects = FLAGSHIP_IDS.map((id) => projectMap[id]).filter(Boolean);

  return (
    <div className="space-y-16">
      {flagshipProjects.length > 0 && (
        <section>
          <SectionHeader
            icon={Cpu}
            label="Flagship systems"
            description="The strongest AI, platform, and operations work in the InfraForge estate."
            accent="teal"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {flagshipProjects.map((p) => (
              <FlagshipCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
      {groups.map((group) => {
        const GroupIcon = groupIcons[group.id] || Layers;
        const accent = groupAccent[group.id] || "teal";
        const groupProjects = group.projectIds
          .map((id) => projectMap[id])
          .filter(Boolean)
          .filter((p) => !FLAGSHIP_IDS.includes(p.id));
        if (!groupProjects.length) return null;
        return (
          <section key={group.id}>
            <SectionHeader
              icon={GroupIcon}
              label={group.label}
              description={group.description}
              accent={accent}
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {groupProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// /news
// ═══════════════════════════════════════════════════════════════════════════════

const UpdateCard = ({ update }) => (
  <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/15 hover:bg-white/[0.04]">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Tag accent="teal">{update.category}</Tag>
      <time className="font-mono text-xs text-slate-600">{update.date}</time>
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{update.title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-300">{update.summary}</p>
    {update.impact && (
      <p className="mt-4 rounded-xl border border-teal-400/10 bg-teal-400/[0.04] px-4 py-3 text-sm text-teal-200">
        {update.impact}
      </p>
    )}
    {asArray(update.relatedRoutes).length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {update.relatedRoutes.map((r) => (
          <a
            key={r}
            href={r}
            className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-500 transition hover:text-teal-300"
          >
            {r}
          </a>
        ))}
      </div>
    )}
  </article>
);

const NewsSection = () => (
  <div className="space-y-5">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      {siteUpdates.length} update{siteUpdates.length !== 1 ? "s" : ""} · editorially reviewed
    </p>
    <div className="space-y-4">
      {siteUpdates.map((u) => (
        <UpdateCard key={u.id} update={u} />
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// /writing
// ═══════════════════════════════════════════════════════════════════════════════

const WritingCard = ({ item }) => (
  <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/15 hover:bg-white/[0.04]">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Tag accent={item.accent || "teal"}>{item.tag || item.type || "Writing"}</Tag>
      {item.readTime && (
        <span className="font-mono text-xs text-slate-600">{item.readTime}</span>
      )}
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
    <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">
      {item.excerpt || item.summary || item.description}
    </p>
    {item.date && (
      <p className="mt-4 font-mono text-xs text-slate-600">{item.date}</p>
    )}
    {item.noteTitle && (
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <p className="text-xs font-semibold text-slate-300">{item.noteTitle}</p>
        <p className="mt-1 text-xs leading-6 text-slate-500">{item.noteBody}</p>
      </div>
    )}
  </article>
);

const WritingSection = ({ writings }) => (
  <div className="space-y-6">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      {writings.length} piece{writings.length !== 1 ? "s" : ""} · platform thinking and engineering narratives
    </p>
    <div className="grid gap-5 md:grid-cols-2">
      {writings.map((item, i) => (
        <WritingCard key={item.id || i} item={item} />
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// /studies
// ═══════════════════════════════════════════════════════════════════════════════

const STUDY_TYPES = {
  "ai-inference-lab": { type: "case-study", label: "Case Study", accent: "amber" },
  infraforge: { type: "case-study", label: "Case Study", accent: "teal" },
  "sentinel-copilot": { type: "case-study", label: "Case Study", accent: "teal" },
  "project-iris": { type: "case-study", label: "Case Study", accent: "amber" },
  jerry: { type: "case-study", label: "Case Study", accent: "amber" },
  openleaf: { type: "architecture-study", label: "Architecture Study", accent: "teal" },
  "vault-ops": { type: "operational-study", label: "Operational Study", accent: "amber" },
};

const studyTypeOrder = ["case-study", "architecture-study", "operational-study"];

const studyTypeConfig = {
  "case-study": {
    icon: BookOpen,
    label: "Case studies",
    description: "Full problem-solution breakdowns with operating model, proof, and evidence.",
    accent: "teal",
  },
  "architecture-study": {
    icon: Layers,
    label: "Architecture studies",
    description: "Reference system designs showing service boundaries, API governance, and platform controls.",
    accent: "teal",
  },
  "operational-study": {
    icon: ShieldCheck,
    label: "Operational studies",
    description: "Runbook-grade operational tooling and secrets management patterns for platform teams.",
    accent: "amber",
  },
};

const StudyCard = ({ project }) => {
  const typeMeta = STUDY_TYPES[project.id] || { label: "Study", accent: "teal" };
  const projMeta = PROJECT_META[project.id] || {};
  const cs = project.caseStudy || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  const evidenceSnippet = asArray(cs.evidence)[0] || null;

  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/20 hover:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent={typeMeta.accent}>{typeMeta.label}</Tag>
        <Tag accent={projMeta.statusAccent || "neutral"}>{project.category}</Tag>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{cs.title || project.name}</h2>
      {projMeta.problemShort && (
        <div className="mt-4 border-l-2 border-amber-400/40 pl-4">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">Problem</p>
          <p className="text-sm text-slate-300">{projMeta.problemShort}</p>
        </div>
      )}
      {cs.result && (
        <div className="mt-4">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">System response</p>
          <p className="text-sm leading-7 text-slate-400">{cs.result}</p>
        </div>
      )}
      {evidenceSnippet && (
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/15 px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-slate-600">Proof</p>
          <p className="text-xs leading-6 text-slate-400">{evidenceSnippet}</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {asArray(project.pillars).slice(0, 4).map((t) => (
          <SignalPill key={t}>{t}</SignalPill>
        ))}
      </div>
      <a
        href={slug}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
      >
        Read study <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
};

const StudiesSection = ({ projects }) => {
  const sectionDef = siteSections.sections.find((s) => s.id === "studies");
  const studyIds = sectionDef?.studyIds || [];
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));
  const grouped = {};
  for (const id of studyIds) {
    const project = projectMap[id];
    if (!project) continue;
    const typeMeta = STUDY_TYPES[id] || { type: "case-study" };
    if (!grouped[typeMeta.type]) grouped[typeMeta.type] = [];
    grouped[typeMeta.type].push(project);
  }
  const totalCount = studyIds.filter((id) => projectMap[id]).length;

  return (
    <div className="space-y-16">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
        {totalCount} stud{totalCount !== 1 ? "ies" : "y"} · problem-solution architecture breakdowns
      </p>
      {studyTypeOrder.map((typeKey) => {
        const group = grouped[typeKey];
        if (!group || !group.length) return null;
        const config = studyTypeConfig[typeKey];
        return (
          <section key={typeKey}>
            <SectionHeader
              icon={config.icon}
              label={config.label}
              description={config.description}
              accent={config.accent}
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {group.map((p) => (
                <StudyCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// /lab
// ═══════════════════════════════════════════════════════════════════════════════

const LAB_LANES = [
  {
    id: "model-ops",
    icon: Cpu,
    label: "Model operations",
    accent: "amber",
    description:
      "GPU, inference, model-serving, and evaluation work for AI Inference Lab. Covers FastAPI serving, Prometheus metrics, benchmark harness, Docker runtime, and Kubernetes-native LLM workloads.",
    positioning:
      "The AI Inference Lab is the model operations and LLM-serving foundation of InfraForge. It gives AI workloads the same platform discipline as cloud infrastructure: service boundaries, health checks, metrics, benchmark evidence, and a controlled graduation path into Kubernetes.",
    projectIds: ["ai-inference-lab"],
  },
  {
    id: "agent-surfaces",
    icon: Brain,
    label: "Agent surfaces",
    accent: "teal",
    description:
      "Governed personal AI assistant, mobile AI companion, and evidence-first AIOps copilot — each with explicit approval gates, memory boundaries, and operator controls.",
    positioning:
      "Project Iris is a governed personal AI assistant for everyday work: email, calendar, browser tasks, research, and decisions — with full audit trails and user-controlled approval queues. Jerry is the mobile operator interface for fast commands and status checks. ForgeWatch is the operational guardian layer: evidence-first AIOps that reads cluster state before it proposes any action.",
    projectIds: ["project-iris", "jerry", "sentinel-copilot"],
  },
  {
    id: "infra-experiments",
    icon: Server,
    label: "Infrastructure experiments",
    accent: "amber",
    description:
      "Homelab, Kubernetes, cloud, and self-hosted platform trials. Covers K3s, ArgoCD, Envoy Gateway, MetalLB, Vault, External Secrets, and the InfraForge operating model.",
    positioning:
      "InfraForge is a production-discipline homelab operated as a real platform company. VaultOps is the secrets operations layer — automating bootstrap, rotation, sync validation, and recovery so platform teams can operate secrets safely across environments.",
    projectIds: ["infraforge", "vault-ops"],
  },
  {
    id: "eval-observability",
    icon: Activity,
    label: "Evaluation and observability",
    accent: "teal",
    description:
      "Benchmark harnesses, Prometheus metrics, Loki log aggregation, Grafana dashboards, Alertmanager routing, and operational evidence practices across all lab systems.",
    positioning:
      "Observability is a first-class requirement across all lab systems. AI Inference Lab has a benchmark harness and Prometheus metrics. InfraForge runs Grafana, Loki, and Alertmanager. ForgeWatch reads Prometheus, Loki, and ArgoCD before proposing any remediation — evidence before action, always.",
    projectIds: [],
    standalone: true,
  },
];

const LabSystemLink = ({ project }) => {
  const meta = PROJECT_META[project.id] || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  return (
    <a
      href={slug}
      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3.5 transition hover:border-teal-400/25 hover:bg-white/[0.03]"
    >
      <div>
        <p className="text-sm font-medium text-slate-200">{project.name}</p>
        {meta.ecosystemRole && (
          <p className="mt-0.5 text-xs text-slate-600">{meta.ecosystemRole}</p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 flex-none text-slate-600" />
    </a>
  );
};

const LabLaneCard = ({ lane, projects }) => {
  const LaneIcon = lane.icon;
  const a = ACCENT[lane.accent] || ACCENT.teal;
  const relatedProjects = lane.projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);
  return (
    <article className={`flex flex-col rounded-2xl border bg-white/[0.03] p-6 ${a.border}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl border ${a.border} ${a.bg} ${a.text}`}>
          <LaneIcon className="h-4 w-4" />
        </span>
        <h2 className="text-base font-semibold text-white">{lane.label}</h2>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-400">{lane.description}</p>
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-4">
        <p className="text-xs leading-6 text-slate-400">{lane.positioning}</p>
      </div>
      {relatedProjects.length > 0 && (
        <div className="mt-5 space-y-2.5">
          {relatedProjects.map((p) => (
            <LabSystemLink key={p.id} project={p} />
          ))}
        </div>
      )}
      {lane.standalone && (
        <div className="mt-5 rounded-xl border border-teal-400/10 bg-teal-400/[0.03] px-4 py-3">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-teal-300">
            Cross-cutting concern
          </p>
          <p className="text-xs leading-6 text-slate-500">
            Observability practices span all lab systems and are not isolated to a single project.
          </p>
        </div>
      )}
    </article>
  );
};

const LabSection = ({ projects }) => (
  <div className="space-y-10">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      AI infrastructure · model operations · agent systems · platform experiments
    </p>
    <div className="grid gap-5 md:grid-cols-2">
      {LAB_LANES.map((lane) => (
        <LabLaneCard key={lane.id} lane={lane} projects={projects} />
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// /github
// ═══════════════════════════════════════════════════════════════════════════════

const WORKFLOW_STEPS = [
  { icon: GitBranch, label: "Repository signals", detail: "Public and private repos" },
  { icon: CheckCircle2, label: "Curation pass", detail: "Editorial selection" },
  { icon: Zap, label: "PR review gate", detail: "Approval required" },
  { icon: Activity, label: "Public update", detail: "No secrets, no private URLs" },
];

const DigestWorkflowStrip = () => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
    <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      Digest publication model
    </p>
    <div className="flex flex-col gap-4 md:flex-row md:gap-0">
      {WORKFLOW_STEPS.map((step, i) => {
        const StepIcon = step.icon;
        const isLast = i === WORKFLOW_STEPS.length - 1;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/[0.07] text-teal-300">
                <StepIcon className="h-4 w-4" />
              </span>
              <p className="text-sm font-medium text-slate-200">{step.label}</p>
              <p className="text-xs text-slate-600">{step.detail}</p>
            </div>
            {!isLast && (
              <div className="flex items-center justify-center md:mx-3">
                <ArrowRight className="h-4 w-4 rotate-90 text-slate-700 md:rotate-0" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

const visibilityConfig = {
  public: { label: "Public", accent: "teal" },
  private: { label: "Private source", accent: "amber" },
  mixed: { label: "Mixed", accent: "neutral" },
};

const DigestCard = ({ item }) => {
  const vis = visibilityConfig[item.repoVisibility] || visibilityConfig.mixed;
  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/15 hover:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent="teal">{item.category}</Tag>
        <Tag accent={vis.accent}>
          <Lock className="h-3 w-3" />
          {vis.label}
        </Tag>
        <span className="ml-auto font-mono text-xs text-slate-600">{item.sourceType}</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{item.summary}</p>
      {asArray(item.signals).length > 0 && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-slate-600">Signals</p>
          <div className="flex flex-wrap gap-1.5">
            {item.signals.map((s) => (
              <SignalPill key={s}>{s}</SignalPill>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

const digestStats = [
  { label: "Curated signals", value: String(githubDigest.length) },
  {
    label: "Private-source",
    value: String(githubDigest.filter((d) => d.repoVisibility === "private").length),
  },
  { label: "Publication gate", value: "PR review" },
  { label: "Raw commits exposed", value: "None" },
];

const GitHubSection = () => (
  <div className="space-y-8">
    <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-6">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-amber-400">
        Digest model — curated, private-repo-aware
      </p>
      <p className="text-sm leading-7 text-slate-300">
        This is a curated engineering digest, not a raw commit feed. Most important repositories
        are private. Updates are reviewed before publication to avoid leaking implementation
        details, private repository names, or sensitive operational context. No GitHub API is
        called from the browser.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6 md:grid-cols-4">
        {digestStats.map(({ label, value }) => (
          <div key={label}>
            <p className="font-mono text-xl font-bold text-white">{value}</p>
            <p className="mt-1 text-xs text-slate-600">{label}</p>
          </div>
        ))}
      </div>
    </div>
    <DigestWorkflowStrip />
    <div>
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
        {githubDigest.length} curated signal{githubDigest.length !== 1 ? "s" : ""} · editorially reviewed
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {githubDigest.map((item) => (
          <DigestCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Root
// ═══════════════════════════════════════════════════════════════════════════════

const SiteHubPage = ({ path }) => {
  const content = usePortfolioContent();
  const page = routeConfig[path] || routeConfig["/projects"];
  const projects = asArray(content.projects);
  const writings = asArray(content.writings);

  let body;
  switch (page.type) {
    case "projects":
      body = <ProjectDirectory projects={projects} />;
      break;
    case "updates":
      body = <NewsSection />;
      break;
    case "writing":
      body = writings.length > 0 ? <WritingSection writings={writings} /> : null;
      break;
    case "studies":
      body = <StudiesSection projects={projects} />;
      break;
    case "lab":
      body = <LabSection projects={projects} />;
      break;
    case "github":
      body = <GitHubSection />;
      break;
    default:
      body = null;
  }

  return <SectionShell page={page}>{body}</SectionShell>;
};

export default SiteHubPage;
