"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { resendEmail } from "./resendEmail";

export const createReservation = async (data) => {
  const supabase = await createClient();
  const { error } = await supabase.from("reservations").insert([data]);
  if (error) {
    throw new Error("Error creating reservation");
  }
};

export const deleteReservation = async (reservationId) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);
  if (error) {
    throw new Error("Error deleting reservation");
  }
};

export const cancelReservation = async (reservationId) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("reservations")
      .update({ status: "cancelled" })
      .eq("id", reservationId);
    if (error) {
      throw error;
    }
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    throw err;
  }
};

export const updateReservation = async (reservationId, data) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("reservations")
    .update(data)
    .eq("id", reservationId);
  if (error) {
    throw new Error("Error updating reservation");
  }
};

export const getReservation = async (res_id) => {
  try {
    const supabase = await createClient();
    const { data, error: resError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", res_id);
    if (resError) throw resError;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserReservations = async (userId) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error("Error fetching user reservations");
  }

  // Calculate current status for each reservation based on dates
  const { getReservationStatus } = await import("@/lib/statusHelpers");
  const reservationsWithStatus = data.map((reservation) => ({
    ...reservation,
    currentStatus: getReservationStatus(reservation),
  }));

  return reservationsWithStatus;
};

export const submitReservation = async ({ type, details, tripId }) => {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be logged in to make a reservation");
    }

    // Verify trip exists
    if (!tripId) {
      throw new Error("Trip ID is required");
    }

    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("start_date, end_date, title")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      throw new Error("Trip not found");
    }

    // 1. Insert reservation into database
    const { error: insertError } = await supabase.from("reservations").insert({
      trip_id: tripId,
      user_id: user.id,
      type,
      details,
      start_date: trip.start_date,
      end_date: trip.end_date,
      status: "pending",
    });

    if (insertError) {
      console.error("Database insertion error:", insertError);
      throw new Error("Failed to save reservation details");
    }

    // 2. Send Email Notification
    const { success: emailSuccess, message: emailMessage } = await resendEmail(
      {
        fullname: user.user_metadata.full_name || user.email.split("@")[0],
        email: user.email,
        details,
        tripName: trip.title,
        reservationType: type,
      },
      "confirm-reservation"
    );

    if (!emailSuccess) {
      console.error("Email sending warning:", emailMessage);
      // We don't throw here strictly, because the reservation IS saved.
      // But we returns a warning status.
      revalidatePath("/dashboard/reservations");
      return {
        success: true,
        warning: "Reservation saved, but confirmation email failed to send.",
      };
    }

    revalidatePath("/dashboard/reservations");
    return { success: true };
  } catch (error) {
    console.error("Reservation submission error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
