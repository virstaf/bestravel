/**
 * FastAPI User / KYC API
 * Wrappers for user profile (KYC) endpoints.
 *
 * In the FastAPI backend, the user profile is managed through the KYC system.
 * This replaces the Supabase A `profiles` table.
 *
 * Endpoint reference:
 *   POST  /v1/app/complete-kyc
 *   PATCH /v1/app/update-kyc
 */

import { apiPost, apiPatch } from "./client.js";

// ─── KYC ──────────────────────────────────────────────────────────────────────

/**
 * Complete KYC for a user (first-time profile setup).
 *
 * @param {{
 *   title: string,
 *   first_name: string,
 *   other_name: string,
 *   last_name: string,
 *   national_id_front_url: string,
 *   national_id_back_url: string,
 *   head_shot_url: string,
 *   date_of_birth: string,       // ISO datetime
 *   residence_region: string,
 *   residence_town: string,
 *   post_gps_address: string,
 * }} kycData
 * @param {string} token - Bearer JWT
 * @returns {Promise<{ data: AppUserResponse|null, error: string|null }>}
 */
export async function completeKYC(kycData, token) {
  console.log("completeKYC", kycData);
  return apiPost("/v1/app/complete-kyc", kycData, token);
}

/**
 * Update an existing KYC record.
 * All fields are optional — send only what changed.
 *
 * @param {Partial<KYCData>} kycData
 * @param {string} token - Bearer JWT
 * @returns {Promise<{ data: CustomerKYCBase|null, error: string|null }>}
 */
export async function updateKYC(kycData, token) {
  return apiPatch("/v1/app/update-kyc", kycData, token);
}
