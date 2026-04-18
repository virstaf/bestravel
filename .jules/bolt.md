## 2025-05-14 - [LCP Optimization via Next.js Image Component]
**Learning:** Using CSS `background-image` for hero sections delays Largest Contentful Paint (LCP) because the browser must first download and parse the CSS before it can discover the image. Switching to the Next.js `Image` component with the `priority` prop allows the image to be discovered much earlier in the rendering process (via preload tags) and benefits from automatic image optimization.
**Action:** Always prefer the Next.js `Image` component with `priority` for above-the-fold content over CSS backgrounds.

## 2026-04-18 - [LCP Optimization for List Views]
**Learning:** For list views (e.g., deal grids), Largest Contentful Paint (LCP) can be significantly improved by passing a `priority` prop to above-the-fold items (e.g., the first row) in the loop. This tells Next.js to preload these critical images, reducing the time to the first meaningful paint.
**Action:** In list rendering loops, use `priority={index < n}` (where `n` is the number of items in the first row) to optimize LCP.
