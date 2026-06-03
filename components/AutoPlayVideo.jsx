// components/AutoPlayVideo.jsx

import { memo } from "react";

/**
 * Optimized AutoPlayVideo component.
 * Wrapped in React.memo to prevent unnecessary re-renders when the parent (e.g. Testimonials)
 * state changes, as the video source is typically static.
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
