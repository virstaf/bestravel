"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";
import { getThisWeekCount } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  try {
    const supabase = await createAdminClient();
    const { data: users, error } = await supabase
      .from("profiles")
      .select("*")
      .order("updated_at", {
        ascending: false,
      });
    if (error) throw error;

    const reducedUsers = users.map(
      ({ customer_id, email, full_name, avatar_url, plan, updated_at }) => ({
        customer_id,
        email,
        full_name,
        avatar_url,
        updated_at,
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

export const newUsersCount = async () => {
  try {
    const supabase = await createAdminClient();
    const {
      data: { users },
      error,
    } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error(usersError);
      return null;
    }

    const users_created_at = users.map((user) => user.created_at);

    return getThisWeekCount(users_created_at);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAuthUsers = async () => {
  try {
    const supabase = await createAdminClient();
    const { data, usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error(usersError);
      return null;
    }
    return data.users;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteAuthUser = async (id) => {
  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
      console.error(error);
      return { success: false, error: error };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  } finally {
    revalidatePath("/");
  }
};

export const signInWithEmailOtp = async (email) => {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      console.error(error);
      return { success: false, error: error };
    }

    console.log("with otp:::", data);
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};
