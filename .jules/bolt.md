## 2025-05-14 - [LCP Optimization via Next.js Image Component]
**Learning:** Using CSS `background-image` for hero sections delays Largest Contentful Paint (LCP) because the browser must first download and parse the CSS before it can discover the image. Switching to the Next.js `Image` component with the `priority` prop allows the image to be discovered much earlier in the rendering process (via preload tags) and benefits from automatic image optimization.
**Action:** Always prefer the Next.js `Image` component with `priority` for above-the-fold content over CSS backgrounds.

## 2025-05-15 - [LCP and Memoization Optimization for Deal Cards]
**Learning:** For list-based views like a deals grid, LCP can be significantly improved by manually prioritizing the loading of above-the-fold images using the 'priority' prop on the first few items in the map loop. Additionally, deterministic hashing for UI selection (like CTA copy) must handle negative integers from the 'hashCode' function using 'Math.abs()' to avoid invalid array indexing.
**Action:** Always pass 'priority={index < threshold}' to list items that are likely to be in the initial viewport, and use 'Math.abs()' when using hash codes for array indexing.

## 2026-04-18 - [LCP Optimization for List Views]
**Learning:** For list views (e.g., deal grids), Largest Contentful Paint (LCP) can be significantly improved by passing a `priority` prop to above-the-fold items (e.g., the first row) in the loop. This tells Next.js to preload these critical images, reducing the time to the first meaningful paint.
**Action:** In list rendering loops, use `priority={index < n}` (where `n` is the number of items in the first row) to optimize LCP.

## 2025-05-15 - [Deterministic Hashing for Hydration Stability]
**Learning:** Using `Math.random()` or non-deterministic logic for dynamic UI content (like CTA text or skeleton widths) causes hydration mismatches in Next.js. Centralizing deterministic logic based on stable IDs (e.g., deal IDs) ensures consistency between server and client renders.
**Action:** Use a centralized `hashCode` utility for deterministic selection of dynamic content in client components.

## 2025-05-15 - [Centralized Logic for Component Consistency]
**Learning:** Duplicating complex business logic (like price calculations) across multiple components (`DealCard`, `DealDetail`) leads to maintenance overhead and performance inconsistencies. Centralizing this logic into pure utility functions allows for better memoization and smaller component bundles.
**Action:** Move complex calculations to `lib/` utilities and use `useMemo` in components to cache the results.
