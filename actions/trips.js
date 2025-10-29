"use server";

import { createClient } from "@/lib/supabase/server";

export const fetchAllTrips = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("trips").select("*");
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching all trips:", err);
    return { success: false, error: err.message, data: [] };
  }
};

export const fetchTrips = async (userId) => {
  try {
    // console.log(`Server action trips for user::: ${userId}`);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: true });

    if (error) throw error;
    // console.log("Fetched trips:::", data);
    return data || [];
  } catch (err) {
    console.error("Error fetching trips:::", err);
    throw err;
  }
};

export const fetchTrip = async (tripId) => {
  try {
    const supabase = createClient();

    const response = (await supabase)
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    const { data, error } = await response;

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    return { success: false, errorMessage: err, data: null };
  }
};

export const createTrip = async (tripData) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .insert(tripData)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
};

export const updateTrip = async (tripId, tripData) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .update(tripData)
      .eq("id", tripId)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteTrip = async (tripId) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .delete()
      .eq("id", tripId)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
};
