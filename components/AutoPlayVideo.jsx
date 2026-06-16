import { memo } from "react";

/**
 * AutoPlayVideo component for rendering loop videos.
 * Wrapped in memo to prevent unnecessary re-renders when parent state (like Testimonials slider) changes.
 */
const AutoPlayVideo = memo(({ source, style }) => {
  // console.log("Rendering AutoPlayVideo");
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
