const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const portfolioContentEndpoint = () => {
  const backendUrl = trimTrailingSlash(process.env.REACT_APP_BACKEND_URL || "");
  return backendUrl ? `${backendUrl}/api/content` : null;
};

const FETCH_TIMEOUT_MS = 5000;

export const fetchPortfolioContent = async () => {
  const endpoint = portfolioContentEndpoint();
  if (!endpoint) {
    return null;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Portfolio content request failed with status ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timer);
  }
};
