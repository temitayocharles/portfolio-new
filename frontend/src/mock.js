// Mock data for Temitayo Charles Akinniranye's portfolio
// All content here will eventually be served from backend / CMS.

export const profile = {
  name: "Temitayo Charles Akinniranye",
  firstName: "Temitayo",
  title: "DevOps · Cloud Platform · AI Infrastructure Engineer",
  tagline:
    "I build reliable cloud platforms, secure automation, and AI-ready infrastructure.",
  location: "Remote",
  email: "tayocharlesaki@gmail.com",
  linkedin: "https://linkedin.com/in/temitayocharles",
  github: "https://github.com/temitayocharles",
  resumeUrl: "",
  avatar: "/assets/temitayo-charles-headshot.png",
  yearsExperience: 8,
};

export const heroStats = [
  { value: "99.99%", label: "Platform availability" },
  { value: "$216K+", label: "Annual AWS savings" },
  { value: "2M+", label: "API requests / day" },
  { value: "4h → 15m", label: "Deployment time cut" },
];

export const aboutParagraphs = [
  "I started my career in Linux systems and infrastructure operations, where I built a strong foundation in servers, automation, monitoring, backups, documentation, and production support. Over time, I moved deeper into cloud infrastructure, DevOps, platform engineering, and reliability, helping teams modernize deployment workflows, migrate workloads to AWS, and improve operational discipline.",
  "My experience spans fintech, SaaS, and remote engineering environments where reliability, security, and speed matter. I have led infrastructure automation, CI/CD modernization, Kubernetes platform delivery, disaster recovery planning, observability implementation, and cloud cost optimization, reducing deployment cycles from hours to minutes, lifting platform availability to 99.99%, cutting AWS spend by more than $216K annually, and supporting systems processing more than 2 million API requests per day.",
  "Today, I combine DevOps and platform engineering with AI infrastructure and workflow automation. I build production-style Kubernetes platforms, GitOps-driven delivery systems, AI-assisted operations workflows, and secure automation patterns that include human approval, observability context, runbook memory, and operational controls. My unique value is connecting infrastructure engineering, reliability, automation, security, and AI workflows into practical systems that solve real business problems.",
];

export const aboutHighlights = [
  { label: "Years engineering", value: "8+" },
  { label: "Production releases enabled", value: "200+/mo" },
  { label: "Apps migrated to AWS", value: "12 monoliths" },
  { label: "DR window collapsed", value: "4h → 15m" },
];

export const skillGroups = [
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    icon: "Cloud",
    items: [
      "AWS", "EKS", "ECS", "EC2", "S3", "Lambda", "RDS", "CloudFormation",
      "Route 53", "IAM", "KMS", "SSM", "AWS Organizations", "Azure", "GCP",
      "FinOps", "Multi-account governance", "Cost optimization",
    ],
  },
  {
    id: "k8s",
    title: "Kubernetes & Platform Engineering",
    icon: "Boxes",
    items: [
      "Kubernetes", "EKS", "K3s", "Docker", "Helm", "ArgoCD", "GitOps",
      "Envoy Gateway", "Gateway API", "Kong API Gateway", "MetalLB",
      "Longhorn", "Rancher", "Platform operations", "Env standardization",
    ],
  },
  {
    id: "iac",
    title: "IaC, CI/CD & GitOps",
    icon: "GitBranch",
    items: [
      "Terraform", "Terraform Cloud", "OpenTofu", "Ansible", "CloudFormation",
      "GitHub Actions", "Jenkins", "GitLab CI/CD", "Quality gates",
      "Release governance", "Reusable modules",
    ],
  },
  {
    id: "sec",
    title: "DevSecOps & Supply Chain",
    icon: "ShieldCheck",
    items: [
      "HashiCorp Vault", "External Secrets", "Trivy", "Checkov", "SonarQube",
      "IAM", "KMS", "Least privilege", "Secrets management",
      "SAST / DAST", "Policy-as-code", "SOC 2 controls",
    ],
  },
  {
    id: "obs",
    title: "Observability & SRE",
    icon: "Activity",
    items: [
      "Prometheus", "Grafana", "CloudWatch", "ELK Stack", "Loki",
      "Alertmanager", "Datadog", "PagerDuty", "SLI / SLO", "Incident response",
      "RCA", "RTO / RPO", "MTTR reduction", "Error budgets",
    ],
  },
  {
    id: "ai",
    title: "AI Infrastructure & Workflow Automation",
    icon: "Sparkles",
    items: [
      "LLM workflow integration", "AI-assisted operations", "Prompt design",
      "Local / self-hosted AI", "n8n-style automation", "API orchestration",
      "Webhook workflows", "Tool-calling patterns", "Human-in-the-loop",
    ],
  },
  {
    id: "code",
    title: "Scripting, APIs & Data",
    icon: "Code2",
    items: [
      "Python", "Bash", "Boto3", "Groovy", "HCL", "YAML", "REST APIs",
      "JSON", "Webhooks", "MySQL", "PostgreSQL", "Aurora", "DynamoDB", "Redis",
    ],
  },
  {
    id: "lead",
    title: "Leadership & Delivery",
    icon: "Users",
    items: [
      "Agile", "Scrum", "SAFe", "PMP", "CSM", "Mentoring", "Onboarding",
      "Technical documentation", "Runbooks", "Stakeholder communication",
      "Release coordination", "Operational handoff",
    ],
  },
];

