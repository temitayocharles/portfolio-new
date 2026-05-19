import React from "react";

// Animated SVG network topology: nodes connected by flowing edges.
// Used decoratively behind the About visual. Subtle, not noisy.
const nodes = [
  { id: "gw", x: 80, y: 60, label: "GW", accent: "teal" },
  { id: "api", x: 200, y: 40, label: "API", accent: "teal" },
  { id: "svc", x: 320, y: 80, label: "SVC", accent: "amber" },
  { id: "db", x: 380, y: 190, label: "DB", accent: "teal" },
  { id: "cache", x: 240, y: 210, label: "CACHE", accent: "teal" },
  { id: "worker", x: 110, y: 200, label: "WORKER", accent: "amber" },
  { id: "obs", x: 240, y: 130, label: "OBS", accent: "teal" },
];

const edges = [
  ["gw", "api"], ["api", "svc"], ["svc", "db"], ["svc", "cache"],
  ["api", "worker"], ["worker", "cache"], ["api", "obs"],
  ["svc", "obs"], ["worker", "obs"],
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
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* edges */}
      {edges.map(([a, b], i) => {
        const na = getNode(a);
        const nb = getNode(b);
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
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
            <circle cx={n.x} cy={n.y} r="18" fill="url(#nodeGlow)" />
            <circle
              cx={n.x}
              cy={n.y}
              r="7"
              fill="#0b121b"
              stroke={color}
              strokeWidth="1.5"
            />
            <circle cx={n.x} cy={n.y} r="2.2" fill={color}>
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={n.x}
              y={n.y + 22}
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
