import React, { useEffect, useState } from "react";
import { Menu, X, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, profile } from "@/mock";

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


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActive(`#${current}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-[#0a0f14]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
        >
          <span className="h-8 w-8 rounded-md bg-[#171410] border border-stone-600/40 flex items-center justify-center font-mono text-stone-300 font-bold text-sm">
            TC
          </span>
          <span className="hidden sm:block text-slate-200 font-medium tracking-tight">
            {profile.firstName}
            <span className="text-stone-400">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  active === l.href
                    ? "text-stone-200"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Temitayo Charles Akinniranye GitHub profile"
            className="p-2 text-slate-400 hover:text-stone-300 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Temitayo Charles Akinniranye LinkedIn profile"
            className="p-2 text-slate-400 hover:text-stone-300 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <Button
            asChild
            size="sm"
            className="bg-stone-100 hover:bg-stone-50 text-[#0a0f14] font-medium"
          >
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4 mr-1.5" />
              Resume
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-slate-200"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0f14]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left px-3 py-3 text-slate-300 hover:text-stone-200 transition-colors border-b border-white/5"
              >
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open Temitayo Charles Akinniranye GitHub profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:border-stone-400/30 hover:bg-stone-400/[0.08] hover:text-stone-200">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open Temitayo Charles Akinniranye LinkedIn profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:border-stone-400/30 hover:bg-stone-400/[0.08] hover:text-stone-200">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email Temitayo Charles Akinniranye" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200">
                <Mail className="h-5 w-5" />
              </a>
              <Button asChild size="sm" className="ml-auto bg-stone-100 hover:bg-stone-50 text-[#0a0f14]">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 mr-1.5" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
