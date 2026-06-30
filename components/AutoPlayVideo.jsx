"use client";

import { memo } from "react";

/**
 * Optimized AutoPlayVideo component.
 * Memoized to prevent redundant re-renders when parent state (like slider index) changes.
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
