"use client";
// components/AutoPlayVideo.jsx
import { memo } from "react";

/**
 * AutoPlayVideo Component
 *
 * Wrapped in React.memo to prevent unnecessary re-renders when parent state (like slider index) changes.
 * This is particularly important when used in the Testimonials slider.
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
