/**
 * Session Management
 *
 * Manages the FastAPI JWT token and device_id for the web client.
 *
 * Strategy:
 *   - Token stored in a cookie (`vs_token`) — readable by both server actions
 *     (via next/headers) and client components (non-HTTP-only so we can read it
 *     on the client for API calls made directly from components).
 *   - device_id stored in localStorage — required by the FastAPI /v1/app/login
 *     contract. Generated once per browser and reused on subsequent logins.
 */

export const TOKEN_COOKIE_NAME = "vs_token";
const DEVICE_ID_STORAGE_KEY = "vs_device_id";

// Cookie options
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const COOKIE_PATH = "/";

// ─── Server-side helpers (Next.js Server Actions / Route Handlers) ────────────

/**
 * Read the JWT token from cookies (server-side).
 * Use in Server Actions and Route Handlers.
 * @returns {Promise<string|null>}
 */
export async function getServerToken() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_COOKIE_NAME)?.value || null;
  } catch {
    return null;
  }
}

/**
 * Store the JWT token in a cookie (server-side).
 * Call this immediately after a successful login in a Server Action.
 * @param {string} token
 */
export async function setServerToken(token) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: false, // Must be readable client-side for direct API calls
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: COOKIE_PATH,
    });
  } catch (err) {
    console.error("[session] Failed to set token cookie:", err);
  }
}

/**
 * Clear the JWT token cookie (server-side).
 * Call this on logout in a Server Action.
 */
export async function clearServerToken() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_COOKIE_NAME);
  } catch (err) {
    console.error("[session] Failed to clear token cookie:", err);
  }
}

// ─── Client-side helpers ──────────────────────────────────────────────────────

/**
 * Read the JWT token from cookies (client-side).
 * Use in Client Components that need to make authenticated API calls directly.
 * @returns {string|null}
 */
export function getClientToken() {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + TOKEN_COOKIE_NAME + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Check if a user is currently authenticated (client-side).
 * @returns {boolean}
 */
export function isAuthenticated() {
  return Boolean(getClientToken());
}

// ─── Device ID ────────────────────────────────────────────────────────────────

/**
 * Get the device_id for this browser, generating one if it doesn't exist.
 * The FastAPI /v1/app/login endpoint requires this field.
 *
 * Falls back to a static string during SSR (device_id is only needed for login,
 * which always happens client-side).
 *
 * @returns {string} UUID device identifier
 */
export function getOrCreateDeviceId() {
  if (typeof window === "undefined") {
    return "ssr-placeholder"; // Never used for actual login calls
  }

  let deviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY);

  if (!deviceId) {
    deviceId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);
  }

  return deviceId;
}
