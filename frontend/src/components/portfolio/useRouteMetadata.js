import { useEffect } from "react";
import routeMetadata from "@/content/route-metadata.json";

const DEFAULT_TITLE = "Temitayo Charles Akinniranye";

function resolveMetadata(pathname) {
  return routeMetadata.find((item) => item.path === pathname) || null;
}

function ensureDescriptionTag() {
  if (typeof document === "undefined") return null;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  return tag;
}

export default function useRouteMetadata(pathname, overrides = null) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const metadata = overrides || resolveMetadata(pathname);
    const title = metadata?.title || DEFAULT_TITLE;
    const description = metadata?.description || "";

    document.title = title;
    const descriptionTag = ensureDescriptionTag();
    if (descriptionTag && description) {
      descriptionTag.setAttribute("content", description);
    }
  }, [pathname, overrides]);
}
