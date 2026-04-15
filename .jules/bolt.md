## 2025-05-22 - [LCP and Rendering Optimization for Deals]
**Learning:** Using CSS `background-image` for hero sections is a performance anti-pattern in Next.js as it prevents image preloading and optimization. Additionally, `Math.random()` in components causes hydration mismatches and prevents stable memoization.
**Action:** Replace `background-image` with `next/image` and `priority` for hero sections. Use a deterministic `hashCode` from stable IDs to select dynamic UI content to ensure hydration stability and safe `React.memo` usage.

## 2025-05-23 - [Database-Level Filtering for Server Components]
**Learning:** Performing in-memory filtering and slicing on large datasets in React Server Components (e.g., fetching all deals to show 3 featured ones) is a performance bottleneck. It increases database load, network payload size, and server-side memory consumption.
**Action:** Always move filtering (`is_featured: true`) and limiting (`limit: 3`) logic to the database layer via Server Actions to minimize resource usage and improve TTFB.
