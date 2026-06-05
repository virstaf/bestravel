// components/AutoPlayVideo.jsx
import { memo } from "react";

/**
 * Optimized AutoPlayVideo component with memoization.
 * Expected Impact: Prevents redundant re-renders of the video element, which is
 * especially useful when this component is used inside frequently updating parents
 * like the Testimonials slider.
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
