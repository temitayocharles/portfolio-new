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
} from "lucide-react";
import Footer from "@/components/portfolio/Footer";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import siteUpdates from "@/content/site-updates.json";
import githubDigest from "@/content/github-digest.json";
import siteSections from "@/content/site-sections.json";

const routeConfig = {
  "/projects": {
    label: "Projects",
    title: "Products, platforms, and operating systems",
    description:
      "A structured view of the InfraForge platform estate, AI infrastructure work, education products, and public case-study surfaces.",
    icon: PanelsTopLeft,
    type: "projects",
  },
  "/news": {
    label: "News",
    title: "Updates and build notes",
    description:
      "A curated update stream for launches, infrastructure improvements, platform milestones, and public-facing product movement.",
    icon: Newspaper,
    type: "updates",
  },
  "/writing": {
    label: "Writing",
    title: "Technical writing and platform thinking",
    description:
      "Engineering notes, implementation narratives, operating-model essays, and public technical communication.",
    icon: PenLine,
    type: "writing",
  },
  "/studies": {
    label: "Studies",
    title: "Case studies and architecture studies",
    description:
      "Deeper problem-solution breakdowns for flagship systems, including AI operations, GitOps, observability, secrets, education, and platform reliability.",
    icon: BookOpen,
    type: "studies",
  },
  "/lab": {
    label: "Lab",
    title: "AI infrastructure lab and experiments",
    description:
      "A focused surface for AI Inference Lab, GPU/model operations, agent systems, mobile AI interfaces, and platform experiments.",
    icon: FlaskConical,
    type: "lab",
  },
  "/github": {
    label: "GitHub",
    title: "GitHub and engineering activity digest",
    description:
      "A curated digest for public and private-source development signals, designed to publish reviewed updates without leaking sensitive implementation detail.",
    icon: Code2,
    type: "github",
  },
};

const asArray = (v) => (Array.isArray(v) ? v : []);

export const isSiteHubPath = (pathname) =>
  Object.prototype.hasOwnProperty.call(routeConfig, pathname);

// ─── Hub navigation sidebar ──────────────────────────────────────────────────

