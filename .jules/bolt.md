## 2025-05-14 - [LCP Optimization via Next.js Image Component]
**Learning:** Using CSS `background-image` for hero sections delays Largest Contentful Paint (LCP) because the browser must first download and parse the CSS before it can discover the image. Switching to the Next.js `Image` component with the `priority` prop allows the image to be discovered much earlier in the rendering process (via preload tags) and benefits from automatic image optimization.
**Action:** Always prefer the Next.js `Image` component with `priority` for above-the-fold content over CSS backgrounds.