export const experiences = [
  {
    id: "kanshe",
    role: "Senior DevOps & Cloud Platform Engineer",
    company: "Kanshe Infotech",
    location: "Remote",
    period: "Apr 2022 · Present",
    summary:
      "Architect and operate cloud platform, CI/CD, Kubernetes, GitOps, DevSecOps, observability, and reliability workflows for production environments, improving deployment speed, infrastructure reliability, cost governance, and operational consistency.",
    achievements: [
      "Reduced deployment time from 4 hours to 15 minutes via GitHub Actions and Jenkins pipelines.",
      "Enabled 200+ monthly production releases with zero rollbacks through stronger validation and delivery controls.",
      "Lifted platform reliability from 99.9% to 99.99% for infra serving 2M+ API requests / day.",
      "Cut AWS spend by ~$18K / month through audits, rightsizing, tagging, and governance.",
      "Drove GitOps adoption with ArgoCD and Helm, 40+ production releases / week, no weekend windows.",
      "Integrated Trivy, Checkov, SonarQube, and HashiCorp Vault into delivery for DevSecOps and audit readiness.",
      "Designed disaster recovery across 8 services, RTO 4h → 15m, MTTR < 30 minutes.",
    ],
  },
  {
    id: "infonas-2",
    role: "Platform Engineer",
    company: "Infonas",
    location: "Remote",
    period: "Mar 2020 · Mar 2022",
    summary:
      "Modernized application delivery, cloud infrastructure, automation, monitoring, and operational support for AWS-based environments, supporting cloud migration, microservices delivery, secure infra design, and 24/7 platform operations.",
    achievements: [
      "Led migration of 12 monolithic applications to AWS, 35% infrastructure cost reduction.",
      "Designed GitLab CI/CD workflows scaling releases from weekly to multiple daily pushes.",
      "Built multi-AZ VPCs, least-privilege IAM, and HA EKS clusters with Terraform.",
      "Automated provisioning, patching, and rollouts via Ansible + Terraform, env build days → < 4 hours.",
      "Created Bash / Python automation for backups, restoration, and log management, 40% less manual work.",
      "Established centralized observability with ELK + CloudWatch, 35% lower MTTD on critical incidents.",
    ],
  },
  {
    id: "infonas-1",
    role: "DevOps Engineer",
    company: "Infonas",
    location: "Remote",
    period: "Jan 2018 · Feb 2020",
    summary:
      "Developed and maintained CI/CD pipelines, infrastructure automation, containerized workloads, monitoring systems, and secure AWS operations, strengthening foundations in repeatable delivery and cloud reliability.",
    achievements: [
      "Built CI/CD and infrastructure automation using GitLab CI/CD, Terraform, and Ansible.",
      "Implemented Docker and Kubernetes / EKS practices for scalability and deployment consistency.",
      "Created automated monitoring and logging workflows with ELK Stack and CloudWatch.",
      "Enforced IAM best practices and managed secrets via AWS SSM Parameter Store.",
    ],
  },
  {
    id: "earlier",
    role: "Linux Systems Engineer · Scrum Facilitator · Linux SysAdmin",
    company: "Beyond Solutions · British Council Bahrain · Cambridge International School",
    location: "On-site",
    period: "2014 · 2017",
    summary:
      "Managed Linux systems, server operations, backups, monitoring, storage, Apache, MySQL, and infrastructure documentation, building the operational discipline that still shapes how I design reliable platforms today.",
    achievements: [
      "Managed and optimized 200+ Ubuntu and CentOS servers.",
      "Automated backups, log rotation, maintenance, and monitoring with Bash and Python.",
      "Authored technical runbooks and disaster recovery documentation.",
    ],
  },
];

