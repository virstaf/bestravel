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

export const submitReservation = async ({ type, details, tripId, user }) => {
  // const { resendEmail } = await import("./resendEmail");

  try {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const adminType = "admin-" + type;

    // Send Admin Email
    const { success: emailAdminSuccess, message: adminMessage } =
      await resendEmail(
        {
          email: "info@virstravelclub.com",
          details,
          user: {
            fullname: user.user_metadata.full_name,
            email: user.email,
            userId: user.id,
          },
        },
        adminType
      );

    // Send Member Email
    const { success: emailMemberSuccess, message: memberMessage } =
      await resendEmail(
        {
          fullname: user.user_metadata.full_name || user.email.split("@")[0],
          email: user.email,
          details,
        },
        type
      );

    if (!emailAdminSuccess) {
      console.warn("Admin email failed:", adminMessage);
    }
    if (!emailMemberSuccess) {
      console.warn("Member email failed:", memberMessage);
    }

    const supabase = await createClient();

    // Validate inputs
    if (!tripId) {
      throw new Error("Trip ID is required");
    }

    // Check if trip exists
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("start_date, end_date")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      console.error("Trip verification failed:", tripError);
      throw new Error(
        trip
          ? "Trip not found"
          : `Trip not found: ${tripError?.message || "Unknown error"}`
      );
    }

    const { error: insertError } = await supabase.from("reservations").insert({
      trip_id: tripId,
      user_id: user.id,
      type,
      details,
      start_date: trip.start_date,
      end_date: trip.end_date,
    });

    if (insertError) {
      console.error("Database insertion error:", insertError);
      throw new Error(
        `Reservation failed: ${insertError.message || insertError.details || "Database error"}`
      );
    }

    revalidatePath("/dashboard/reservations");
    return { success: true };
  } catch (error) {
    console.error("Reservation submission fatal error:", error);
    // Return the specific error message to the client
    return {
      success: false,
      message:
        error.message || "An unexpected error occurred. Please try again.",
    };
  }
};
