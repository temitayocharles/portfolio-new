import React from "react";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials as fallbackTestimonials } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const accentMap = {
  teal: {
    avatar: "bg-stone-400/12 text-stone-200 border-stone-400/28",
    border: "hover:border-stone-400/22",
    icon: "text-stone-400/55",
  },
  amber: {
    avatar: "bg-amber-300/15 text-amber-200 border-amber-300/30",
    border: "hover:border-amber-300/30",
    icon: "text-amber-300/60",
  },
};

const Testimonials = () => {
  const { testimonials = fallbackTestimonials } = usePortfolioContent();
  return (
    <section id="testimonials" className="relative overflow-x-clip py-24 lg:py-32">

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="06" title="Testimonials" />

        <div className="mt-10 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-slate-50 max-w-3xl leading-tight">
            Trusted by{" "}
            <span className="text-stone-300">engineering leaders</span> shipping
            production-grade platforms.
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span className="font-mono text-xs text-slate-400">
              5.0 / 50+ engagements
            </span>
          </div>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => {
              const a = accentMap[t.accent] || accentMap.teal;
              return (
                <CarouselItem
                  key={t.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article
                    className={`h-full relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-colors ${a.border}`}
                    style={{ animation: `fade-up 0.55s ease-out ${i * 60}ms both` }}
                  >
                    <Quote className={`h-7 w-7 ${a.icon} mb-4`} />

                    <p className="text-[15px] text-slate-300 leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full border flex items-center justify-center font-mono text-sm font-medium ${a.avatar}`}
                      >
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-100 truncate">
                          {t.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs font-mono text-slate-500">
              /{testimonials.length} engagement stories
            </p>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-white/[0.04] border-white/10 text-slate-300 hover:bg-stone-400/[0.08] hover:border-stone-400/22 hover:text-stone-200" />
              <CarouselNext className="relative right-0 top-0 translate-y-0 bg-white/[0.04] border-white/10 text-slate-300 hover:bg-stone-400/[0.08] hover:border-stone-400/22 hover:text-stone-200" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
