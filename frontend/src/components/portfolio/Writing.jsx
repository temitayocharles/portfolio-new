import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Clock, ArrowUpRight, Calendar, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { writings as fallbackWritings } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const accentMap = {
  teal: {
    tag: "bg-teal-300/[0.08] text-teal-200 border-teal-300/20",
    icon: "text-teal-300 hover:text-teal-200",
    hover: "hover:border-teal-300/30 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.25)]",
    result: "border-teal-300/20 bg-teal-300/[0.06] text-teal-100",
  },
  amber: {
    tag: "bg-amber-300/[0.08] text-amber-200 border-amber-300/20",
    icon: "text-amber-300 hover:text-amber-200",
    hover: "hover:border-amber-300/30 hover:shadow-[0_0_40px_-12px_rgba(251,191,36,0.22)]",
    result: "border-amber-300/20 bg-amber-300/[0.06] text-amber-100",
  },
};

const Writing = () => {
  const { writings = fallbackWritings } = usePortfolioContent();
  const [selectedNote, setSelectedNote] = useState(null);

  const openNote = (note, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSelectedNote(note);
  };

  return (
    <section id="writing" className="relative py-24 lg:py-32 bg-[#0b1117]">
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="06" title="Writing" />

        <div className="mt-10 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-slate-50 max-w-3xl leading-tight">
            Notes on{" "}
            <span className="text-teal-300">company-grade platforms</span>, reliability, and
            AI-assisted operations.
          </h2>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Practical notes drawn from founder-led platform work, production systems,
            incident reviews, and real operating decisions. No hot takes, no slideware.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true, skipSnaps: false }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {writings.map((w, i) => {
              const a = accentMap[w.accent] || accentMap.teal;
              return (
                <CarouselItem
                  key={w.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article
                    className={`h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-[border-color,box-shadow,background-color] duration-300 ${a.hover}`}
                    style={{ animation: `fade-up 0.55s ease-out ${i * 70}ms both` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] border ${a.tag}`}
                      >
                        <BookOpen className="h-3 w-3" />
                        {w.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        {w.readTime}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg lg:text-[1.2rem] font-semibold text-slate-100 leading-snug tracking-[-0.01em]">
                      {w.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      {w.excerpt}
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {w.date}
                      </span>
                      <button
                        type="button"
                        data-portfolio-action="open-writing-note"
                        aria-haspopup="dialog"
                        aria-label={`Open note: ${w.title}`}
                        onPointerDown={(event) => event.stopPropagation()}
                        onPointerUp={(event) => openNote(w, event)}
                        onClick={(event) => openNote(w, event)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") openNote(w, event);
                        }}
                        className={`group inline-flex min-h-10 items-center gap-1 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm transition-colors hover:border-teal-300/30 hover:bg-teal-300/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 ${a.icon}`}
                      >
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs font-mono text-slate-500">
              /swipe or use arrows
            </p>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-white/[0.04] border-white/10 text-slate-300 hover:bg-teal-300/10 hover:border-teal-300/30 hover:text-teal-200" />
              <CarouselNext className="relative right-0 top-0 translate-y-0 bg-white/[0.04] border-white/10 text-slate-300 hover:bg-teal-300/10 hover:border-teal-300/30 hover:text-teal-200" />
            </div>
          </div>
        </Carousel>
      </div>

      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </section>
  );
};

const NoteModal = ({ note, onClose }) => {
  const a = accentMap[note.accent] || accentMap.teal;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-label="Close note" />
      <div className="relative w-full max-w-2xl max-h-[86vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#081018] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#081018]/95 p-5 sm:p-6 backdrop-blur">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-300">Operator note</div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-50">{note.noteTitle || note.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{note.tag} · {note.readTime} · {note.date}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-400 hover:text-slate-100 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-slate-300 leading-relaxed">{note.noteBody || note.excerpt}</p>
          <div className={`rounded-2xl border p-4 text-sm leading-relaxed ${a.result}`}>
            This note is written from the perspective of a founder and platform operator: the value is not just the tool choice, it is the operating model a company can depend on.
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Writing;
