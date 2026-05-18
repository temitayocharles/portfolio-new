import React from "react";
import { Tag } from "./HubPrimitives";

const EDITORIAL_TRACKS = [
  {
    id: "platform-engineering",
    title: "Platform engineering track",
    tags: ["GitOps", "Kubernetes", "DevSecOps", "SRE"],
    summary:
      "Production-focused writing on operating model design, delivery controls, reliability, and secure platform operations.",
  },
  {
    id: "ai-systems",
    title: "AI systems track",
    tags: ["AI Infrastructure", "AIOps"],
    summary:
      "Model-operations and operational-intelligence writing for AI-serving systems and evidence-led response loops.",
  },
  {
    id: "product-operations",
    title: "Product and business operations track",
    tags: ["FinOps"],
    summary:
      "Cross-functional writing on cost governance, product-system tradeoffs, and practical engineering decision quality.",
  },
];

const WritingCard = ({ item }) => (
  <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/15 hover:bg-white/[0.04]">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Tag accent={item.accent || "teal"}>{item.tag || item.type || "Writing"}</Tag>
      {item.readTime && <span className="font-mono text-xs text-slate-600">{item.readTime}</span>}
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
    <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{item.excerpt || item.summary || item.description}</p>
    {item.date && <p className="mt-4 font-mono text-xs text-slate-600">{item.date}</p>}
    {item.noteTitle && (
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <p className="text-xs font-semibold text-slate-300">{item.noteTitle}</p>
        <p className="mt-1 text-xs leading-6 text-slate-500">{item.noteBody}</p>
      </div>
    )}
  </article>
);

const WritingHubSection = ({ writings }) => {
  const tracks = EDITORIAL_TRACKS.map((track) => ({
    ...track,
    items: writings.filter((item) => track.tags.includes(item.tag)),
  })).filter((track) => track.items.length > 0);

  const coveredIds = new Set(tracks.flatMap((track) => track.items.map((item) => item.id)));
  const uncategorized = writings.filter((item) => !coveredIds.has(item.id));

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Editorial index</p>
        <h2 className="mt-3 text-xl font-semibold text-white">Writing for platform operators and product builders</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          This index organizes practical engineering writing across platform operations, AI infrastructure, DevSecOps,
          reliability, and product-system execution. It is structured as a concise reading surface, not a blog feed of
          long-form drafts.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-600">Pieces</p>
            <p className="mt-2 text-sm text-slate-300">
              {writings.length} editorial piece{writings.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-600">Primary themes</p>
            <p className="mt-2 text-sm text-slate-300">GitOps, AI infrastructure, DevSecOps, SRE, FinOps</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-600">Suggested path</p>
            <p className="mt-2 text-sm text-slate-300">Platform foundations → AI systems → product operations</p>
          </div>
        </div>
      </section>

      {tracks.map((track) => (
        <section key={track.id} className="space-y-4">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{track.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{track.summary}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {track.items.map((item, index) => (
              <WritingCard key={item.id || `${track.id}-${index}`} item={item} />
            ))}
          </div>
        </section>
      ))}

      {uncategorized.length > 0 && (
        <section className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Additional writing</p>
          <div className="grid gap-5 md:grid-cols-2">
            {uncategorized.map((item, index) => (
              <WritingCard key={item.id || `uncategorized-${index}`} item={item} />
            ))}
          </div>
        </section>
      )}

      <div className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-xs text-slate-500">
        Scope note: concise, public-safe editorials. No private source details and no browser-side GitHub API
        dependency.
      </div>
    </div>
  );
};

export default WritingHubSection;