const HubNavigation = () => {
  const currentPath = typeof window === "undefined" ? "/" : window.location.pathname;
  return (
    <aside className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
      <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">Hub routing</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {Object.entries(routeConfig).map(([path, item]) => (
          <a
            key={path}
            href={path}
            className={`rounded-2xl border px-3 py-2 transition ${
              path === currentPath
                ? "border-teal-300/40 bg-teal-300/[0.08] text-teal-100"
                : "border-white/[0.07] bg-black/10 text-slate-400 hover:border-teal-300/30 hover:text-teal-200"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

// ─── Page shell ───────────────────────────────────────────────────────────────

const SectionShell = ({ page, children }) => {
  const Icon = page.icon;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${page.label} | Temitayo Charles Akinniranye`;
  }, [page.label]);

  return (
    <main className="min-h-screen bg-[#0a0f14] text-slate-100">
      <section className="relative overflow-hidden px-6 py-10 lg:px-10 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,212,191,0.10),transparent_30rem),radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.08),transparent_28rem)]" />
        <div className="relative mx-auto max-w-7xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-teal-300/40 hover:text-teal-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/[0.08] px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-teal-200">
                <Icon className="h-3.5 w-3.5" />
                {page.label}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {page.description}
              </p>
            </div>
            <HubNavigation />
          </div>

          <div className="mt-12">{children}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

// ─── Shared card primitives ───────────────────────────────────────────────────

const Tag = ({ children, accent = "teal" }) => (
  <span
    className={`rounded-full border px-3 py-1 text-xs ${
      accent === "amber"
        ? "border-amber-300/20 bg-amber-300/[0.07] text-amber-200"
        : "border-teal-300/20 bg-teal-300/[0.07] text-teal-200"
    }`}
  >
    {children}
  </span>
);

const Pill = ({ children }) => (
  <span className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-400">
    {children}
  </span>
);

// ─── /projects ────────────────────────────────────────────────────────────────

const groupIcons = {
  "flagship-ai-platform": Cpu,
  "personal-ai": FlaskConical,
  education: GraduationCap,
  "infrastructure-devsecops": ShieldCheck,
};

const projectGroupAccent = {
  "flagship-ai-platform": "teal",
  "personal-ai": "amber",
  education: "teal",
  "infrastructure-devsecops": "amber",
};

const ProjectCard = ({ project }) => {
  const slug = project.caseStudyPath || (project.id ? `/case/${project.id}` : null);
  return (
    <article className="flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition hover:border-teal-300/25 hover:bg-white/[0.05]">
      <Tag accent={project.accent || "teal"}>{project.category || "Platform work"}</Tag>
      <h3 className="mt-4 text-xl font-semibold text-white">{project.name || project.title}</h3>
      {project.subtitle && (
        <p className="mt-1 text-sm text-slate-500">{project.subtitle}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">
        {project.description || project.summary || "Project summary pending editorial review."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {asArray(project.pillars || project.stack)
          .slice(0, 4)
          .map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
      </div>
      {project.visibility && (
        <p className="mt-4 text-xs text-slate-600">{project.visibility}</p>
      )}
      {slug && (
        <a
          href={slug}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-200 hover:text-amber-100"
        >
          View case study <ArrowRight className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
};

const ProjectDirectory = ({ projects }) => {
  const sectionDef = siteSections.sections.find((s) => s.id === "projects");
  const groups = sectionDef?.groups || [];
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));

  return (
    <div className="space-y-14">
      {groups.map((group) => {
        const GroupIcon = groupIcons[group.id] || Layers;
        const accent = projectGroupAccent[group.id] || "teal";
        const groupProjects = group.projectIds
          .map((id) => projectMap[id])
          .filter(Boolean);
        if (!groupProjects.length) return null;
        return (
          <section key={group.id}>
            <div className="mb-6 flex items-center gap-3">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${
                  accent === "amber"
                    ? "border-amber-300/20 bg-amber-300/[0.08] text-amber-300"
                    : "border-teal-300/20 bg-teal-300/[0.08] text-teal-300"
                }`}
              >
                <GroupIcon className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">{group.label}</h2>
                <p className="text-sm text-slate-500">{group.description}</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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

// ─── /news ────────────────────────────────────────────────────────────────────

const UpdateCard = ({ update }) => (
  <article className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition hover:border-teal-300/20 hover:bg-white/[0.05]">
    <div className="flex items-center justify-between gap-4">
      <Tag accent="teal">{update.category}</Tag>
      <time className="font-mono text-xs text-slate-600">{update.date}</time>
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{update.title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-300">{update.summary}</p>
    {update.impact && (
      <p className="mt-3 rounded-2xl border border-teal-300/10 bg-teal-300/[0.04] px-4 py-3 text-sm text-teal-200">
        {update.impact}
      </p>
    )}
    {asArray(update.relatedRoutes).length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {update.relatedRoutes.map((r) => (
          <a
            key={r}
            href={r}
            className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-400 hover:text-teal-300"
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
    <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
      {siteUpdates.length} curated update{siteUpdates.length !== 1 ? "s" : ""} · editorially reviewed
    </p>
    {siteUpdates.map((u) => (
      <UpdateCard key={u.id} update={u} />
    ))}
  </div>
);

// ─── /writing ─────────────────────────────────────────────────────────────────

const WritingCard = ({ item }) => (
  <article className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition hover:border-teal-300/20 hover:bg-white/[0.05]">
    <div className="flex items-center justify-between gap-4">
      <Tag accent={item.accent || "teal"}>{item.tag || item.type || item.category || "Writing"}</Tag>
      {item.readTime && (
        <span className="font-mono text-xs text-slate-600">{item.readTime}</span>
      )}
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-300">
      {item.excerpt || item.summary || item.description || "Editorial summary pending."}
    </p>
    {item.date && (
      <p className="mt-3 font-mono text-xs text-slate-600">{item.date}</p>
    )}
    {item.noteTitle && (
      <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
        <p className="text-xs font-semibold text-slate-300">{item.noteTitle}</p>
        <p className="mt-1 text-xs leading-6 text-slate-500">{item.noteBody}</p>
      </div>
    )}
  </article>
);

const WritingSection = ({ writings }) => (
  <div className="space-y-5">
    <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
      {writings.length} piece{writings.length !== 1 ? "s" : ""} · platform thinking and engineering narratives
    </p>
    <div className="grid gap-5 md:grid-cols-2">
      {writings.map((item, i) => (
        <WritingCard key={item.id || i} item={item} />
      ))}
    </div>
  </div>
);

// ─── /studies ─────────────────────────────────────────────────────────────────

const studyMeta = {
  "ai-inference-lab": {
    label: "AI Infrastructure",
    accent: "amber",
    problem: "AI models are easy to demo but hard to operate, measure, package, and scale reliably.",
  },
  infraforge: {
    label: "Platform Engineering",
    accent: "teal",
    problem: "Small teams need production discipline across Kubernetes delivery, routing, secrets, observability, and recovery.",
  },
  "sentinel-copilot": {
    label: "AIOps",
    accent: "teal",
    problem: "Infrastructure teams are overwhelmed by scattered alerts, metrics, incidents, Kubernetes state, logs, and service-health signals.",
  },
  "project-iris": {
    label: "Personal AI",
    accent: "amber",
    problem: "People lose time switching between email, calendar, browser tasks, research, memory, documents, follow-ups, and decisions.",
  },
  jerry: {
    label: "Mobile AI",
    accent: "amber",
    problem: "Useful AI assistance often stays locked in desktop workflows when people need fast mobile access.",
  },
  openleaf: {
    label: "Cloud-Native Architecture",
    accent: "teal",
    problem: "Digital product teams need a reference SaaS architecture that shows service boundaries, API governance, delivery, observability, and reliability controls together.",
  },
  "vault-ops": {
    label: "DevSecOps",
    accent: "amber",
    problem: "Platform teams need safe, repeatable secret operations across Vault and Kubernetes without relying on fragile manual steps.",
  },
};

const StudyCard = ({ project }) => {
  const meta = studyMeta[project.id] || {};
  const caseStudy = project.caseStudy || {};
  const slug = project.caseStudyPath || `/case/${project.id}`;
  return (
    <article className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition hover:border-teal-300/25 hover:bg-white/[0.05]">
      <Tag accent={meta.accent || "teal"}>{meta.label || project.category}</Tag>
      <h2 className="mt-4 text-xl font-semibold text-white">
        {caseStudy.title || project.name}
      </h2>
      {meta.problem && (
        <p className="mt-3 text-sm leading-7 text-slate-400 italic">
          Problem: {meta.problem}
        </p>
      )}
      <p className="mt-3 text-sm leading-7 text-slate-300">
        {caseStudy.result || project.description || "Case study summary pending."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {asArray(project.pillars || project.stack)
          .slice(0, 4)
          .map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
      </div>
      <a
        href={slug}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-200 hover:text-amber-100"
      >
        Read case study <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </article>
  );
};

const StudiesSection = ({ projects }) => {
  const sectionDef = siteSections.sections.find((s) => s.id === "studies");
  const studyIds = sectionDef?.studyIds || [];
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));
  const studyProjects = studyIds.map((id) => projectMap[id]).filter(Boolean);

  return (
    <div className="space-y-5">
      <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
        {studyProjects.length} case stud{studyProjects.length !== 1 ? "ies" : "y"} · problem-solution architecture breakdowns
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {studyProjects.map((p) => (
          <StudyCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

// ─── /lab ─────────────────────────────────────────────────────────────────────

const labThemes = [
  {
    id: "model-ops",
    icon: Cpu,
    label: "Model operations",
    accent: "amber",
    body: "GPU, inference, model-serving, and evaluation work for AI Inference Lab. Covers FastAPI serving, Prometheus metrics, benchmark harness, Docker runtime, and Kubernetes-native LLM workloads.",
    projectIds: ["ai-inference-lab"],
  },
  {
    id: "agent-surfaces",
    icon: FlaskConical,
    label: "Agent surfaces",
    accent: "teal",
    body: "Governed personal AI assistant (Project Iris), mobile AI companion (Jerry), and evidence-first AIOps copilot (ForgeWatch). Each system has explicit approval gates, memory boundaries, and operator controls.",
    projectIds: ["project-iris", "jerry", "sentinel-copilot"],
  },
  {
    id: "infra-experiments",
    icon: Layers,
    label: "Infrastructure experiments",
    accent: "amber",
    body: "Homelab, Kubernetes, cloud, and self-hosted platform trials. Covers K3s, ArgoCD, Envoy Gateway, MetalLB, Longhorn, Vault, External Secrets, and the InfraForge operating model.",
    projectIds: ["infraforge", "vault-ops"],
  },
];

const LabThemeCard = ({ theme, projects }) => {
  const ThemeIcon = theme.icon;
  const relatedProjects = theme.projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);
  return (
    <article className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
            theme.accent === "amber"
              ? "border-amber-300/20 bg-amber-300/[0.08] text-amber-300"
              : "border-teal-300/20 bg-teal-300/[0.08] text-teal-300"
          }`}
        >
          <ThemeIcon className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-semibold text-white">{theme.label}</h2>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{theme.body}</p>
      {relatedProjects.length > 0 && (
        <div className="mt-5 space-y-2">
          {relatedProjects.map((p) => (
            <a
              key={p.id}
              href={p.caseStudyPath || `/case/${p.id}`}
              className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/10 px-4 py-3 text-sm text-slate-300 transition hover:border-teal-300/30 hover:text-teal-200"
            >
              <span>{p.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

const LabSection = ({ projects }) => (
  <div className="space-y-5">
    <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
      AI infrastructure · model operations · agent systems · platform experiments
    </p>
    <div className="grid gap-5 md:grid-cols-3">
      {labThemes.map((theme) => (
        <LabThemeCard key={theme.id} theme={theme} projects={projects} />
      ))}
    </div>
  </div>
);

// ─── /github ──────────────────────────────────────────────────────────────────

const visibilityLabel = {
  public: { text: "Public", cls: "border-teal-300/20 bg-teal-300/[0.07] text-teal-200" },
  private: { text: "Private", cls: "border-amber-300/20 bg-amber-300/[0.07] text-amber-200" },
  mixed: { text: "Mixed", cls: "border-slate-300/20 bg-slate-300/[0.07] text-slate-300" },
};

const DigestCard = ({ item }) => {
  const vis = visibilityLabel[item.repoVisibility] || visibilityLabel.mixed;
  return (
    <article className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent="teal">{item.category}</Tag>
        <span className={`rounded-full border px-3 py-1 text-xs ${vis.cls}`}>
          {vis.text} repo
        </span>
        <span className="ml-auto rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-500">
          {item.sourceType}
        </span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
      {asArray(item.signals).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.signals.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      )}
    </article>
  );
};

const GitHubSection = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-amber-300/15 bg-amber-300/[0.04] p-6">
      <p className="text-xs font-mono uppercase tracking-[0.18em] text-amber-300">Digest model</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        This digest is curated, not a raw commit feed. Most important repositories are private.
        Updates are reviewed before publication to avoid leaking implementation details, private
        repository names, or sensitive operational context. Generated digest content goes through
        a PR review gate before becoming public.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          No raw commits
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          No private URLs
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          PR-gated publishing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          Private-repo-aware
        </span>
      </div>
    </div>
    <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
      {githubDigest.length} curated signal{githubDigest.length !== 1 ? "s" : ""} · editorially reviewed
    </p>
    <div className="grid gap-5 md:grid-cols-2">
      {githubDigest.map((item) => (
        <DigestCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

// ─── Root component ───────────────────────────────────────────────────────────

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
