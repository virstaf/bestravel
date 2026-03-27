"use client";

import { Suspense } from "react";
import { usePageViewTracker } from "@/hooks/useAnalytics";

function AnalyticsTrackerInner() {
  usePageViewTracker();
  return null;
}

export const AnalyticsTracker = () => {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner />
    </Suspense>
  );
};
