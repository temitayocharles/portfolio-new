import React, { useEffect } from "react";
import { ArrowLeft, FileText, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { profile } from "@/mock";

const LAST_UPDATED = "May 16, 2026";

const pages = {
  "/trust-safety": {
    label: "Trust & Safety",
    title: "Trust, safety, and responsible platform operations",
    description: "How this public brand hub handles reliability, security posture, AI-assisted workflows, responsible use, and reporting channels.",
    icon: ShieldCheck,
    sections: [
      ["Operational commitment", "This site presents professional portfolio, platform engineering, AI operations, and product narrative content for Temitayo Charles Akinniranye and the InfraForge ecosystem. The public website is designed to remain available from bundled static content even when optional backend systems are degraded."],
      ["Security posture", "Public pages should not expose secrets, private infrastructure endpoints, access tokens, private repository URLs, or operational credentials. Security-sensitive materials are intentionally summarized at a high level."],
      ["AI-assisted content", "Some content, documentation, and operational workflows may be assisted by AI systems. AI-assisted work is reviewed for accuracy, safety, and business appropriateness before publication."],
      ["Reporting", "Report suspected abuse, impersonation, security issues, unsafe content, or privacy concerns using the contact email listed below. Include the affected URL and relevant reproduction details."],
    ],
  },
  "/privacy-policy": {
    label: "Privacy Policy",
    title: "Privacy policy for the public portfolio and brand hub",
    description: "How this website handles contact messages, basic technical data, public links, and optional backend-powered functionality.",
    icon: LockKeyhole,
    sections: [
      ["Information collected", "If you submit a contact form or send an email, the information you provide may include your name, email address, subject, message, and related communication metadata. Hosting providers may process basic technical data such as IP address, browser type, device information, request timestamps, and pages visited."],
      ["Use of information", "Information is used to respond to inquiries, maintain the website, protect against misuse, improve content quality, and support professional or business communication. Contact information is not sold."],
      ["Third-party services", "This site may link to third-party services such as GitHub, LinkedIn, deployment providers, analytics systems, infrastructure platforms, or hosted assets. Those services operate under their own privacy practices."],
      ["Data requests", "To request access, correction, or deletion of information you submitted, use the contact email listed below and include enough detail to identify the relevant communication."],
    ],
  },
  "/terms": {
    label: "Terms of Service",
    title: "Terms for using this public website",
    description: "Basic terms governing access to the portfolio, case studies, documentation, links, and public-facing product narratives.",
    icon: FileText,
    sections: [
      ["Use of the website", "You may view and share public pages for professional evaluation, recruiting, collaboration, partnership, or general informational purposes. You may not misuse the site, attempt unauthorized access, scrape aggressively, interfere with availability, or impersonate Temitayo Charles Akinniranye or InfraForge."],
      ["Content and accuracy", "The site is maintained as a public brand hub and portfolio. Content may evolve as projects, infrastructure, and product narratives mature. Technical descriptions are informational and are not a guarantee of service availability or production access unless separately agreed in writing."],
      ["Intellectual property", "Unless otherwise stated, original text, design, diagrams, case-study framing, and brand presentation on this site are owned by Temitayo Charles Akinniranye or the relevant project entity. Third-party names and trademarks remain the property of their owners."],
      ["External links", "External links are provided for convenience and context. The website is provided as-is to the maximum extent permitted by law."],
    ],
  },
};

export const isLegalPagePath = (pathname) => Object.prototype.hasOwnProperty.call(pages, pathname);

const LegalPage = ({ path }) => {
  const page = pages[path] || pages["/trust-safety"];
  const Icon = page.icon;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page.label]);

  return (
    <main className="min-h-screen bg-[#0a0f14] text-slate-100">
      <section className="relative overflow-hidden px-6 py-10 lg:px-10 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,124,68,0.07),transparent_32rem),radial-gradient(circle_at_80%_10%,rgba(251,191,36,0.06),transparent_28rem)]" />
        <div className="relative mx-auto max-w-4xl">
          <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-stone-400/25 hover:text-stone-200">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </a>

          <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#0d141c]/86 p-6 shadow-2xl backdrop-blur md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-400/18 bg-stone-400/[0.06] px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-stone-200">
              <Icon className="h-3.5 w-3.5" />
              {page.label}
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{page.description}</p>
            <p className="mt-6 text-xs font-mono uppercase tracking-[0.18em] text-slate-500">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="mt-8 space-y-5">
            {page.sections.map(([title, body]) => (
              <article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 md:p-8">
                <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-amber-300/15 bg-amber-300/[0.06] p-6 md:p-8">
            <h2 className="text-lg font-semibold text-amber-100">Contact</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">For privacy, trust, safety, security, or terms-related requests, contact the site owner directly.</p>
            <a href={`mailto:${profile.email}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0a0f14] hover:bg-amber-100">
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
