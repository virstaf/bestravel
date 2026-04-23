/**
 * FastAPI Auth API
 * Wrappers for all authentication-related FastAPI endpoints.
 *
 * Endpoint reference:
 *   POST /v1/app/register
 *   POST /v1/app/login
 *   GET  /v1/app/me
 *   GET  /v1/app/generate_otp/{app_key}/{request_type}
 *   GET  /v1/app/validate_otp/{request_type}
 *   POST /v1/app/forgot_password/reset
 *   PUT  /v1/app/change_password
 *   DELETE /v1/app/deregister
 */

import { apiGet, apiPost, apiPut, apiDelete } from "./client.js";

// ─── Registration ────────────────────────────────────────────────────────────

/**
 * Register a new user via the FastAPI backend.
 * @param {{ email: string, password: string }} params
 * @returns {Promise<{ data: AppUserResponse|null, error: string|null }>}
 */
export async function registerWithAPI({
  email,
  password,
  phone,  
}) {
  return apiPost("/v1/app/register", {
    email,
    password,
    user_type: "APPUSER",
    channel: "WEB",
    phone,
  });
}

// ─── Login ───────────────────────────────────────────────────────────────────

/**
 * Log in an existing user.
 * device_id is required by the FastAPI contract.
 *
 * @param {{ email: string, password: string, deviceId: string }} params
 * @returns {Promise<{ data: { access_token: string, ... }|null, error: string|null }>}
 */
export async function loginWithAPI({ email, password, deviceId }) {
  return apiPost("/v1/app/login", {
    email,
    password,
    device_id: deviceId,
    device_type: "WEB",
  });
}

// ─── Current User ─────────────────────────────────────────────────────────────

/**
 * Fetch the authenticated user's profile from FastAPI.
 * @param {string} token - Bearer JWT
 * @returns {Promise<{ data: AppUserResponse|null, error: string|null }>}
 */
export async function getMeFromAPI(token) {
  return apiGet("/v1/app/me", token);
}

// ─── Password Reset (OTP flow) ────────────────────────────────────────────────

/**
 * Trigger a password-reset OTP to the given phone number.
 * @param {{ phone: string, appKey?: string }} params
 */
export async function generatePasswordResetOTP({ phone, appKey = "web" }) {
  const encoded = encodeURIComponent(phone);
  return apiGet(
    `/v1/app/generate_otp/${appKey}/PASSWORDRESET?phone_number=${encoded}`
  );
}

/**
 * Validate an OTP code for password reset.
 * @param {{ code: string, phone: string }} params
 */
export async function validatePasswordResetOTP({ code, phone }) {
  const encodedPhone = encodeURIComponent(phone);
  return apiGet(
    `/v1/app/validate_otp/PASSWORDRESET?code=${code}&phone_number=${encodedPhone}`
  );
}

/**
 * Reset password using a validation key returned from OTP validation.
 * @param {{ validationKey: string, newPassword: string, confirmNewPassword: string }} params
 */
export async function resetPasswordWithAPI({
  validationKey,
  newPassword,
  confirmNewPassword,
}) {
  return apiPost("/v1/app/forgot_password/reset", {
    validation_key: validationKey,
    new_password: newPassword,
    confirm_new_password: confirmNewPassword,
  });
}

// ─── Change Password (authenticated) ─────────────────────────────────────────

/**
 * Change password for an authenticated user.
 * @param {{ oldPassword: string, newPassword: string, confirmNewPassword: string }} params
 * @param {string} token - Bearer JWT
 */
export async function changePasswordWithAPI(
  { oldPassword, newPassword, confirmNewPassword },
  token
) {
  return apiPut(
    "/v1/app/change_password",
    {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    },
    token
  );
}

// ─── Account Deletion ─────────────────────────────────────────────────────────

/**
 * Deregister (permanently delete) the authenticated user's account.
 * @param {string} token - Bearer JWT
 */
export async function deregisterWithAPI(token) {
  return apiDelete("/v1/app/deregister", token);
}

// ─── Token Validation ────────────────────────────────────────────────────────

/**
 * Validate a JWT token against the FastAPI backend.
 * Used in Next.js middleware to protect routes.
 * @param {string} token
 */
export async function validateTokenWithAPI(token) {
  return apiGet("/v1/app/auth/validate_token", token);
}
