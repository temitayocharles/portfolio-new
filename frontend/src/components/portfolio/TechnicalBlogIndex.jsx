import React from "react";
import { BookOpen, Clock } from "lucide-react";
import { writings as fallbackWritings } from "@/mock";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { SectionLabel } from "./About";

const asArray = (value) => (Array.isArray(value) ? value : []);

const TechnicalBlogIndex = () => {
  const { writings = fallbackWritings } = usePortfolioContent();
  const posts = asArray(writings).slice(0, 6);

  return (
    <section id="blog-index" className="relative py-20 bg-[#0b0f14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel index="BLOG" title="Technical blog index" />
        <div className="mt-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-50">Readable notes for platform operators and engineering leaders.</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">A compact index of the strongest writing topics already represented on the site: GitOps, FinOps, AIOps, SRE, Kubernetes, and DevSecOps.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {posts.map((post) => (
              <article key={post.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  <BookOpen className="h-3.5 w-3.5" /> {post.category}
                  <span className="inline-flex items-center gap-1 normal-case tracking-normal"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-100">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{post.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalBlogIndex;
