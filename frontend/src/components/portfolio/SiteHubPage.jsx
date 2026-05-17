import React, { useEffect } from "react";
import { ArrowLeft, BookOpen, Code2, FlaskConical, Newspaper, PanelsTopLeft, PenLine } from "lucide-react";
import Footer from "@/components/portfolio/Footer";
import { usePortfolioContent } from "@/context/PortfolioContentContext";

const routeConfig = {
  "/projects": {
    label: "Projects",
    title: "Products, platforms, and operating systems",
    description: "A structured view of the InfraForge platform estate, AI infrastructure work, education products, and public case-study surfaces.",
    icon: PanelsTopLeft,
    type: "projects",
  },
  "/news": {
    label: "News",
    title: "Updates and build notes",
    description: "A curated update stream for launches, infrastructure improvements, platform milestones, and public-facing product movement.",
    icon: Newspaper,
    type: "updates",
  },
  "/writing": {
    label: "Writing",
    title: "Technical writing and platform thinking",
    description: "Engineering notes, implementation narratives, operating-model essays, and public technical communication.",
    icon: PenLine,
    type: "writing",
  },
  "/studies": {
    label: "Studies",
    title: "Case studies and architecture studies",
    description: "Deeper problem-solution breakdowns for flagship systems, including AI operations, GitOps, observability, secrets, education, and platform reliability.",
    icon: BookOpen,
    type: "studies",
  },
  "/lab": {
    label: "Lab",
    title: "AI infrastructure lab and experiments",
    description: "A focused surface for AI Inference Lab, GPU/model operations, agent systems, mobile AI interfaces, and platform experiments.",
    icon: FlaskConical,
    type: "lab",
  },
  "/github": {
    label: "GitHub",
    title: "GitHub and engineering activity digest",
    description: "A future curated digest for public and private-source development signals, designed to publish reviewed updates without leaking sensitive implementation detail.",
    icon: Code2,
    type: "github",
  },
};

const asArray = (value) => (Array.isArray(value) ? value : []);
const projectSlug = (project) => project.slug || project.id || project.key || "";
const projectTitle = (project) => project.title || project.name || project.label || "Untitled project";
const projectSummary = (project) => project.summary || project.description || project.shortDescription || "Project summary pending editorial review.";

export const isSiteHubPath = (pathname) => Object.prototype.hasOwnProperty.call(routeConfig, pathname);

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
            className={`rounded-2xl border px-3 py-2 transition ${path === currentPath ? "border-teal-300/40 bg-teal-300/[0.08] text-teal-100" : "border-white/[0.07] bg-black/10 text-slate-400 hover:border-teal-300/30 hover:text-teal-200"}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

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
          <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-teal-300/40 hover:text-teal-200">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/[0.08] px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-teal-200">
                <Icon className="h-3.5 w-3.5" />
                {page.label}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">{page.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{page.description}</p>
            </div>
            <HubNavigation />
          </div>

          <div className="mt-10">{children}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

const ProjectGrid = ({ projects }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {projects.map((project) => {
      const slug = projectSlug(project);
      return (
        <article key={slug || projectTitle(project)} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition hover:border-teal-300/25 hover:bg-white/[0.05]">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300">{project.category || project.status || "Platform work"}</p>
          <h2 className="mt-4 text-xl font-semibold text-white">{projectTitle(project)}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{projectSummary(project)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {asArray(project.tags || project.stack || project.technologies).slice(0, 5).map((tag) => (
              <span key={tag} className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-400">{tag}</span>
            ))}
          </div>
          {slug && <a href={`/case/${slug}`} className="mt-6 inline-flex text-sm font-semibold text-amber-200 hover:text-amber-100">View case study</a>}
        </article>
      );
    })}
  </div>
);

const WritingList = ({ writings }) => (
  <div className="grid gap-5 md:grid-cols-2">
    {writings.map((item, index) => (
      <article key={item.title || index} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">{item.type || item.category || "Writing"}</p>
        <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary || item.description || "Editorial summary pending."}</p>
        {item.href && <a href={item.href} className="mt-5 inline-flex text-sm font-semibold text-amber-200 hover:text-amber-100">Read more</a>}
      </article>
    ))}
  </div>
);

const placeholderGroups = {
  updates: [
    ["Launch notes", "Short product and platform updates will live here after editorial review."],
    ["Build digest", "Curated development signals from public and private repositories can be promoted into this section."],
    ["Milestones", "Major releases, infrastructure upgrades, and brand updates will get a durable public record."],
  ],
  studies: [
    ["AI operations", "Deeper problem-solution studies for AI Inference Lab, ForgeWatch, Project Iris, and Jerry."],
    ["Platform reliability", "Architecture breakdowns for GitOps, observability, secrets, delivery, and incident handling."],
    ["Product systems", "Case-study expansions for education, reading, social-impact, and developer-tooling products."],
  ],
  lab: [
    ["Model operations", "GPU, inference, model-serving, and evaluation notes for AI Inference Lab."],
    ["Agent surfaces", "Personal assistant, mobile operator, and governed automation experiments."],
    ["Infrastructure experiments", "Homelab, Kubernetes, cloud, and self-hosted platform trials."],
  ],
  github: [
    ["Curated signals", "Future digests should summarize meaningful development activity rather than dumping raw commits."],
    ["Private-source aware", "Most important repositories may be private, so generated updates must go through reviewed summaries."],
    ["PR-based publishing", "Generated digest content should open a reviewable pull request before becoming public."],
  ],
};

const PlaceholderCards = ({ type }) => (
  <div className="grid gap-5 md:grid-cols-3">
    {asArray(placeholderGroups[type]).map(([title, body]) => (
      <article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
      </article>
    ))}
  </div>
);

const SiteHubPage = ({ path }) => {
  const content = usePortfolioContent();
  const page = routeConfig[path] || routeConfig["/projects"];
  const projects = asArray(content.projects);
  const writings = asArray(content.writings);

  let body;
  if (page.type === "projects") {
    body = <ProjectGrid projects={projects} />;
  } else if (page.type === "writing") {
    body = writings.length > 0 ? <WritingList writings={writings} /> : <PlaceholderCards type="updates" />;
  } else {
    body = <PlaceholderCards type={page.type} />;
  }

  return <SectionShell page={page}>{body}</SectionShell>;
};

export default SiteHubPage;
