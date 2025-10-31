"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
  return data;
};
