## 2024-05-20 - [Hydration Mismatch Prevention]
**Learning:** Using `Math.random()` in client components for UI copy (like CTAs) or using `Date.now()` for initial state causes hydration mismatches in Next.js, leading to performance-degrading re-render bailouts and potential UI glitches.
**Action:** Use deterministic hashing (e.g., `hashCode` from a stable ID like `deal.id`) to select dynamic but stable UI content.

## 2024-05-20 - [Memoizing Expensive List Item Calculations]
**Learning:** In list views (like `DealsList`), complex data transformations (sorting price options, calculating discounts) inside the item component (`DealCard`) execute on every parent re-render.
**Action:** Use `useMemo` to wrap expensive calculations and derive UI properties only when the underlying data changes.
