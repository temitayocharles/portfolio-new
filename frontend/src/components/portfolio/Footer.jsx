import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { profile } from "@/mock";

const GithubIcon = ({ className = "" }) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.59 2 12.253c0 4.529 2.865 8.369 6.839 9.725.5.094.683-.222.683-.494 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.374-3.369-1.374-.455-1.185-1.11-1.5-1.11-1.5-.908-.637.069-.624.069-.624 1.004.073 1.532 1.057 1.532 1.057.892 1.565 2.341 1.113 2.91.851.091-.662.35-1.113.636-1.369-2.221-.259-4.555-1.139-4.555-5.068 0-1.12.39-2.035 1.03-2.752-.103-.26-.446-1.303.098-2.715 0 0 .84-.276 2.75 1.052A9.37 9.37 0 0 1 12 6.957a9.37 9.37 0 0 1 2.504.345c1.909-1.328 2.747-1.052 2.747-1.052.546 1.412.203 2.455.1 2.715.64.717 1.028 1.632 1.028 2.752 0 3.939-2.337 4.806-4.566 5.06.359.317.679.944.679 1.902 0 1.372-.012 2.478-.012 2.815 0 .274.18.593.688.493C19.138 20.618 22 16.78 22 12.253 22 6.59 17.523 2 12 2Z" />
  </svg>
);
const LinkedinIcon = ({ className = "" }) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.447-2.136 2.941v5.665H9.353V9h3.414v1.561h.049c.475-.9 1.637-1.85 3.369-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286h-.005ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.556V9h3.558v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);


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

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/5 pt-6 text-xs text-slate-500">
          <a href="/trust-safety" className="hover:text-teal-300">Trust & Safety</a>
          <a href="/privacy-policy" className="hover:text-teal-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-teal-300">Terms</a>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
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
