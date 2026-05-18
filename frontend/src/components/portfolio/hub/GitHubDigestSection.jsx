import React from "react";
import { ArrowRight, Lock } from "lucide-react";
import githubDigest from "@/content/github-digest.json";
import { WORKFLOW_STEPS, asArray, visibilityConfig } from "./HubDesignTokens";
import { SignalPill, Tag } from "./HubPrimitives";

const DigestWorkflowStrip = () => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
    <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Digest publication model</p>
    <div className="flex flex-col gap-4 md:flex-row md:gap-0">
      {WORKFLOW_STEPS.map((step, index) => {
        const StepIcon = step.icon;
        const isLast = index === WORKFLOW_STEPS.length - 1;
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

const DigestCard = ({ item }) => {
  const visibility = visibilityConfig[item.repoVisibility] || visibilityConfig.mixed;
  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/15 hover:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-2">
        <Tag accent="teal">{item.category}</Tag>
        <Tag accent={visibility.accent}>
          <Lock className="h-3 w-3" />
          {visibility.label}
        </Tag>
        <span className="ml-auto font-mono text-xs text-slate-600">{item.sourceType}</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{item.summary}</p>
      {asArray(item.signals).length > 0 && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-slate-600">Signals</p>
          <div className="flex flex-wrap gap-1.5">
            {item.signals.map((signal) => (
              <SignalPill key={signal}>{signal}</SignalPill>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

const digestStats = [
  { label: "Curated signals", value: String(githubDigest.length) },
  { label: "Private-source", value: String(githubDigest.filter((item) => item.repoVisibility === "private").length) },
  { label: "Publication gate", value: "PR review" },
  { label: "Raw commits exposed", value: "None" },
];

const GitHubDigestSection = () => (
  <div className="space-y-8">
    <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-6">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-amber-400">Digest model — curated, private-repo-aware</p>
      <p className="text-sm leading-7 text-slate-300">
        This is a curated engineering digest, not a raw commit feed. Most important repositories are private. Updates are
        reviewed before publication to avoid leaking implementation details, private repository names, or sensitive
        operational context. No GitHub API is called from the browser.
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

export default GitHubDigestSection;
