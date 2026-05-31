import { memo } from "react";

/**
 * AutoPlayVideo component optimized with React.memo to prevent redundant re-renders
 * during Testimonials slider updates.
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