export const projects = [
  {
    id: "infraforge",
    name: "TCA InfraForge",
    subtitle: "Production-Style Kubernetes Platform",
    description:
      "A bare-metal Ubuntu / K3s high-availability platform demonstrating enterprise-style Kubernetes operations: GitOps delivery, Gateway API ingress, secure secrets externalization, resilient storage, observability, backup and recovery, policy controls, and operational runbooks.",
    stack: [
      "K3s", "ArgoCD", "Envoy Gateway", "MetalLB", "Longhorn", "Vault",
      "External Secrets", "Prometheus", "Grafana", "Loki", "Alertmanager",
      "Kyverno", "Trivy", "Renovate", "Velero", "Cloudflare Tunnel", "Tailscale",
    ],
    pillars: ["GitOps", "Security", "Observability", "DR"],
    accent: "teal",
  },
  {
    id: "forgewatch",
    name: "ForgeWatch AIOps",
    subtitle: "AI-Assisted Kubernetes Operations",
    description:
      "Local-first AIOps workflows combining LLM reasoning, observability signals, incident context, runbook memory, and read-only analysis patterns, supporting safer incident triage, evidence-based recommendations, hallucination-resistant investigation, and future approval-gated execution.",
    stack: ["LLM", "Prometheus", "Loki", "Runbook Memory", "Read-only Tools"],
    pillars: ["AIOps", "SRE", "Human-in-loop"],
    accent: "amber",
  },
  {
    id: "iris",
    name: "Project Iris",
    subtitle: "Local-First AI Assistant Platform",
    description:
      "A local-first AI assistant platform built with FastAPI and React / Vite, featuring memory governance, tool execution, managed browser capability, TLS / auth hardening, backup and restore validation, and user-facing workflow controls. Designed with privacy, control, and operational safety in mind.",
    stack: ["FastAPI", "React", "Vite", "TLS", "Auth", "Backup", "Memory governance"],
    pillars: ["AI", "Privacy", "Local-first"],
    accent: "teal",
  },
  {
    id: "openleaf",
    name: "OpenLeaf Reader Platform",
    subtitle: "Cloud-Native Microservices Simulation",
    description:
      "Cloud-native platform simulation using Kong Gateway, decK, Python services, React, RabbitMQ, MongoDB, Stripe webhooks, GitHub Actions, ArgoCD, Prometheus, Grafana, Loki, and Chaos Mesh. Validates API gateway governance, microservices delivery, event-driven integration, release automation, observability, and reliability testing.",
    stack: [
      "Kong", "decK", "Python", "React", "RabbitMQ", "MongoDB", "Stripe",
      "GitHub Actions", "ArgoCD", "Prometheus", "Grafana", "Loki", "Chaos Mesh",
    ],
    pillars: ["Microservices", "API Gateway", "Chaos"],
    accent: "amber",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#writing", label: "Writing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const writings = [
  {
    id: "w1",
    title: "Cutting a 4-Hour Deploy to 15 Minutes: A GitOps Playbook",
    excerpt:
      "How we replaced a brittle weekly release train with ArgoCD, reusable Helm charts, and automated release validation. Covers reusable pipeline primitives, rollout strategy, and the quality gates that let us ship 40+ production releases per week.",
    tag: "GitOps",
    readTime: "8 min",
    date: "Mar 12, 2025",
    accent: "teal",
    featured: true,
  },
  {
    id: "w2",
    title: "Shaving $216K a Year Off AWS Without Breaking Production",
    excerpt:
      "A practical FinOps walkthrough: tagging strategy, rightsizing cadence, savings-plan bets, idle compute hunting, and how governance prevented regressions at 2M+ API requests per day.",
    tag: "FinOps",
    readTime: "11 min",
    date: "Feb 4, 2025",
    accent: "amber",
  },
  {
    id: "w3",
    title: "Designing AIOps with Human-in-the-Loop Safety",
    excerpt:
      "Why evidence-grounded triage, runbook memory, and read-only analysis are the default posture before you let LLMs near production. A deep dive into the ForgeWatch approach.",
    tag: "AIOps",
    readTime: "14 min",
    date: "Jan 21, 2025",
    accent: "teal",
  },
  {
    id: "w4",
    title: "99.99% Isn't a Metric, It's a Culture",
    excerpt:
      "From error budgets and SLOs to on-call hygiene and blameless postmortems. How platform discipline, not heroics, gets you the extra nine.",
    tag: "SRE",
    readTime: "9 min",
    date: "Nov 18, 2024",
    accent: "amber",
  },
  {
    id: "w5",
    title: "Bare-Metal Kubernetes That Feels Like Production",
    excerpt:
      "Inside TCA InfraForge: Ubuntu + K3s, Gateway API via Envoy, Longhorn storage, External Secrets with Vault, Velero backups, and a Kyverno policy stack that mirrors enterprise controls.",
    tag: "Kubernetes",
    readTime: "16 min",
    date: "Oct 3, 2024",
    accent: "teal",
  },
  {
    id: "w6",
    title: "Supply Chain Security on a Delivery Team's Budget",
    excerpt:
      "How to fold Trivy, Checkov, SonarQube, and Vault-backed secrets into an existing CI/CD pipeline without slowing down the team or turning security into a bottleneck.",
    tag: "DevSecOps",
    readTime: "12 min",
    date: "Aug 27, 2024",
    accent: "amber",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Adaeze O.",
    role: "Engineering Manager",
    company: "Fintech SaaS",
    initials: "AO",
    accent: "teal",
    quote:
      "Temitayo rebuilt our delivery pipeline from a brittle weekly release into a 40-per-week GitOps engine. The team finally trusts production again, and our weekends came back.",
  },
  {
    id: "t2",
    name: "Marcus L.",
    role: "VP of Engineering",
    company: "B2B Cloud Platform",
    initials: "ML",
    accent: "amber",
    quote:
      "He cut our AWS spend by ~$18K/month in the first quarter without a single performance regression. Rare to find an engineer who blends FinOps discipline with deep platform skills.",
  },
  {
    id: "t3",
    name: "Priya S.",
    role: "Senior SRE",
    company: "High-volume API platform",
    initials: "PS",
    accent: "teal",
    quote:
      "Our MTTR dropped under 30 minutes after Temitayo redesigned the observability stack. Runbooks became real, alerts became actionable, and incident reviews became evidence-driven.",
  },
  {
    id: "t4",
    name: "Daniel K.",
    role: "CTO",
    company: "Remote-first startup",
    initials: "DK",
    accent: "amber",
    quote:
      "The bare-metal Kubernetes platform he designed for us reads like a textbook on production discipline, GitOps, Vault, External Secrets, Velero, Kyverno, every layer thought through.",
  },
  {
    id: "t5",
    name: "Sarah M.",
    role: "Director of Platform",
    company: "Healthcare SaaS",
    initials: "SM",
    accent: "teal",
    quote:
      "Temitayo is the rare engineer who can ship reliable infrastructure and explain it to auditors, executives, and junior engineers in the same week. SOC 2 evidence packets practically wrote themselves.",
  },
  {
    id: "t6",
    name: "Jonas R.",
    role: "Lead Developer",
    company: "AI Infrastructure team",
    initials: "JR",
    accent: "amber",
    quote:
      "His AI-assisted ops workflow gave us evidence-grounded triage with human approval gates baked in, exactly the safety posture we needed before letting LLMs near production.",
  },
];

export const heroVisuals = {
  abstract:
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHxrdWJlcm5ldGVzJTIwbmV0d29ya3xlbnwwfHx8YmxhY2t8MTc3Nzc0MjE3OXww&ixlib=rb-4.1.0&q=85",
  aboutVisual:
    "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwzfHxrdWJlcm5ldGVzJTIwbmV0d29ya3xlbnwwfHx8YmxhY2t8MTc3Nzc0MjE3OXww&ixlib=rb-4.1.0&q=85",
};
