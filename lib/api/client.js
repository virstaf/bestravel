/**
 * FastAPI HTTP client
 * Central fetch wrapper for all calls to the virstravel FastAPI backend.
 * Returns a consistent { data, error } shape so callers never have to try/catch.
 */

const FASTAPI_BASE =
  process.env.NEXT_PUBLIC_FASTAPI_URL ||
  "https://virstravel-backend.vercel.app";

/**
 * Core request function.
 * @param {string} path - API path (e.g. "/v1/app/me")
 * @param {object} options
 * @param {string} [options.method="GET"]
 * @param {object} [options.body] - Request body (will be JSON-serialised)
 * @param {string} [options.token] - Bearer token for authenticated endpoints
 * @param {number} [options.timeout=15000] - Timeout in milliseconds
 * @returns {Promise<{ data: any, error: string|null }>}
 */
export async function apiRequest(
  path,
  { method = "GET", body, token, timeout = 15000 } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    signal: AbortSignal.timeout(timeout),
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${FASTAPI_BASE}${path}`, config);

    if (!response.ok) {
      const errorPayload = await response
        .json()
        .catch(() => ({ detail: "Request failed" }));
      const message =
        typeof errorPayload.detail === "string"
          ? errorPayload.detail
          : Array.isArray(errorPayload.detail)
            ? errorPayload.detail.map((e) => e.msg).join(", ")
            : "Request failed";
      return { data: null, error: message };
    }

    // Some endpoints return 200 with an empty body
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    return { data, error: null };
  } catch (err) {
    if (err.name === "TimeoutError" || err.name === "AbortError") {
      return { data: null, error: `Request timed out after ${timeout}ms` };
    }
    return { data: null, error: err.message || "Network error" };
  }
}

// ─── Convenience helpers ────────────────────────────────────────────────────

export const apiGet = (path, token, options = {}) =>
  apiRequest(path, { token, ...options });

export const apiPost = (path, body, token, options = {}) =>
  apiRequest(path, { method: "POST", body, token, ...options });

export const apiPut = (path, body, token, options = {}) =>
  apiRequest(path, { method: "PUT", body, token, ...options });

export const apiPatch = (path, body, token, options = {}) =>
  apiRequest(path, { method: "PATCH", body, token, ...options });

export const apiDelete = (path, token, options = {}) =>
  apiRequest(path, { method: "DELETE", token, ...options });
