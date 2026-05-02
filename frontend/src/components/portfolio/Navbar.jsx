import React, { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, profile } from "@/mock";

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
          <span className="h-8 w-8 rounded-md bg-gradient-to-br from-teal-300 to-teal-500/70 flex items-center justify-center font-mono text-[#0a0f14] font-bold text-sm shadow-[0_0_20px_-4px] shadow-teal-400/40">
            TC
          </span>
          <span className="hidden sm:block text-slate-200 font-medium tracking-tight">
            {profile.firstName}
            <span className="text-teal-300">.</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  active === l.href
                    ? "text-teal-300"
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
            aria-label="GitHub"
            className="p-2 text-slate-400 hover:text-teal-300 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2 text-slate-400 hover:text-teal-300 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Button
            asChild
            size="sm"
            className="bg-teal-300 hover:bg-teal-200 text-[#0a0f14] font-medium shadow-[0_0_24px_-6px] shadow-teal-400/40"
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
          aria-label="Toggle menu"
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
                className="text-left px-3 py-3 text-slate-300 hover:text-teal-300 transition-colors border-b border-white/5"
              >
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-teal-300">
                <Github className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-teal-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${profile.email}`} className="p-2 text-slate-400 hover:text-teal-300">
                <Mail className="h-5 w-5" />
              </a>
              <Button asChild size="sm" className="ml-auto bg-teal-300 hover:bg-teal-200 text-[#0a0f14]">
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
