"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";

export const getAllUsers = async () => {
  try {
    const supabase = await createAdminClient();
    const { data: users, error } = await supabase.from("profiles").select("*");
    if (error) throw error;

    const reducedUsers = users.map(
      ({ customer_id, email, full_name, avatar_url, plan }) => ({
        customer_id,
        email,
        full_name,
        avatar_url,
        plan,
      })
    );
    return reducedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (customer_id) => {
  try {
    const supabase = await createAdminClient();
    const { data: user } = await supabase
      .from("profiles")
      .select("*")
      .eq("customer_id", customer_id)
      .single();
    if (user) return user;
    else {
      const { data: profile, err } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", customer_id)
        .single();
      if (profile) return profile;
      if (err) throw err;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
