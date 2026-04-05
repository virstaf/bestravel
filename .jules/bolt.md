## 2025-05-22 - [LCP and Rendering Optimization for Deals]
**Learning:** Using CSS `background-image` for hero sections is a performance anti-pattern in Next.js as it prevents image preloading and optimization. Additionally, `Math.random()` in components causes hydration mismatches and prevents stable memoization.
**Action:** Replace `background-image` with `next/image` and `priority` for hero sections. Use a deterministic `hashCode` from stable IDs to select dynamic UI content to ensure hydration stability and safe `React.memo` usage.
