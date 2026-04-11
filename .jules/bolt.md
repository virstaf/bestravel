## 2025-05-22 - [LCP and Rendering Optimization for Deals]
**Learning:** Using CSS `background-image` for hero sections is a performance anti-pattern in Next.js as it prevents image preloading and optimization. Additionally, `Math.random()` in components causes hydration mismatches and prevents stable memoization.
**Action:** Replace `background-image` with `next/image` and `priority` for hero sections. Use a deterministic `hashCode` from stable IDs to select dynamic UI content to ensure hydration stability and safe `React.memo` usage.

## 2026-04-11 - [Memoization and Selective Image Optimization]
**Learning:** Memoizing derived UI values and price calculations in complex client components (like `DealDetail`) significantly reduces JavaScript execution time during re-renders. Furthermore, Next.js image optimization should only be bypassed for truly unknown external hosts; whitelisting specific high-performance CDN hosts (Supabase, Unsplash) in the `unoptimized` logic allows for better payload efficiency.
**Action:** Implement `useMemo` for derived state and `React.memo` for component-level memoization. Use a whitelist helper to conditionally enable Next.js image optimization for known remote patterns.
