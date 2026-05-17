const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const DEFAULT_PORTFOLIO_CONTENT_TIMEOUT_MS = 2500;

export const portfolioContentEndpoint = () => {
  const backendUrl = trimTrailingSlash(process.env.REACT_APP_BACKEND_URL || "");
  return backendUrl ? `${backendUrl}/api/content` : null;
};

export const isValidPortfolioContent = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const requiredSections = [
    "profile",
    "heroStats",
    "aboutParagraphs",
    "aboutHighlights",
    "skillGroups",
    "experiences",
    "projects",
    "projectArchitectures",
    "navLinks",
    "writings",
    "testimonials",
    "heroVisuals",
  ];

  return requiredSections.every((section) => Object.prototype.hasOwnProperty.call(value, section));
};

export const fetchPortfolioContent = async ({ timeoutMs = DEFAULT_PORTFOLIO_CONTENT_TIMEOUT_MS } = {}) => {
  const endpoint = portfolioContentEndpoint();
  if (!endpoint) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Portfolio content request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (!isValidPortfolioContent(payload)) {
      throw new Error("Portfolio content API returned an invalid payload shape");
    }

    return payload;
  } finally {
    clearTimeout(timeout);
  }
};
