import React from "react";
import { ACCENT } from "./HubDesignTokens";

export const Tag = ({ children, accent = "teal" }) => {
  const a = ACCENT[accent] || ACCENT.teal;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${a.border} ${a.bg} ${a.text}`}
    >
      {children}
    </span>
  );
};

export const SignalPill = ({ children }) => (
  <span className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-xs text-slate-400">
    {children}
  </span>
);

export const MaturityBadge = ({ status, accent }) => {
  const a = ACCENT[accent] || ACCENT.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${a.border} ${a.bg} ${a.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
      {status}
    </span>
  );
};

export const SectionHeader = ({ icon: Icon, label, description, accent = "teal" }) => {
  const a = ACCENT[accent] || ACCENT.teal;
  return (
    <div className="flex items-start gap-4 border-b border-white/[0.06] pb-6">
      {Icon && (
        <span
          className={`mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl border ${a.border} ${a.bg} ${a.text}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      )}
      <div>
        <h2 className="text-lg font-semibold text-white">{label}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
};
