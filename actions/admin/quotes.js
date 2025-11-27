"use server";
import { createAdminClient } from "@/lib/supabase/admin/server";
import { inviteUser } from "./users";

export const createQuote = async (quoteData) => {
  const supabase = await createAdminClient();
  try {
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .insert(quoteData)
      .select()
      .single();

    if (quoteError) {
      console.error("createQuote error:::", quoteError);

      return { success: false, error: quoteError.message };
    } else {
      return { success: true, data: quote };
    }
  } catch (error) {
    console.error("createQuote catch error:::", error);
    return { success: false, error: error.message };
  }
};

export const createQuoteItems = async (itemsData) => {
  const supabase = await createAdminClient();
  try {
    const { data: items, error: itemsError } = await supabase
      .from("quote_items")
      .insert(itemsData);
    if (itemsError) {
      console.error("createQuoteItems error:::", itemsError);
      return { success: false, error: itemsError.message };
    }
    return { success: true, data: items };
  } catch (error) {
    console.error("createQuoteItems catch error:::", error);
    return { success: false, error: error.message };
  }
};

export const getAllQuotes = async () => {
  const supabase = await createAdminClient();
  try {
    const { data: quotes, error: quotesError } = await supabase
      .from("quotes")
      .select("*");
    if (quotesError) {
      console.error("getAllQuotes error:::", quotesError);
      return { success: false, error: quotesError.message };
    }
    // const trips = await supabase.from("trips").select("id, name");
    return { success: true, data: quotes };
  } catch (error) {
    console.error("getAllQuotes catch error:::", error);
    return { success: false, error: error.message };
  }
};

export const getQuoteById = async (quoteId) => {
  const supabase = await createAdminClient();
  try {
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .select("*")
      .eq("id", quoteId)
      .single();
    if (quoteError) {
      const { data: quote2, error: quoteError2 } = await supabase
        .from("quotes")
        .select("*")
        .eq("quote_number", quoteId)
        .single();
      if (quoteError2) {
        return { success: false, error: quoteError2.message };
      }
      return { success: true, data: quote2 };
    }
    return { success: true, data: quote };
  } catch (error) {
    console.error("getQuoteById catch error:::", error);
    return { success: false, error: error.message };
  }
};

export const getQuoteItems = async (quoteId) => {
  const supabase = await createAdminClient();
  try {
    const { data: items, error: itemsError } = await supabase
      .from("quote_items")
      .select("*")
      .eq("quote_id", quoteId);
    if (itemsError) {
      console.error("getQuoteItems error:::", itemsError);
      return { success: false, error: itemsError.message };
    }
    return { success: true, data: items };
  } catch (error) {
    console.error("getQuoteItems catch error:::", error);
    return { success: false, error: error.message };
  }
};

export const createCustomQuote = async (formData) => {
  console.log("data::: ", formData);
  const AdminId = formData.get("AdminId");
  const email = formData.get("email");
  const fullname = formData.get("fullname");
  const phone_number = formData.get("phone_number");

  try {
    // const supabase = await createAdminClient();
    const { error } = await inviteUser(email);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};
