import React from "react";

const HubNavigation = ({ routeConfig }) => {
  const currentPath = typeof window === "undefined" ? "/" : window.location.pathname;

  return (
    <aside className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600">Hub sections</p>
      <nav className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(routeConfig).map(([path, item]) => {
          const Icon = item.icon;
          const active = path === currentPath;
          return (
            <a
              key={path}
              href={path}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition ${
                active
                  ? "border-stone-400/25 bg-stone-400/[0.07] text-stone-100"
                  : "border-white/[0.06] bg-black/10 text-slate-400 hover:border-stone-400/20 hover:text-stone-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5 flex-none" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default HubNavigation;
