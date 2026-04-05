## 2025-05-15 - Deterministic Hashing & Memoization
**Learning:** Using `Math.random()` in React client components that are also SSR'd causes hydration mismatches, leading to layout shifts and performance penalties during hydration. Replacing it with deterministic hashing from stable IDs ensures consistency and improves stability.
**Action:** Always use deterministic selection for dynamic UI content based on item IDs in client components to prevent hydration mismatches.
