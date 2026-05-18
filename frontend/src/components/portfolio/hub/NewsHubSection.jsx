import React from "react";
import siteUpdates from "@/content/site-updates.json";
import { asArray } from "./HubDesignTokens";
import { Tag } from "./HubPrimitives";

const UpdateCard = ({ update }) => (
  <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:border-teal-400/15 hover:bg-white/[0.04]">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Tag accent="teal">{update.category}</Tag>
      <time className="font-mono text-xs text-slate-600">{update.date}</time>
    </div>
    <h2 className="mt-4 text-xl font-semibold text-white">{update.title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-300">{update.summary}</p>
    {update.impact && (
      <p className="mt-4 rounded-xl border border-teal-400/10 bg-teal-400/[0.04] px-4 py-3 text-sm text-teal-200">
        {update.impact}
      </p>
    )}
    {asArray(update.relatedRoutes).length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {update.relatedRoutes.map((route) => (
          <a
            key={route}
            href={route}
            className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1 text-xs text-slate-500 transition hover:text-teal-300"
          >
            {route}
          </a>
        ))}
      </div>
    )}
  </article>
);

const NewsHubSection = () => (
  <div className="space-y-5">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">
      {siteUpdates.length} update{siteUpdates.length !== 1 ? "s" : ""} · editorially reviewed
    </p>
    <div className="space-y-4">
      {siteUpdates.map((update) => (
        <UpdateCard key={update.id} update={update} />
      ))}
    </div>
  </div>
);

export default NewsHubSection;
