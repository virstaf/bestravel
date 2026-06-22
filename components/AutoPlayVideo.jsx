"use client";

import { memo } from "react";

/**
 * Optimized AutoPlayVideo component.
 * Performance: Memoized to prevent redundant re-renders during state updates
 * like the Testimonials slider interval.
 */
const AutoPlayVideo = memo(({ source, style }) => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={style}
      style={{ width: "100%", height: "auto" }}
    >
      <source src={source} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

AutoPlayVideo.displayName = "AutoPlayVideo";

export default AutoPlayVideo;
