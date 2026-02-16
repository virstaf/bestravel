"use server";

import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";
import { resendEmail } from "./resendEmail";
import { format } from "date-fns";

export const createDealRequest = async ({ from, to, types, dates }) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return handleError("You must be logged in to request deals.");
    }

    // Extract dates
    const departureDate = dates?.from
      ? format(new Date(dates.from), "yyyy-MM-dd")
      : null;
    const returnDate = dates?.to
      ? format(new Date(dates.to), "yyyy-MM-dd")
      : null;

    // Insert into Supabase
    const { data: requestData, error } = await supabase
      .from("deal_requests")
      .insert({
        user_id: user.id,
        from_location: from,
        to_location: to,
        travel_types: types,
        departure_date: departureDate, // New column
        return_date: returnDate, // New column
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating deal request:", error);
      return handleError("Failed to submit request.");
    }

    // Fetch user details for the email (full name, etc.)
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const fullname = profile?.full_name || user.email;

    // Send Email to Admin (Concierge)
    const adminEmailResult = await resendEmail(
      {
        fullname,
        email: user.email,
        requestDetails: {
          from,
          to,
          types,
          dates: `${departureDate} - ${returnDate || "One-way"}`,
          quoteNumber: requestData.id,
        },
        user: profile,
      },
      "deal-request-admin",
    );

    if (!adminEmailResult.success) {
      console.error(
        "Failed to send admin notification:",
        adminEmailResult.message,
      );
    }

    // Send Confirmation Email to User
    const dateString = returnDate
      ? `${format(new Date(dates.from), "d MMM")} - ${format(new Date(dates.to), "d MMM yyyy")}`
      : `${format(new Date(dates.from), "d MMM yyyy")}`;

    const userEmailResult = await resendEmail(
      {
        fullname,
        email: user.email,
        from: from.name || from.description || "Origin", // Handle object structure
        to: to.name || to.description || "Destination",
        dates: dateString,
      },
      "deal-request-confirmation",
    );

    if (!userEmailResult.success) {
      console.error(
        "Failed to send user confirmation:",
        userEmailResult.message,
      );
    }

    return { success: true, data: requestData };
  } catch (error) {
    return handleError(error);
  }
};
