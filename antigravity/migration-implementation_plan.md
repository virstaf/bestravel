# Supabase A → FastAPI + Supabase B Migration Plan

## Background

The web app (Next.js) currently uses **Supabase A** directly for auth (`GoTrue`) and data. A FastAPI backend (`virstravel-backend.vercel.app`) has been built connecting to **Supabase B** and is already serving the mobile app. This migration makes the web app a pure client of FastAPI — eliminating the Supabase A dependency entirely.

**Target architecture:**
```
[ Web (Next.js) ]        [ Mobile (Expo) ]
          ↓                      ↓
        FastAPI (Auth + Logic)
          ↓
     Supabase B (Postgres)
```

---

## User Review Required

> [!IMPORTANT]
> **Auth strategy chosen: Lazy Migration (Option 1)**
> Users are NOT forced to reset passwords. When a user logs in, FastAPI first checks Supabase B. If not found, it falls back to verifying with Supabase A's REST API, then migrates the user on first successful login. This requires the FastAPI backend to implement the fallback logic — confirm with the backend team if this is already in place or needs to be added.

> [!WARNING]
> **Login schema change**: The FastAPI `/v1/app/login` endpoint requires `device_id` and `device_type` (enum: `WEB` or `MOBILE`) in the request body. The current Supabase login doesn't need these. The web app will send `device_type: "WEB"` and generate/persist a `device_id` (UUID stored in `localStorage`).

> [!CAUTION]
> **User IDs will change**. Supabase A uses GoTrue UUIDs. Supabase B uses FastAPI-generated UUIDs. Existing data relationships (profiles, reservations, quotes, etc.) that reference Supabase A user IDs will be orphaned unless the FastAPI backend implements a migration bridge or ID mapping. Confirm this with the backend team before Phase 3.

> [!NOTE]
> **Subscriptions**: The current web app manages Stripe subscriptions via Next.js API routes. FastAPI has subscription endpoints. We will migrate these to FastAPI as well, and the Stripe webhook handler also needs to move to the FastAPI backend.

---

## Open Questions

> [!IMPORTANT]
> 1. Has the lazy migration login fallback (verifying against Supabase A on first login) been implemented in FastAPI already?
> 2. How is the KYC profile data handled — does `complete-kyc` replace the current Supabase `profiles` table, or is there a separate `profiles` entity?
> 3. Should existing Supabase A `profiles` data (subscription status, plan, customer_id, role) be migrated via script, or re-collected from users on next login?
> 4. Does FastAPI need to handle `is_subscribed`, `plan`, `trial_active` flags? Or does `/v1/app/my_subscription` fully replace the profile-based subscription check?

---

## Migration Phases

The migration is structured in **5 phases**, each independently deployable and reversible until Phase 5.

---

## Phase 1 — Foundation: API Client & Auth Layer

**Goal**: Build the FastAPI client abstraction and session management. No UI changes. Supabase A stays active.

### New Files

#### [NEW] `lib/api/client.js`
Central `fetch` wrapper for all FastAPI calls:
- Base URL from env (`NEXT_PUBLIC_FASTAPI_URL`)
- Attaches `Authorization: Bearer <token>` from session
- Standardized `{ data, error }` response shape
- Handles 401 → trigger logout

#### [NEW] `lib/api/auth.js`
Functions wrapping FastAPI auth endpoints:
```js
registerWithAPI(email, password, phone)     // POST /v1/app/register
loginWithAPI(email, password, deviceId)     // POST /v1/app/login
getMeFromAPI(token)                          // GET /v1/app/me
resetPasswordWithAPI(key, newPass, confirm) // POST /v1/app/forgot_password/reset
changePasswordWithAPI(old, new, confirm)    // PUT /v1/app/change_password
```

#### [NEW] `lib/api/users.js`
```js
completeKYC(kycData)   // POST /v1/app/complete-kyc
updateKYC(kycData)     // PATCH /v1/app/update-kyc
```

#### [NEW] `lib/session.js`
Thin session management:
- Stores JWT in an HTTP-only cookie (`vs_token`) set by a Next.js route handler
- Exports `getToken()`, `setToken(token)`, `clearToken()`
- Generates and persists a `device_id` UUID in `localStorage`

#### [MODIFY] `.env.local`
```env
NEXT_PUBLIC_FASTAPI_URL=https://virstravel-backend.vercel.app
```

---

## Phase 2 — Auth Pages Migration

**Goal**: Swap all `actions/users.js` Supabase auth calls to FastAPI calls.

### Files to Modify

#### [MODIFY] `actions/users.js`
| Current function | New implementation |
|---|---|
| `loginAction` | `loginWithAPI()` + store JWT via `lib/session.js` |
| `signupAction` | `registerWithAPI()` with `channel: "WEB"`, `user_type: "APPUSER"` |
| `logoutAction` | `clearToken()` — no Supabase signout needed |
| `resetPasswordAction` | FastAPI OTP flow (`GET /v1/app/generate_otp/...`) |
| `updatePasswordAction` | `resetPasswordWithAPI()` or `changePasswordWithAPI()` |
| `deleteAccountAction` | `DELETE /v1/app/deregister` |
| `googleAuthAction` | **Deferred** — FastAPI has no OAuth; keep Supabase-based or disable |

