## 2024-05-20 - Deterministic ID Hashing for Hydration Stability
**Learning:** Using `Math.random()` for dynamic content (like CTA copy) in client components that are also SSR'd causes hydration mismatches, which triggers full re-renders and can lead to UI flickering or incorrect content.
**Action:** Always use a deterministic hashing function based on a stable ID (e.g., `deal.id`) to select dynamic content in components that undergo SSR.

## 2024-05-20 - Selective Image Optimization for Remote Hosts
**Learning:** Setting `unoptimized={true}` on the Next.js `Image` component for all external URLs bypasses valuable optimization features (resizing, format conversion) for hosts already configured in `next.config.mjs`.
**Action:** Refine the `unoptimized` prop logic to only bypass optimization for unknown external hosts, while allowing Next.js to handle pre-configured domains like Unsplash and Supabase.
