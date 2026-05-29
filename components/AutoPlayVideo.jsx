import { memo } from "react";

/**
 * Optimized AutoPlayVideo component with memoization and safety checks.
 * Prevents redundant re-renders when the parent component (like Testimonials)
 * updates its internal state (e.g., slider index) every few seconds.
 * Includes a guard clause to avoid rendering an empty source, which prevents
 * the browser from making redundant network requests.
 */
const AutoPlayVideo = memo(({ source, style }) => {
  // Performance guard: Don't render the video if the source is missing
  // to prevent unnecessary browser network overhead.
  if (!source) return null;

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
