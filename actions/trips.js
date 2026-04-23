"use server";

/**
 * Trip Actions — Phase 3 Migration
 *
 * All trip operations now route through FastAPI (Supabase B).
 *
 * GET    /v1/app/trips/trip_by/{user_id}  → list user's trips
 * GET    /v1/app/trips/{trip_id}          → single trip
 * POST   /v1/app/trips/                   → create trip
 * PUT    /v1/app/trips/{trip_id}          → update trip
 * DELETE /v1/app/trips/{trip_id}          → delete trip
 */

import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api/client";
import { getServerToken } from "@/lib/session";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getToken() {
  return getServerToken();
}

// ─── Fetch all user trips ──────────────────────────────────────────────────────

export const fetchTrips = async (userId) => {
  try {
    const token = await getToken();
    const { data, error } = await apiGet(
      `/v1/app/trips/trip_by/${userId}`,
      token
    );

    if (error) throw new Error(error);

    // Augment with client-side status calculation (preserved from original)
    const { getTripStatus } = await import("@/lib/statusHelpers");
    return (data || []).map((trip) => ({
      ...trip,
      currentStatus: getTripStatus(trip),
    }));
  } catch (err) {
    console.error("[fetchTrips] Error:", err);
    throw err;
  }
};

// ─── Fetch all trips (admin) ──────────────────────────────────────────────────

export const fetchAllTrips = async () => {
  try {
    const token = await getToken();
    // FastAPI doesn't expose a "get all trips" admin endpoint yet.
    // Keeping this as a stub — update when the endpoint is available.
    console.warn("[fetchAllTrips] No FastAPI endpoint yet for all trips.");
    return { success: true, data: [] };
  } catch (err) {
    console.error("[fetchAllTrips] Error:", err);
    return { success: false, error: err.message, data: [] };
  }
};

// ─── Fetch single trip ────────────────────────────────────────────────────────

export const fetchTrip = async (tripId) => {
  try {
    const token = await getToken();
    const { data, error } = await apiGet(`/v1/app/trips/${tripId}`, token);
    if (error) throw new Error(error);
    return { success: true, data };
  } catch (err) {
    return { success: false, errorMessage: err.message, data: null };
  }
};

// ─── Create trip ──────────────────────────────────────────────────────────────

export const createTrip = async (tripData) => {
  try {
    const token = await getToken();
    const { data, error } = await apiPost("/v1/app/trips/", tripData, token);
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    throw err;
  }
};

// ─── Update trip ──────────────────────────────────────────────────────────────

export const updateTrip = async (tripId, tripData) => {
  try {
    const token = await getToken();
    const { data, error } = await apiPut(
      `/v1/app/trips/${tripId}`,
      tripData,
      token
    );
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    throw err;
  }
};

// ─── Delete trip ──────────────────────────────────────────────────────────────

export const deleteTrip = async (tripId) => {
  try {
    const token = await getToken();
    const { data, error } = await apiDelete(`/v1/app/trips/${tripId}`, token);
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    throw err;
  }
};
