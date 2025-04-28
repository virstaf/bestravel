"use server";

import { createClient } from "@/lib/supabase/server.js";
import { handleError } from "../lib/utils.ts";

export const loginAction = async (email, password) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signupAction = async (email, password, username) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });
    if (error) throw error;
    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    // Add user to database
    const supabase = await createClient();
    const { error: insertError } = await supabase
      .from("users")
      .insert({ uuid: userId, username, email, role: "USER" });

    if (insertError) {
      console.error("Insert error:", insertError);

      throw insertError;
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const resetPasswordAction = async (email) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.resetPasswordForEmail(email);

    if (error) throw error;
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};
