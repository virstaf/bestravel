# Pre-Migration Auth Flow Analysis & Seamless Strategy

To ensure we don't break existing users, it's critical we understand exactly how the app's session management worked before we touched it, and where the friction points are in our new hybrid approach.

## 1. How Auth/Session Worked Originally (Supabase A)

Before we introduced FastAPI, the authentication lifecycle was entirely managed by the `@supabase/ssr` package:

1. **Login**: `signInWithPassword` securely verified credentials.
2. **Session Storage**: Supabase automatically generated an HTTP-only cookie (`sb-[project-ref]-auth-token`).
3. **Server Validation**: The `lib/supabase/server.js` client automatically read this cookie on every Server Action and Server Component to authenticate the user.
4. **Hydration**: The `ProfileProvider` (in `contexts/profile.jsx`) called `getProfileAction()` on mount. This server action fetched the `profiles` table and hydrated the React context.
5. **Security**: The JWT was natively handled by Supabase. You never had to manually pass tokens to data fetches because `createClient()` injected the headers automatically.

## 2. The Problem with the Current "Lazy Migration"

In Phase 2, we introduced `vs_token` (the FastAPI JWT) managed by `lib/session.js`. Our fallback logic says: *"If FastAPI login fails, try Supabase A. If Supabase A succeeds, let them in."*

**The Friction Point:**
If an existing user logs in via the Supabase fallback, they get a Supabase cookie, but **they do not get a FastAPI `vs_token`**. 
Since we migrated all data actions (trips, reservations, quotes) to hit FastAPI in Phase 3, this legacy user will see empty data or permission errors because FastAPI doesn't know who they are (they have no FastAPI token).

## 3. The "Seamless" Auth Flow (Proposed Architecture)

To make the transition completely invisible to the user, we need to actively bridge the two systems during the login action, rather than just passively falling back.

Here is how we should improve `loginAction` to guarantee every user ends up with a FastAPI token:

### The "Auto-Sync" Login Strategy
When a user submits their email and password:
1. **Try FastAPI Login**: Attempt to get the `vs_token`. If successful, great! Proceed as normal.
2. **Fallback to Supabase A**: If FastAPI fails (user not found), attempt login via Supabase A using the provided email and password.
3. **The Bridge (NEW)**: If Supabase A succeeds, it means this is a valid legacy user that FastAPI doesn't know about yet. 
   - *Since we currently hold their plain-text password from the login form*, we can **silently register them to FastAPI in the background** (`registerWithAPI`).
   - Immediately after registering them, we call FastAPI login again to get their `vs_token`.
4. **Result**: The legacy user is seamlessly migrated to Supabase B on their first login, receives a FastAPI JWT, and can immediately interact with the new data endpoints without ever knowing they were migrated.

### Context Hydration Improvements
In the original `contexts/profile.jsx`, there was commented-out code attempting to cache the profile in `localStorage` with `CryptoJS` to prevent flashing loading states. 
Instead of complex encryption, we can implement seamless state hydration by:
1. Passing the initial `profile` data directly from the server to the `ProfileProvider` inside the `layout.jsx`. 
2. This eliminates the client-side loading spinner entirely.

---

### Do you approve this "Auto-Sync" login strategy?
If approved, I will rewrite `actions/users.js` to implement the silent background registration for legacy users, ensuring everyone gets a FastAPI token.
