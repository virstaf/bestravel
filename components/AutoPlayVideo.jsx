// components/AutoPlayVideo.jsx
import { memo } from "react";

/**
 * AutoPlayVideo component memoized to prevent video restarts or flicker
 * when parent components (like Testimonials slider) re-render.
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