#### [MODIFY] `contexts/profile.jsx`
- Replace `getProfileAction` (Supabase) with `getMeFromAPI()` (FastAPI `/v1/app/me`)
- New user shape: `{ id, email, phone, user_type, channel, is_kyc_completed, kyc }`

#### [MODIFY] `lib/supabase/server.js`
- Deprecate `getUser()` — mark callers for replacement in Phase 3

---

## Phase 3 — Data Actions Migration

**Goal**: Replace all Supabase data queries in `actions/` with FastAPI calls.

### Files to Modify

#### [MODIFY] `actions/profiles.js`
- `getProfileAction` → `GET /v1/app/me`
- `updateProfileAction` → `PATCH /v1/app/update-kyc` (map profile fields to KYC schema)

#### [MODIFY] `actions/trips.js`
| Operation | FastAPI Endpoint |
|---|---|
| List trips | `GET /v1/app/trips/trip_by/{user_id}` |
| Create trip | `POST /v1/app/trips/` |
| Update trip | `PUT /v1/app/trips/{trip_id}` |
| Delete trip | `DELETE /v1/app/trips/{trip_id}` |

#### [MODIFY] `actions/reservations.js`
| Operation | FastAPI Endpoint |
|---|---|
| Create | `POST /v1/app/reservations/` |
| List by user | `GET /v1/app/reservations/by_user_id/{user_id}` |
| Update | `PUT /v1/app/reservations/{reservation_id}` |
| Delete | `DELETE /v1/app/reservations/{reservation_id}` |

#### [MODIFY] `actions/quotes.js`
- `POST /v1/app/quotes/`
- `GET /v1/app/quotes/quotes_by/{user_id}`
- `PATCH /v1/app/quotes/{quote_id}/status`

#### [MODIFY] `actions/deals.js`
- `GET /v1/app/deals/grab/all`
- `GET /v1/app/deals/{deal_id}`

#### [MODIFY] `actions/subscription.js`
- `POST /v1/app/new_subscription`
- `GET /v1/app/my_subscription`
- `POST /v1/app/cancel`

#### [MODIFY] `actions/deal-requests.js`
Map to `POST /v1/app/contact_forms/` or `/v1/app/reservations/` as appropriate.

---

## Phase 4 — API Routes & Middleware Migration

**Goal**: Remove/redirect Next.js API routes now handled by FastAPI.

### Route Decisions

| Next.js Route | Action |
|---|---|
| `app/api/auth/` | **Remove** — auth is handled by server actions → FastAPI |
| `app/api/reservation/` | **Remove** — replaced by `actions/reservations.js` |
| `app/api/trips/` | **Remove** — replaced by `actions/trips.js` |
| `app/api/deals/` | **Remove** — replaced by `actions/deals.js` |
| `app/api/subscription/` | **Remove** — replaced by `actions/subscription.js` |
| `app/api/webhooks/` | **Migrate to FastAPI** — Stripe webhook moves to backend |
| `app/api/contact/` | **Migrate** → calls `POST /v1/app/contact_forms/` |
| `app/api/newsletter/` | **Keep** — no FastAPI equivalent yet |
| `app/api/waiting-list/` | **Keep** — no FastAPI equivalent yet |
| `app/api/send-hubspot-email.js` | **Keep** — no FastAPI equivalent yet |

#### [MODIFY] Root `middleware.js`
Replace Supabase session check with JWT validation:
1. Read `vs_token` from cookies
2. Call `GET /v1/app/auth/validate_token` (or decode locally with the JWT secret)
3. Redirect to `/auth/login` if invalid or missing

---

## Phase 5 — Cleanup & Supabase A Retirement

**Goal**: Remove all Supabase A code after 95%+ of users are confirmed migrated.

### Files to Delete / Clean Up
- `lib/supabase/client.js`
- `lib/supabase/server.js`
- `lib/supabase/middleware.js`
- Remove `@supabase/ssr` and `@supabase/supabase-js` from `package.json`
- Remove `NEXT_PUBLIC_SUPABASE_*` and `SUPABASE_*` env vars

### Retirement Steps
1. Confirm 95%+ of users exist in Supabase B (check via backend dashboard)
2. Disable new signups on Supabase A
3. Archive Supabase A database
4. Remove Supabase A environment variables from all deployment configs

---

## New Environment Variables

```env
# Add to .env.local and all deployment configs
NEXT_PUBLIC_FASTAPI_URL=https://virstravel-backend.vercel.app
```

---

## Verification Plan

### Per Phase
| Phase | Verification |
|---|---|
| 1 | `client.js` successfully calls `/v1/app/` and gets a 200 response |
| 2 | Login → JWT stored → `/v1/app/me` returns correct user. Signup creates user in Supabase B. Logout clears token. |
| 3 | Trips, reservations, quotes, deals all load from FastAPI. Data visible in Supabase B. |
| 4 | Removed API routes return 404. Middleware correctly blocks unauthenticated requests. |
| 5 | Full regression — all user flows pass with zero Supabase A calls |

### Key End-to-End Flows to Test
- Login with an **existing Supabase A user** (tests lazy migration path)
- Signup as a **new user** (tests FastAPI-native registration)
- Profile page shows data from `/v1/app/me`
- Deals page loads from FastAPI
- Reservation creation flow end-to-end
- Subscription check via `/v1/app/my_subscription`
