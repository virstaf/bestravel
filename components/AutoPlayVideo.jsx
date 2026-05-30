import { memo } from "react";

/**
 * Optimized AutoPlayVideo component.
 * Uses React.memo to prevent unnecessary re-renders when the parent (e.g., Testimonials) slider updates.
 * Includes a guard clause to prevent rendering if the source is missing.
 */
const AutoPlayVideo = memo(({ source, style }) => {
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
