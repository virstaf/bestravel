## 2024-05-20 - [Hydration Mismatch Prevention]
**Learning:** Using `Math.random()` in client components for UI copy (like CTAs) or using `Date.now()` for initial state causes hydration mismatches in Next.js, leading to performance-degrading re-render bailouts and potential UI glitches.
**Action:** Use deterministic hashing (e.g., `hashCode` from a stable ID like `deal.id`) to select dynamic but stable UI content.

## 2024-05-20 - [Memoizing Expensive List Item Calculations]
**Learning:** In list views (like `DealsList`), complex data transformations (sorting price options, calculating discounts) inside the item component (`DealCard`) execute on every parent re-render.
**Action:** Use `useMemo` to wrap expensive calculations and derive UI properties only when the underlying data changes.
## 2024-04-03 - Hydration Stability and Component Memoization
**Learning:** Using `Math.random()` for UI content (like CTA copy) in Next.js causes hydration mismatches, which triggers slower full-page re-renders on the client. Deterministic hashing of stable IDs (like deal IDs) is a better pattern for selecting dynamic content while maintaining SSR compatibility.
**Action:** Always use deterministic hashing or stable indexes for selecting random-looking UI variants in client components to ensure hydration stability.
