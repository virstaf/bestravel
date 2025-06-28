"use server";

import { createClient } from "@/lib/supabase/server.js";
import { generateCustomerId, handleError } from "../lib/utils.ts";
import { redirect } from "next/navigation.js";
import { resendEmail } from "./resendEmail.js";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com";

export const loginAction = async (email, password) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const userId = data.user?.id;

    const profile = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    console.log("profile::", profile);
    if (!profile.data) {
      // 1. Generate unique customer ID
      const customerId = generateCustomerId();
      // 2. Create profile if it doesn't exist
      const response = await supabase.from("profiles").insert({
        id: userId,
        email,
        full_name: data.user?.user_metadata?.full_name || "",
        customer_id: customerId,
        role: "USER",
      });
      if (response.error) {
        console.error("Error creating profile:", response.error);
        throw handleError(response.error || "Error creating profile");
      } else {
        console.log("Profile created successfully:", response.data);
        const sendNotification = await resendEmail(
          {
            fullname: data.user?.user_metadata?.fullname || email.split("@")[0],
            membershipId: customerId,
            email,
          },
          "welcome"
        );
        if (!sendNotification.success) {
          console.error(
            "Error sending welcome email:",
            sendNotification.message
          );
          return handleError(sendNotification.message);
        }
      }
    }

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

export const signupAction = async (email, password, fullname) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: fullname,
        },
      },
    });

    // // 2. Generate unique customer ID
    // const customerId = generateCustomerId();

    // if (error) {
    //   console.error("error signing up", error);
    //   return handleError(error.message);
    // }
    // const userId = data.user?.id;

    // // 3. Send welcome email
    // // console.log("before sending welcome email", fullname, customerId, email);
    // const sendNotification = await resendEmail(
    //   {
    //     fullname: fullname,
    //     membershipId: customerId,
    //     email,
    //   },
    //   "welcome"
    // );
    // if (!sendNotification.success) {
    //   console.error("Error sending welcome email:", sendNotification.message);
    //   return handleError(sendNotification.message);
    // }

    // if (!userId) throw new Error("Error signing up");

    // const supabase = await createClient();

    // const response = await supabase.from("profiles").insert({
    //   id: userId,
    //   email,
    //   fullname: fullname.toLowerCase().replace(/\s+/g, "_"),
    //   full_name: fullname,
    //   customer_id: customerId,
    //   role: "USER",
    // });

    // if (response.error) {
    //   console.error("Error creating profile:", response.error);
    //   throw handleError(response.error || "Error creating profile");
    // }
    // console.log("response::", response);

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
