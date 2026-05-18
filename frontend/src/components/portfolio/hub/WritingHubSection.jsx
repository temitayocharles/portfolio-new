import React from "react";
import { Tag } from "./HubPrimitives";

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

const WritingHubSection = ({ writings }) => (
  <div className="space-y-6">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      {writings.length} piece{writings.length !== 1 ? "s" : ""} · platform thinking and engineering narratives
    </p>
    <div className="grid gap-5 md:grid-cols-2">
      {writings.map((item, index) => (
        <WritingCard key={item.id || index} item={item} />
      ))}
    </div>
  </div>
);

export default WritingHubSection;
