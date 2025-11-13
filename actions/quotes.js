"use server";

import { createClient } from "@/lib/supabase/server";

export const getUserQuotes = async (userId) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};

export const getQuoteById = async (quoteId) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", quoteId)
    .single();
  if (error) throw error;
  return data;
};

export const getAllQuotes = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("quotes").select("*");
  if (error) throw error;
  return data;
};
