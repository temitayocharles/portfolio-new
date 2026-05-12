import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import fallbackContent from "@/content/portfolio-content.json";
import { fetchPortfolioContent } from "@/services/portfolioContent";

const PortfolioContentContext = createContext({
  content: fallbackContent,
  source: "fallback",
  loading: false,
  error: null,
});

const mergeContent = (remoteContent) => {
  if (!remoteContent || typeof remoteContent !== "object" || Array.isArray(remoteContent)) {
    return fallbackContent;
  }

  return {
    ...fallbackContent,
    ...remoteContent,
  };
};

export const PortfolioContentProvider = ({ children }) => {
  const [content, setContent] = useState(fallbackContent);
  const [source, setSource] = useState("fallback");
  const [loading, setLoading] = useState(Boolean(process.env.REACT_APP_BACKEND_URL));
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const remoteContent = await fetchPortfolioContent();
        if (!mounted || !remoteContent) {
          return;
        }

        setContent(mergeContent(remoteContent));
        setSource("api");
        setError(null);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(err);
        setSource("fallback");
        if (process.env.NODE_ENV !== "production") {
          console.warn("Portfolio content API unavailable; using bundled fallback content.", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => ({ content, source, loading, error }), [content, source, loading, error]);

  return (
    <PortfolioContentContext.Provider value={value}>
      {children}
    </PortfolioContentContext.Provider>
  );
};

export const usePortfolioContentState = () => useContext(PortfolioContentContext);

export const usePortfolioContent = () => useContext(PortfolioContentContext).content;
