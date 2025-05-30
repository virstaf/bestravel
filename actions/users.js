"use server";

import { createClient } from "@/lib/supabase/server.js";
import { generateCustomerId, handleError } from "../lib/utils.ts";
import { redirect } from "next/navigation.js";
import { sendEmail } from "./sendEmail.js";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com";

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
    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    // 2. Generate unique customer ID
    const customerId = generateCustomerId();

    if (error) {
      console.error("error signing up", error);
      return handleError(error.message);
    }
    const userId = data.user?.id;

    // 3. Send welcome email

    await sendEmail(
      email,
      "Welcome to VirsTravel Club",
      `Hello ${username},\n\nThank you for signing up for Virs Travel Club! We're excited to have you on board.\nNote, your Member ID, ${customerId}\n\nBest regards,\nThe Virs Travel Club Team`
    );
    if (!userId) throw new Error("Error signing up");

    const supabase = await createClient();
    // const { error: profileError } = await supabase.from("profiles").insert({
    const response = await supabase.from("profiles").insert({
      id: userId,
      email,
      username: username.toLowerCase().replace(/\s+/g, "_"),
      full_name: username,
      customer_id: customerId,
      role: "USER",
    });

    if (response.error) {
      console.error("Error creating profile:", response.error);
      throw handleError(response.error || "Error creating profile");
    }
    console.log("response::", response);

    // if (error) throw error;
    // const userId = data.user?.id;
    // if (!userId) throw new Error("Error signing up");

    // // Add user to database
    // const { error: insertError } = await supabase
    //   .from("users")
    //   .insert({ uuid: userId, username, email, role: "USER" });

    // if (insertError) {
    //   console.error("Insert error:", insertError);

    //   throw insertError;
    // }

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

export const googleAuthAction = async () => {
  const { auth } = await createClient();
  const { data, error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/dashboard`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  if (error) {
    console.error("Error signing in with Google:", error.message);
    return { errorMessage: error.message };
  }
  return { errorMessage: null };
};
