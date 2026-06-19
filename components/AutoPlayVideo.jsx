// components/AutoPlayVideo.jsx
import { memo } from "react";

/**
 * Performance Optimization: AutoPlayVideo
 * Memoized to prevent redundant render cycles when used in frequently
 * updating parent components (like the Testimonials slider).
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
