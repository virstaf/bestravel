## 2025-05-14 - [LCP Optimization via Next.js Image Component]

**Learning:** Using CSS `background-image` for hero sections delays Largest Contentful Paint (LCP) because the browser must first download and parse the CSS before it can discover the image. Switching to the Next.js `Image` component with the `priority` prop allows the image to be discovered much earlier in the rendering process (via preload tags) and benefits from automatic image optimization.
**Action:** Always prefer the Next.js `Image` component with `priority` for above-the-fold content over CSS backgrounds.

## 2025-05-15 - [LCP and Memoization Optimization for Deal Cards]

**Learning:** For list-based views like a deals grid, LCP can be significantly improved by manually prioritizing the loading of above-the-fold images using the 'priority' prop on the first few items in the map loop. Additionally, deterministic hashing for UI selection (like CTA copy) must handle negative integers from the 'hashCode' function using 'Math.abs()' to avoid invalid array indexing.
**Action:** Always pass 'priority={index < threshold}' to list items that are likely to be in the initial viewport, and use 'Math.abs()' when using hash codes for array indexing.

## 2026-04-18 - [LCP Optimization for List Views]

**Learning:** For list views (e.g., deal grids), Largest Contentful Paint (LCP) can be significantly improved by passing a `priority` prop to above-the-fold items (e.g., the first row) in the loop. This tells Next.js to preload these critical images, reducing the time to the first meaningful paint.
**Action:** In list rendering loops, use `priority={index < n}` (where `n` is the number of items in the first row) to optimize LCP.

## 2025-05-15 - [Deterministic Hashing for Hydration Stability]

**Learning:** Using `Math.random()` or non-deterministic logic for dynamic UI content (like CTA text or skeleton widths) causes hydration mismatches in Next.js. Centralizing deterministic logic based on stable IDs (e.g., deal IDs) ensures consistency between server and client renders.
**Action:** Use a centralized `hashCode` utility for deterministic selection of dynamic content in client components.

## 2025-05-15 - [Centralized Logic for Component Consistency]

**Learning:** Duplicating complex business logic (like price calculations) across multiple components (`DealCard`, `DealDetail`) leads to maintenance overhead and performance inconsistencies. Centralizing this logic into pure utility functions allows for better memoization and smaller component bundles.
**Action:** Move complex calculations to `lib/` utilities and use `useMemo` in components to cache the results.

## 2025-05-16 - [Consolidating Global State Fetching]

**Learning:** Redundant client-side fetches for global data (like user profiles) across common components (`NavBar`, `UserProfile`) create unnecessary server load and can cause UI flickering or inconsistent states during navigation. Centralizing this data fetching in a high-level React Context ensures a single source of truth and eliminates duplicate network requests.
**Action:** Use shared contexts to manage global state and ensure common UI components consume this state rather than fetching it independently.

## 2026-04-28 - [Log Hygiene in PRs]

**Learning:** Including runtime logs like `dev_server.log` in a PR can be misinterpreted as faking performance data and adds unnecessary noise to the codebase. It is critical to verify `git status` and unstage any accidental log modifications before submission.
**Action:** Always run `git restore --staged <log_file>` before committing if a local process modified a log file.

## 2025-05-16 - [Consolidating Profile Fetching for Network Efficiency]

**Learning:** In applications with multiple persistent UI elements (Navbar, Sidebar, etc.) that require user state, decentralized data fetching leads to redundant network requests and potential hydration flickering. Centralizing user state in a React Context and exposing it via a hook reduces the number of initial API calls to one, improving perceived performance and reducing server load.
**Action:** Use a single `ProfileContext` to manage user state and consume it in all client components that require user data.

## 2025-05-17 - [Module Resolution in Node.js Test Runner]

**Learning:** When running unit tests with `node --test` in a project that uses ES modules but doesn't have `"type": "module"` in `package.json` (or even when it does), internal imports between library files often require explicit file extensions (e.g., `.js`) to be resolved correctly by the Node.js native ESM loader. Omitting these extensions leads to `ERR_MODULE_NOT_FOUND` errors that don't occur in the Next.js/Webpack build process.
**Action:** Always include the `.js` extension in relative imports within `lib/` or other non-component utility files to ensure compatibility with the native Node.js test runner.
