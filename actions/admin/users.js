"use server";

import { createClient } from "@/lib/supabase/server";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || profile.role !== "ADMIN") throw new Error("Forbidden");
  return supabase;
}

export async function adminListUsersAction({
  q = "",
  role,
  page = 1,
  size = 20,
} = {}) {
  const supabase = await assertAdmin();
  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (role) query = query.eq("role", role);
  if (q) query = query.or(`email.ilike.%${q}%,full_name.ilike.%${q}%`);
  const from = (page - 1) * size;
  const to = from + size - 1;
  const { data, error, count } = await query.range(from, to);
  if (error) throw error;
  return { data: data || [], count: count || 0 };
}

export async function adminUpdateUserRoleAction(userId, role) {
  const supabase = await assertAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeactivateUserAction(userId, deactivate = true) {
  const supabase = await assertAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .update({ is_active: !deactivate })
    .eq("id", userId)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}
