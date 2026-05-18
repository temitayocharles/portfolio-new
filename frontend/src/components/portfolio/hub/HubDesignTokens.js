import {
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  FlaskConical,
  GitBranch,
  GraduationCap,
  Layers,
  Newspaper,
  PanelsTopLeft,
  PenLine,
  ShieldCheck,
  Activity,
  Server,
  Zap,
} from "lucide-react";

export const asArray = (value) => (Array.isArray(value) ? value : []);

export const routeConfig = {
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

export const ACCENT = {
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
  neutral: {
    border: "border-slate-400/15",
    bg: "bg-slate-400/[0.07]",
    text: "text-slate-300",
    dot: "bg-slate-400",
    rule: "bg-slate-400",
    pill: "border-slate-400/20 bg-slate-400/[0.06] text-slate-200",
  },
};

export const FLAGSHIP_IDS = ["ai-inference-lab", "infraforge", "sentinel-copilot"];

export const groupIcons = {
  "flagship-ai-platform": Cpu,
  "personal-ai": Brain,
  education: GraduationCap,
  "infrastructure-devsecops": ShieldCheck,
};

export const groupAccent = {
  "flagship-ai-platform": "teal",
  "personal-ai": "amber",
  education: "teal",
  "infrastructure-devsecops": "amber",
};

export const studyTypeOrder = ["case-study", "architecture-study", "operational-study"];

export const studyTypeConfig = {
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

export const LAB_LANES = [
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

export const WORKFLOW_STEPS = [
  { icon: GitBranch, label: "Repository signals", detail: "Public and private repos" },
  { icon: CheckCircle2, label: "Curation pass", detail: "Editorial selection" },
  { icon: Zap, label: "PR review gate", detail: "Approval required" },
  { icon: Activity, label: "Public update", detail: "No secrets, no private URLs" },
];

export const visibilityConfig = {
  public: { label: "Public", accent: "teal" },
  private: { label: "Private source", accent: "amber" },
  mixed: { label: "Mixed", accent: "neutral" },
};
