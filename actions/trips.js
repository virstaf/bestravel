"use server";

export const fetchTrips = async () => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (err) {
    console.error("Error fetching trips:", err);
  }
};
