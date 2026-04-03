## 2024-04-03 - Hydration Stability and Component Memoization
**Learning:** Using `Math.random()` for UI content (like CTA copy) in Next.js causes hydration mismatches, which triggers slower full-page re-renders on the client. Deterministic hashing of stable IDs (like deal IDs) is a better pattern for selecting dynamic content while maintaining SSR compatibility.
**Action:** Always use deterministic hashing or stable indexes for selecting random-looking UI variants in client components to ensure hydration stability.
