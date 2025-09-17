"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";

export const getAllReservations = async () => {
  try {
    const supabase = await createAdminClient();
    const { data: reservations, error } = await supabase
      .from("reservations")
      .select("*");
    const { data: users } = await supabase.from("profiles").select("*");
    const { data: trips } = await supabase.from("trips").select("*");

    if (error) {
      throw new Error("Error fetching reservations");
    }

    const reducedReservations = reservations.map((res) => {
      const user = users.find((u) => u.id === res.user_id);
      const trip = trips.find((t) => t.id === res.trip_id);      

      const userName = user ? user?.full_name : "Unknown User";
      const userPlan = user ? user?.subscription_plan : "Free";
      const tripName = trip ? trip?.title : "Unknown Trip";

      return {
        ...res,
        user: { name: userName, plan: userPlan },
        trip: { name: tripName },
      };
    });
    
    return reducedReservations;
  } catch (error) {
    console.error("getAllReservations error:::", error);
    return [];
  }
};
