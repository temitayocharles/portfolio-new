import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import siteUpdates from "@/content/site-updates.json";
import portfolioContent from "@/content/portfolio-content.json";

const asArray = (value) => (Array.isArray(value) ? value : []);

const configByType = {
  news: {
    backHref: "/news",
    backLabel: "Back to news",
    label: "Update detail",
  },
  writing: {
    backHref: "/writing",
    backLabel: "Back to writing",
    label: "Editorial detail",
  },
};

function getNewsEntry(id) {
  return asArray(siteUpdates).find((item) => item.id === id) || null;
}

function getWritingEntry(id) {
  return asArray(portfolioContent.writings).find((item) => item.id === id) || null;
}

function normalizeNewsDetail(item) {
  return {
    typeLabel: item.category,
    date: item.date,
    title: item.title,
    summary: item.summary,
    detailSummary: item.detailSummary || item.impact || item.summary,
    bodySections: asArray(item.bodySections),
    takeaways: asArray(item.takeaways),
    relatedLinks: asArray(item.relatedLinks),
    safetyNote:
      item.safetyNote ||
      "Public-safe publication: this update summarizes capability progress without exposing private implementation detail.",
  };
}

function normalizeWritingDetail(item) {
  return {
    typeLabel: item.tag || "Writing",
    date: item.date,
    title: item.title,
    summary: item.excerpt || item.summary || "",
    detailSummary: item.detailSummary || item.noteBody || item.excerpt || "",
    bodySections: asArray(item.bodySections),
    takeaways: asArray(item.takeaways),
    relatedLinks: asArray(item.relatedLinks),
    safetyNote:
      item.safetyNote ||
      "Editorial note: this page intentionally stays public-safe and avoids private operational details.",
  };
}

const EditorialDetailPage = ({ type, entryId }) => {
  const config = configByType[type] || configByType.news;

  const rawEntry = type === "writing" ? getWritingEntry(entryId) : getNewsEntry(entryId);
  const detail = rawEntry
    ? type === "writing"
      ? normalizeWritingDetail(rawEntry)
      : normalizeNewsDetail(rawEntry)
    : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [type, entryId]);

  if (!detail) {
    return (
      <div className="min-h-screen bg-[#0a0f14] text-slate-100">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-32 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Content not found</p>
          <h1 className="mt-6 text-4xl font-semibold text-white">This detail page is not available.</h1>
          <p className="mt-4 text-slate-400">The requested entry may have moved or was never published.</p>
          <a
            href={config.backHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-teal-300/30 hover:text-teal-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {config.backLabel}
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f14] text-slate-100">
      <Navbar />
      <main className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <a
            href={config.backHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-teal-300/30 hover:text-teal-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {config.backLabel}
          </a>

          <article className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border border-teal-400/20 bg-teal-400/[0.06] px-3 py-1 font-mono uppercase tracking-[0.15em] text-teal-200">
                {config.label}
              </span>
              <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 font-mono uppercase tracking-[0.15em] text-slate-400">
                {detail.typeLabel}
              </span>
              {detail.date && <time className="font-mono text-slate-500">{detail.date}</time>}
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">{detail.title}</h1>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{detail.summary}</p>

            {detail.detailSummary && (
              <section className="mt-8 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">Context</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{detail.detailSummary}</p>
              </section>
            )}

            {detail.bodySections.length > 0 && (
              <section className="mt-8 space-y-4">
                {detail.bodySections.map((section, index) => (
                  <article key={`${section.title || "section"}-${index}`} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    {section.title && (
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">{section.title}</h3>
                    )}
                    {section.body && <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>}
                  </article>
                ))}
              </section>
            )}

            {detail.takeaways.length > 0 && (
              <section className="mt-8 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-5">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-amber-300">Key takeaways</h2>
                <ul className="mt-3 space-y-2">
                  {detail.takeaways.map((item) => (
                    <li key={item} className="text-sm leading-7 text-slate-300">• {item}</li>
                  ))}
                </ul>
              </section>
            )}

            {detail.relatedLinks.length > 0 && (
              <section className="mt-8 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">Related routes</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {detail.relatedLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-slate-300 hover:border-teal-300/30 hover:text-teal-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            )}

            <p className="mt-8 rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-xs text-slate-500">
              {detail.safetyNote}
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditorialDetailPage;
