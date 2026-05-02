import React, { useEffect, useRef, useState } from "react";

// Animated number counter that starts when visible.
// Parses numeric prefix from value string and preserves the suffix (e.g., '99.99%', '$216K+', '2M+').
const parse = (val) => {
  const m = String(val).match(/^([$]?)([\d.]+)(.*)$/);
  if (!m) return { prefix: "", number: null, suffix: val };
  return { prefix: m[1], number: parseFloat(m[2]), suffix: m[3] };
};

const format = (n, decimals) => {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString();
};

const AnimatedStat = ({ value, label, className = "" }) => {
  const { prefix, number, suffix } = parse(value);
  const [display, setDisplay] = useState(number === null ? value : `${prefix}0${suffix}`);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (number === null) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const decimals = (String(number).split(".")[1] || "").length;
            const duration = 1200;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = number * eased;
              setDisplay(`${prefix}${format(current, decimals)}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [number, prefix, suffix]);

  return (
    <div
      ref={ref}
      className={`group rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-teal-300/25 px-4 py-3 transition-colors ${className}`}
    >
      <div className="text-xl font-semibold text-slate-100 font-mono tracking-tight tabular-nums">
        {display}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-1">
        {label}
      </div>
    </div>
  );
};

export default AnimatedStat;
