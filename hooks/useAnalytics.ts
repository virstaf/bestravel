"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Hook to automatically track page views on route changes in Next.js App Router.
 * Must be used within a component inside a layout or route.
 */
export const usePageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Create a URL representing the current path
      const url = pathname + searchParams.toString() ? `?${searchParams.toString()}` : "";

      trackEvent("page_view", {
        page_path: url,
        page_title: document.title || pathname,
      });
    }
  }, [pathname, searchParams]);
};
