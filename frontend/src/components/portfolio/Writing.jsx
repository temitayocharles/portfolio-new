import React from "react";
import { BookOpen, Clock, ArrowUpRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { writings } from "@/mock";
import { SectionLabel } from "./About";

const accentMap = {
  teal: {
    tag: "bg-teal-300/[0.08] text-teal-200 border-teal-300/20",
    icon: "text-teal-300",
    hover: "hover:border-teal-300/30 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.25)]",
  },
  amber: {
    tag: "bg-amber-300/[0.08] text-amber-200 border-amber-300/20",
    icon: "text-amber-300",
    hover: "hover:border-amber-300/30 hover:shadow-[0_0_40px_-12px_rgba(251,191,36,0.22)]",
  },
};

const Writing = () => {
  return (
    <section id="writing" className="relative py-24 lg:py-32 bg-[#0b1117]">
      <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="05" title="Writing" />

        <div className="mt-10 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-slate-50 max-w-3xl leading-tight">
            Notes on{" "}
            <span className="text-teal-300">platform engineering</span>, reliability, and
            AI-assisted operations.
          </h2>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Long-form writing drawn from production systems, incident reviews, and real
            platform decisions. No hot takes, no slideware.
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
                    className={`h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-all duration-300 ${a.hover}`}
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
                      <span
                        className={`group inline-flex items-center gap-1 text-sm cursor-pointer ${a.icon}`}
                      >
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
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
    </section>
  );
};

export default Writing;
