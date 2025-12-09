"use server";

import { createClient } from "@/lib/supabase/server";

export const getUserQuotes = async (userId) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;

  // Calculate current status for each quote based on valid_until date
  const { getQuoteStatus } = await import("@/lib/statusHelpers");
  const quotesWithStatus = data.map((quote) => ({
    ...quote,
    currentStatus: getQuoteStatus(quote),
  }));

  return quotesWithStatus;
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

  // Calculate current status for each quote
  const { getQuoteStatus } = await import("@/lib/statusHelpers");
  const quotesWithStatus = data.map((quote) => ({
    ...quote,
    currentStatus: getQuoteStatus(quote),
  }));

  return quotesWithStatus;
};

export const getQuoteByNumber = async (quoteNumber) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("quote_number", quoteNumber)
    .single();

  if (error) throw error;

  // Calculate current status
  const { getQuoteStatus } = await import("@/lib/statusHelpers");
  return {
    ...data,
    currentStatus: getQuoteStatus(data),
  };
};

export const getQuoteItemsByQuoteId = async (quoteId) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quote_items")
    .select("*")
    .eq("quote_id", quoteId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
};

export const acceptQuote = async (quoteId) => {
  const supabase = await createClient();

  try {
    // 1. Get quote details first
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .select("*, trip_id")
      .eq("id", quoteId)
      .single();

    if (quoteError) throw quoteError;

    // 2. Get trip and user details
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("user_id, title")
      .eq("id", quote.trip_id)
      .single();

    if (tripError) throw tripError;

    // 3. Get user profile
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", trip.user_id)
      .single();

    if (userError) throw userError;

    // 4. Update quote status to accepted
    const { data: updatedQuote, error: updateError } = await supabase
      .from("quotes")
      .update({ status: "accepted" })
      .eq("id", quoteId)
      .select()
      .single();

    if (updateError) throw updateError;

    // 5. Get quote items to find related reservations
    const { data: quoteItems, error: itemsError } = await supabase
      .from("quote_items")
      .select("reservation_id")
      .eq("quote_id", quoteId);

    if (itemsError) throw itemsError;

    // 6. Update related reservations status and link them to the quote
    const reservationIds = quoteItems.map((item) => item.reservation_id);
    if (reservationIds.length > 0) {
      const { error: reservationError } = await supabase
        .from("reservations")
        .update({
          status: "confirmed",
          quote_id: quoteId, // Link reservations to the accepted quote
        })
        .in("id", reservationIds);

      if (reservationError) {
        console.error("Error updating reservations:", reservationError);
        // Don't throw - quote is already accepted
      }

      // 7. Cancel/reject other quotes that share these reservations
      // First, find all other quote_items that reference these reservations
      const { data: conflictingQuoteItems, error: conflictError } =
        await supabase
          .from("quote_items")
          .select("quote_id")
          .in("reservation_id", reservationIds)
          .neq("quote_id", quoteId);

      if (
        !conflictError &&
        conflictingQuoteItems &&
        conflictingQuoteItems.length > 0
      ) {
        const conflictingQuoteIds = [
          ...new Set(conflictingQuoteItems.map((item) => item.quote_id)),
        ];

        // Update conflicting quotes to cancelled status
        const { error: cancelError } = await supabase
          .from("quotes")
          .update({ status: "cancelled" })
          .in("id", conflictingQuoteIds)
          .in("status", ["sent", "draft"]); // Only cancel quotes that haven't been acted upon

        if (cancelError) {
          console.error("Error cancelling conflicting quotes:", cancelError);
        } else {
          console.log(
            `Cancelled ${conflictingQuoteIds.length} conflicting quotes`
          );
        }
      }
    }

    // 8. Send confirmation email to client
    const { resendEmail } = await import("@/actions/resendEmail");
    const dashboardLink = `${process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com"}/dashboard/bookings`;

    const clientEmailResult = await resendEmail(
      {
        fullname: user.full_name,
        email: user.email,
        quoteDetails: {
          quoteNumber: quote.quote_number,
          tripName: trip.title,
          totalAmount: quote.total_amount,
          dashboardLink: dashboardLink,
        },
      },
      "quote-acceptance"
    );

    if (!clientEmailResult.success) {
      console.error(
        "Error sending client acceptance email:",
        clientEmailResult.message
      );
    }

    // 9. Send notification to admin
    const adminEmailResult = await resendEmail(
      {
        action: "accepted",
        quoteDetails: {
          quoteNumber: quote.quote_number,
          tripName: trip.title,
          totalAmount: quote.total_amount,
        },
        userDetails: {
          fullname: user.full_name,
          email: user.email,
        },
        adminEmail: "bookings@virstravelclub.com",
      },
      "quote-admin-notification"
    );

    if (!adminEmailResult.success) {
      console.error(
        "Error sending admin notification email:",
        adminEmailResult.message
      );
    }

    return updatedQuote;
  } catch (error) {
    console.error("Error in acceptQuote workflow:", error);
    throw error;
  }
};

export const rejectQuote = async (quoteId) => {
  const supabase = await createClient();

  try {
    // 1. Get quote details first
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .select("*, trip_id")
      .eq("id", quoteId)
      .single();

    if (quoteError) throw quoteError;

    // 2. Get trip and user details
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("user_id, title")
      .eq("id", quote.trip_id)
      .single();

    if (tripError) throw tripError;

    // 3. Get user profile
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", trip.user_id)
      .single();

    if (userError) throw userError;

    // 4. Update quote status to rejected
    const { data: updatedQuote, error: updateError } = await supabase
      .from("quotes")
      .update({ status: "rejected" })
      .eq("id", quoteId)
      .select()
      .single();

    if (updateError) throw updateError;

    // 5. Send notification email to client
    const { resendEmail } = await import("@/actions/resendEmail");

    const clientEmailResult = await resendEmail(
      {
        fullname: user.full_name,
        email: user.email,
        quoteDetails: {
          quoteNumber: quote.quote_number,
          tripName: trip.title,
        },
      },
      "quote-rejection"
    );

    if (!clientEmailResult.success) {
      console.error(
        "Error sending client rejection email:",
        clientEmailResult.message
      );
    }

    // 6. Send notification to admin
    const adminEmailResult = await resendEmail(
      {
        action: "rejected",
        quoteDetails: {
          quoteNumber: quote.quote_number,
          tripName: trip.title,
        },
        userDetails: {
          fullname: user.full_name,
          email: user.email,
        },
        adminEmail: "bookings@virstravelclub.com",
      },
      "quote-admin-notification"
    );

    if (!adminEmailResult.success) {
      console.error(
        "Error sending admin notification email:",
        adminEmailResult.message
      );
    }

    return updatedQuote;
  } catch (error) {
    console.error("Error in rejectQuote workflow:", error);
    throw error;
  }
};
