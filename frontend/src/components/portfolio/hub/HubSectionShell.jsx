import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/portfolio/Footer";
import HubNavigation from "./HubNavigation";
import { ACCENT } from "./HubDesignTokens";

const HubSectionShell = ({ page, routeConfig, children }) => {
  const Icon = page.icon;
  const a = ACCENT[page.accent] || ACCENT.teal;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page.label]);

  return (
    <main className="min-h-screen bg-[#0a0f14] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/[0.05] px-6 py-12 lg:px-10 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400 transition hover:border-teal-400/30 hover:text-teal-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] ${a.border} ${a.bg} ${a.text}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {page.eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-[1.75] text-slate-300 md:text-lg">
                {page.description}
              </p>
            </div>
            <HubNavigation routeConfig={routeConfig} />
          </div>
        </div>
      </section>
      <section className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
      <Footer />
    </main>
  );
};

export default HubSectionShell;
