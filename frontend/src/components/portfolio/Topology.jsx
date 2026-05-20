import React from "react";

// Decorative SVG topology in About section — uses actual InfraForge component names
const nodes = [
  { id: "envoy",   x: 80,  y: 60,  label: "ENVOY",   accent: "teal"  },
  { id: "argocd",  x: 200, y: 40,  label: "ARGOCD",  accent: "teal"  },
  { id: "vault",   x: 320, y: 80,  label: "VAULT",   accent: "amber" },
  { id: "longhorn",x: 380, y: 190, label: "LONGHORN", accent: "teal"  },
  { id: "harbor",  x: 240, y: 210, label: "HARBOR",  accent: "teal"  },
  { id: "eso",     x: 110, y: 200, label: "ESO",     accent: "amber" },
  { id: "prom",    x: 240, y: 130, label: "PROM",    accent: "teal"  },
];

const edges = [
  ["envoy", "argocd"], ["argocd", "vault"], ["vault", "longhorn"], ["vault", "harbor"],
  ["argocd", "eso"], ["eso", "harbor"], ["argocd", "prom"],
  ["vault", "prom"], ["eso", "prom"],
];

const getNode = (id) => nodes.find((n) => n.id === id);

const Topology = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 460 260"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* edges */}
      {edges.map(([a, b]) => {
        const na = getNode(a);
        const nb = getNode(b);
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              stroke="url(#edgeGrad)"
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n) => {
        const color = n.accent === "amber" ? "#fbbf24" : "#5eead4";
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="7" fill="#0b121b" stroke={color} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="2.2" fill={color} opacity="0.7" />
            <text
              x={n.x} y={n.y + 22}
              textAnchor="middle"
              fontSize="8"
              fontFamily="'Geist Mono', monospace"
              fill="#64748b"
              letterSpacing="1"
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default Topology;
