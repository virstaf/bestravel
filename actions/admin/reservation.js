"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";
import { getUserTrips } from "./trips";

export const getAllReservations = async () => {
  try {
    const supabase = await createAdminClient();
    const { data: reservations, error } = await supabase
      .from("reservations")
      .select("*")
      .neq("status", "cancelled")
      .order("created_at", { ascending: false });
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

export const getReservation = async (ref_id) => {
  try {
    const supabase = await createAdminClient();
    const { data: reservation, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("ref_id", ref_id)
      .single();

    if (error) {
      throw new Error("Error fetching reservation");
    }

    const { data: user } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", reservation.user_id)
      .single();
    const { data: trip } = await supabase
      .from("trips")
      .select("*")
      .eq("id", reservation.trip_id)
      .single();

    const userName = user ? user?.full_name : "Unknown User";
    const userPlan = user ? user?.subscription_plan : "Free";
    const tripName = trip ? trip?.title : "Unknown Trip";

    const reducedReservation = {
      ...reservation,
      user: { name: userName, plan: userPlan },
      trip: { name: tripName },
    };

    return reducedReservation;
  } catch (error) {
    console.error("getReservation error:::", error);
    return null;
  }
};

export const getUserReservations = async (userId) => {
  try {
    const supabase = await createAdminClient();
    const { data: reservations, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error("Error fetching user reservations");
    }

    const userTrips = await getUserTrips(userId);

    const reducedReservations = reservations.map((res) => {
      const trip = userTrips.find((t) => t.id === res.trip_id);
      const tripName = trip ? trip?.title : "Unknown Trip";

      return {
        ...res,
        trip: { name: tripName },
      };
    });

    return reducedReservations;
  } catch (error) {
    console.error("getUserReservations error:::", error);
    return [];
  }
};

export const getReservationsByTrip = async (tripId) => {
  try {
    const supabase = await createAdminClient();
    const { data: reservations, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("trip_id", tripId);

    if (error) {
      throw new Error("Error fetching reservations");
    }

    const reducedReservations = reservations.map((res) => {
      return {
        ...res,
      };
    });

    return reducedReservations;
  } catch (error) {
    console.error("getReservationsByTrip error:::", error);
    return [];
  }
};

export const pendingRequestsCount = async () => {
  try {
    const supabase = await createAdminClient();
    const { count, error: countError } = await supabase
      .from("reservations")
      .select("created_at", { count: "exact" })
      .eq("status", "pending");

    if (countError) {
      console.error(countError);
      return null;
    }
    // console.log(count);
    return count;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const reservationsThisMonthCount = async () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // JavaScript months are 0-indexed

  try {
    const supabase = await createAdminClient();

    const { data, error: countError } = await supabase
      .from("reservations")
      .select("created_at", { count: "exact" });

    if (countError) {
      console.error(countError);
      return null;
    }
    // console.log(data);

    const mainCount = data.filter((item) => {
      const itemDate = new Date(item.created_at);
      return (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    });

    // console.log("main count:", mainCount.length);

    return mainCount.length;
  } catch (error) {
    console.error(error);
    return null;
  }
};
