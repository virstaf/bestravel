# Bolt Performance Journal

## 2024-05-20 - [Hydration Mismatch Prevention]
**Learning:** Using `Math.random()` in client components for UI copy (like CTAs) or using `Date.now()` for initial state causes hydration mismatches in Next.js, leading to performance-degrading re-render bailouts and potential UI glitches.
**Action:** Use deterministic hashing (e.g., `hashCode` from a stable ID like `deal.id`) to select dynamic but stable UI content.

## 2024-05-20 - [Memoizing Expensive List Item Calculations]
**Learning:** In list views (like `DealsList`), complex data transformations (sorting price options, calculating discounts) inside the item component (`DealCard`) execute on every parent re-render.
**Action:** Use `useMemo` to wrap expensive calculations and derive UI properties only when the underlying data changes.
## 2025-05-22 - Optimizing Deal Rendering and Hydration
**Learning:** The project used `Math.random()` for UI element selection (CTA copy) in client components, which caused hydration mismatches. Additionally, duplicate hashing logic and missing memoization in core components (`DealCard`, `DealDetail`) were leading to redundant calculations and re-renders. Next.js image optimization was also being bypassed for known external hosts.
**Action:** Centralized hashing logic in `utils/hash.js`, implemented `React.memo` and `useMemo` in `DealCard.jsx` and `DealDetail.jsx`, used deterministic hashing for UI selection, and refined `unoptimized` prop logic to leverage Next.js image optimization for supported hosts.
