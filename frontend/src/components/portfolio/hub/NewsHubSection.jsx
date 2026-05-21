import React from "react";
import siteUpdates from "@/content/site-updates.json";
import { asArray } from "./HubDesignTokens";
import { Tag } from "./HubPrimitives";

const UPDATE_LANES = [
  {
    id: "platform",
    title: "Platform and operations",
    categories: ["Platform", "Platform Engineering", "AIOps"],
    accent: "teal",
    summary:
      "Operational delivery updates across GitOps, observability, reliability posture, and governance surfaces.",
  },
  {
    id: "ai",
    title: "AI infrastructure and agent systems",
    categories: ["AI Infrastructure", "Personal AI"],
    accent: "amber",
    summary:
      "Public-safe progress across model operations, governed assistant flows, and agent-facing product surfaces.",
  },
];

const laneAccent = {
  teal: "border-stone-400/14 bg-stone-400/[0.04] text-stone-200",
  amber: "border-amber-400/15 bg-amber-400/[0.04] text-amber-200",
};

const UpdateCard = ({ update }) => (
  <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-stone-400/18 hover:bg-white/[0.04]">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Tag accent="teal">{update.category}</Tag>
      <time className="font-mono text-xs text-slate-600">{update.date}</time>
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{update.title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-300">{update.summary}</p>
    {update.impact && (
      <p className="mt-4 rounded-xl border border-stone-400/10 bg-stone-400/[0.04] px-4 py-3 text-sm text-stone-200">
        {update.impact}
      </p>
    )}
    {asArray(update.relatedRoutes).length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {update.relatedRoutes.map((route) => (
          <a
            key={route}
            href={route}
            className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-500 transition hover:text-stone-300"
          >
            {route}
          </a>
        ))}
      </div>
    )}
    <a
      href={`/news/${update.id}`}
      className="mt-5 inline-flex items-center text-sm font-semibold text-amber-300 transition hover:text-amber-200"
    >
      Read update
    </a>
  </article>
);

const NewsHubSection = () => {
  const mapped = UPDATE_LANES.map((lane) => ({
    ...lane,
    items: siteUpdates.filter((update) => lane.categories.includes(update.category)),
  })).filter((lane) => lane.items.length > 0);

  const coveredIds = new Set(mapped.flatMap((lane) => lane.items.map((item) => item.id)));
  const uncategorized = siteUpdates.filter((update) => !coveredIds.has(update.id));

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Editorial posture</p>
        <h2 className="mt-3 text-xl font-semibold text-white">Engineering updates, curated for public context</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          This stream publishes reviewed milestones across infrastructure, AI systems, product operations, and release
          hardening. Entries are public-safe summaries, not raw internal logs.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-600">Coverage</p>
            <p className="mt-2 text-sm text-slate-300">Platform, AI infrastructure, and product-system updates</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-600">Publishing model</p>
            <p className="mt-2 text-sm text-slate-300">Editorial review with private-source-aware summaries</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-600">Current cadence</p>
            <p className="mt-2 text-sm text-slate-300">
              {siteUpdates.length} update{siteUpdates.length !== 1 ? "s" : ""} · curated archive
            </p>
          </div>
        </div>
      </section>

      {mapped.map((lane) => (
        <section key={lane.id} className="space-y-4">
          <div className={`rounded-2xl border px-5 py-4 ${laneAccent[lane.accent] || laneAccent.teal}`}>
            <p className="font-mono text-xs uppercase tracking-[0.16em]">{lane.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{lane.summary}</p>
          </div>
          <div className="space-y-4">
            {lane.items.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        </section>
      ))}

      {uncategorized.length > 0 && (
        <section className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Additional updates</p>
          <div className="space-y-4">
            {uncategorized.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        </section>
      )}

      <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-xs text-slate-500">
        Public-safe publication model: no private repository names, no secret material, and no sensitive internal
        implementation detail.
      </div>
    </div>
  );
};

export default NewsHubSection;
