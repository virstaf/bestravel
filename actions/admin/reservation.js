"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";
import { createClient } from "@/lib/supabase/server";

export const getAllReservations = async () => {
  try {
    const supabase = await createAdminClient();
    const { reservations, error } = await supabase.from("reservations").select("*");
    // const { users } = await supabase.from("users").select("*");
    // const { trips } = await supabase.from("trips").select("*"); 

    if (error) {
      throw new Error("Error fetching reservations");
    }
console.log("Fetched reservations:::", reservations);
    return reservations;
  } catch (error) {
    console.error("getAllReservations error:::", error);
    return [];
  }
};
