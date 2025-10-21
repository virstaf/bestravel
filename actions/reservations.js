"use server";

import { createClient } from "@/lib/supabase/server";

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

export const getUserReservations = async (userId) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error("Error fetching user reservations");
  }
  return data;
};
