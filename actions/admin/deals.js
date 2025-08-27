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

export async function adminListDealsAction({
  q = "",
  status,
  page = 1,
  size = 20,
} = {}) {
  const supabase = await assertAdmin();
  let query = supabase
    .from("deals")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (q) query = query.ilike("title", `%${q}%`);
  const from = (page - 1) * size;
  const to = from + size - 1;
  const { data, error, count } = await query.range(from, to);
  if (error) throw error;
  return { data: data || [], count: count || 0 };
}

export async function adminCreateDealAction(payload) {
  const supabase = await assertAdmin();
  const { data, error } = await supabase
    .from("deals")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateDealAction(id, updates) {
  const supabase = await assertAdmin();
  const { data, error } = await supabase
    .from("deals")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteDealAction(id) {
  const supabase = await assertAdmin();
  const { error } = await supabase.from("deals").delete().eq("id", id);
  if (error) throw error;
  return { success: true };
}

export async function adminPublishDealAction(id, publish = true) {
  return adminUpdateDealAction(id, { status: publish ? "published" : "draft" });
}
