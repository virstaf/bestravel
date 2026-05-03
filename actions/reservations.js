"use server";

/**
 * Reservation Actions — Phase 3 Migration
 *
 * All reservation operations now route through FastAPI (Supabase B).
 *
 * POST   /v1/app/reservations/                        → create reservation
 * GET    /v1/app/reservations/{reservation_id}        → get single reservation
 * GET    /v1/app/reservations/by_user_id/{user_id}    → list user reservations
 * PUT    /v1/app/reservations/{reservation_id}        → update reservation
 * DELETE /v1/app/reservations/{reservation_id}        → delete reservation
 */

import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api/client";
import { getServerToken } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { resendEmail } from "./resendEmail";

// ─── Create Reservation ───────────────────────────────────────────────────────

export const createReservation = async (data) => {
  try {
    const token = await getServerToken();
    const { error } = await apiPost("/v1/app/reservations/", data, token);
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ─── Get Single Reservation ───────────────────────────────────────────────────

export const getReservation = async (reservationId) => {
  try {
    const token = await getServerToken();
    const { data, error } = await apiGet(
      `/v1/app/reservations/${reservationId}`,
      token
    );
    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ─── Get User Reservations ────────────────────────────────────────────────────

export const getUserReservations = async (userId) => {
  try {
    const token = await getServerToken();
    const { data, error } = await apiGet(
      `/v1/app/reservations/by_user_id/${userId}`,
      token
    );
    if (error) return { success: false, data: [], error };

    // Preserve status calculation from original
    const { getReservationStatus } = await import("@/lib/statusHelpers");
    return {
      success: true,
      data: (data || []).map((reservation) => ({
        ...reservation,
        currentStatus: getReservationStatus(reservation),
      })),
    };
  } catch (err) {
    console.error("[getUserReservations] Error:", err);
    return { success: false, data: [], error: err.message };
  }
};

// ─── Update Reservation ───────────────────────────────────────────────────────

export const updateReservation = async (reservationId, data) => {
  try {
    const token = await getServerToken();
    const { error } = await apiPut(
      `/v1/app/reservations/${reservationId}`,
      data,
      token
    );
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ─── Cancel Reservation ───────────────────────────────────────────────────────

export const cancelReservation = async (reservationId) => {
  try {
    const token = await getServerToken();
    const { error } = await apiPut(
      `/v1/app/reservations/${reservationId}`,
      { status: "cancelled" },
      token
    );
    if (error) return { success: false, error };
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ─── Delete Reservation ───────────────────────────────────────────────────────

export const deleteReservation = async (reservationId) => {
  try {
    const token = await getServerToken();
    const { error } = await apiDelete(
      `/v1/app/reservations/${reservationId}`,
      token
    );
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ─── Submit Reservation (full flow) ──────────────────────────────────────────

/**
 * Creates a reservation and sends email notifications.
 * Requires the user's ID and trip details to be passed in.
 */
export const submitReservation = async ({ type, details, tripId, userId, userEmail, userName, tripStartDate, tripEndDate, tripTitle }) => {
  try {
    if (!tripId) throw new Error("Trip ID is required");
    if (!userId) throw new Error("You must be logged in to make a reservation");

    const token = await getServerToken();

    // 1. Create reservation via FastAPI
    const { data: reservation, error: insertError } = await apiPost(
      "/v1/app/reservations/",
      {
        trip_id: tripId,
        user_id: userId,
        type,
        details,
        start_date: tripStartDate || null,
        end_date: tripEndDate || null,
        status: "pending",
      },
      token
    );

    if (insertError) {
      console.error("[submitReservation] FastAPI error:", insertError);
      throw new Error("Failed to save reservation details");
    }

    // 2. Send Email Notification
    const { success: emailSuccess, message: emailMessage } = await resendEmail(
      {
        fullname: userName || userEmail?.split("@")[0] || "Traveller",
        email: userEmail,
        details,
        tripName: tripTitle,
        reservationType: type,
      },
      "confirm-reservation"
    );

    if (!emailSuccess) {
      console.error("[submitReservation] Email warning:", emailMessage);
      revalidatePath("/dashboard/reservations");
      return {
        success: true,
        warning: "Reservation saved, but confirmation email failed to send.",
      };
    }

    revalidatePath("/dashboard/reservations");
    return { success: true };
  } catch (err) {
    console.error("[submitReservation] Error:", err);
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
};
