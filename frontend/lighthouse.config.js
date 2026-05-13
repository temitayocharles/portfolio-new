module.exports = {
  ci: {
    collect: {
      staticDistDir: "./build",
      url: ["http://localhost:3000"],
      numberOfRuns: 1,
      startServerCommand: "npx -y serve@14.2.4 -s build -l 3000",
      startServerReadyPattern: "Accepting connections|Local:",
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.75 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
    },
  },
};
