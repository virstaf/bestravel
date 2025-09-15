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
