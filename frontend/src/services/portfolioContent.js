const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const portfolioContentEndpoint = () => {
  const backendUrl = trimTrailingSlash(process.env.REACT_APP_BACKEND_URL || "");
  return backendUrl ? `${backendUrl}/api/content` : null;
};

export const fetchPortfolioContent = async () => {
  const endpoint = portfolioContentEndpoint();
  if (!endpoint) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Portfolio content request failed with status ${response.status}`);
  }

  return response.json();
};
