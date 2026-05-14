import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { profile } from "@/mock";

const GithubIcon = ({ className = "" }) => <span className={className} aria-hidden="true">GH</span>;
const LinkedinIcon = ({ className = "" }) => <span className={className} aria-hidden="true">IN</span>;


const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 bg-[#080c11]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-md bg-gradient-to-br from-teal-300 to-teal-500/70 flex items-center justify-center font-mono text-[#0a0f14] font-bold text-sm">
                TC
              </span>
              <span className="text-slate-200 font-medium">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-xs leading-relaxed">
              Building reliable cloud platforms, secure automation, and
              AI-ready infrastructure.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-mono">
              Connect
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email Temitayo Charles Akinniranye"
                  className="text-slate-300 hover:text-teal-300 transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Temitayo Charles Akinniranye LinkedIn profile"
                  title="LinkedIn"
                  className="text-slate-300 hover:text-teal-300 transition-colors inline-flex items-center gap-2"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Temitayo Charles Akinniranye GitHub profile"
                  title="GitHub"
                  className="text-slate-300 hover:text-teal-300 transition-colors inline-flex items-center gap-2"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-mono">
              Focus areas
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-400">
              <li>Kubernetes</li>
              <li>GitOps</li>
              <li>AWS</li>
              <li>Terraform</li>
              <li>DevSecOps</li>
              <li>Observability</li>
              <li>SRE</li>
              <li>AIOps</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-xs text-slate-500 font-mono">
            © {year} {profile.name}. Crafted with discipline and a strong CI pipeline.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-teal-300 transition-colors"
              aria-label="Open Temitayo Charles Akinniranye GitHub profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-teal-300 transition-colors"
              aria-label="Open Temitayo Charles Akinniranye LinkedIn profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/10 text-slate-300 hover:text-teal-300 hover:border-teal-300/30 transition-colors text-xs font-mono"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
