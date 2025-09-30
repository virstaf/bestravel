"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";

export const getTripById = async (id) => {
  try {
    const adminClient = await createAdminClient();
    const { data, error } = await adminClient
      .from("trips")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching trip by ID:", error);
    throw error;
  }
};

export const getAllTrips = async () => {
  try {
    const adminClient = await createAdminClient();
    const { data, error } = await adminClient.from("trips").select("*");

    if (error) {
      console.error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching all trips:", error);
    throw error;
  }
};

export const createTrip = async (tripData) => {
  try {
    const adminClient = await createAdminClient();
    const { data, error } = await adminClient
      .from("trips")
      .insert(tripData)
      .select("*");

    if (error) {
      console.error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error creating trip:", error);
    throw error;
  }
};

export const updateTrip = async (id, tripData) => {
  try {
    const adminClient = await createAdminClient();
    const { data, error } = await adminClient
      .from("trips")
      .update(tripData)
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Error updating trip:", error);
    }

    return data;
  } catch (error) {
    console.error("Error updating trip:", error);
    throw error;
  }
};

export const deleteTrip = async (id) => {
  try {
    const adminClient = await createAdminClient();
    const { data, error } = await adminClient
      .from("trips")
      .delete()
      .eq("id", id)
      .select("*");

    if (error) {
      console.error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};

export const getUserTrips = async (userId) => {
  try {
    const adminClient = await createAdminClient();
    const { data, error } = await adminClient
      .from("trips")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching user trips:", error);
    throw error;
  }
};
