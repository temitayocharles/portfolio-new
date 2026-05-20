import React from "react";
import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { profile } from "@/mock";

const proofItems = [
  "Kubernetes, GitOps, AWS, Terraform, DevSecOps, observability, SRE, and AIOps in one operating model.",
  "Metrics framed around deployment speed, reliability, cost governance, recovery, and incident response.",
  "Portfolio includes direct case-study pages, downloadable diagrams, runbook samples, and public repository evidence where available.",
];

const badges = [
  { label: "Portfolio CI", href: "https://github.com/temitayocharles/portfolio-new/actions", src: "https://github.com/temitayocharles/portfolio-new/actions/workflows/ci.yml/badge.svg" },
  { label: "ForgeWatch repo", href: "https://github.com/temitayocharles/sentinel-copilot", src: "https://img.shields.io/badge/ForgeWatch-public_repo-111827" },
  { label: "OpenLeaf repo", href: "https://github.com/temitayocharles/OpenLeaf-Reader-Platform", src: "https://img.shields.io/badge/OpenLeaf-public_repo-111827" },
];

const HiringManagerSummary = () => {
  return (
    <section id="hiring-summary" className="relative border-y border-white/5 bg-[#0b0f14] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.055] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-200">
            <BriefcaseBusiness className="h-3.5 w-3.5" /> Hiring Manager Summary
          </div>
          <h2 className="mt-6 text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-slate-50">
            Senior platform engineer who can connect delivery, reliability, security, and AI operations.
          </h2>
          <p className="mt-5 text-slate-300 leading-[1.75]">
            {profile.name} is positioned for senior DevOps, platform engineering, SRE, DevSecOps, and AI infrastructure roles where production discipline matters more than tool lists.
          </p>
        </div>
        <div className="space-y-4">
          {proofItems.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm leading-relaxed text-slate-300">
              <BadgeCheck className="mt-0.5 h-4 w-4 flex-none text-amber-300" />
              <span>{item}</span>
            </div>
          ))}
          <div className="rounded-2xl border border-white/[0.07] bg-black/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5" /> CI and repository evidence
            </div>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <a key={badge.label} href={badge.href} target="_blank" rel="noreferrer" aria-label={`Open ${badge.label}`} className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 hover:border-amber-300/30">
                  <img src={badge.src} alt={`${badge.label} badge`} className="h-5" loading="lazy" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringManagerSummary;
