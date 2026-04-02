# Bolt Performance Journal

## 2025-05-22 - Optimizing Deal Rendering and Hydration
**Learning:** The project used `Math.random()` for UI element selection (CTA copy) in client components, which caused hydration mismatches. Additionally, duplicate hashing logic and missing memoization in core components (`DealCard`, `DealDetail`) were leading to redundant calculations and re-renders. Next.js image optimization was also being bypassed for known external hosts.
**Action:** Centralized hashing logic in `utils/hash.js`, implemented `React.memo` and `useMemo` in `DealCard.jsx` and `DealDetail.jsx`, used deterministic hashing for UI selection, and refined `unoptimized` prop logic to leverage Next.js image optimization for supported hosts.
