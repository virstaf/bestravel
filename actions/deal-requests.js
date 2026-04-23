"use server";

/**
 * Deal Request Actions — Phase 3 Migration
 *
 * The `deal_requests` table in Supabase A has no direct FastAPI equivalent.
 * Mapping to `contact_forms` in Supabase B (FastAPI /v1/app/contact_forms/)
 * which serves the same intent: capturing user travel intent/requests.
 *
 * POST /v1/app/contact_forms/ → create contact form (deal request)
 */

import { apiPost } from "@/lib/api/client";
import { getServerToken } from "@/lib/session";
import { handleError } from "@/lib/utils";
import { resendEmail } from "./resendEmail";
import { format } from "date-fns";

export const createDealRequest = async ({ from, to, types, dates }) => {
  try {
    const token = await getServerToken();
    if (!token) {
      // Also check Supabase A session during migration period
      const { createClient } = await import("@/lib/supabase/server.js");
      const supabase = await createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return handleError("You must be logged in to request deals.");

      return createDealRequestLegacy({ from, to, types, dates, user, supabase });
    }

    // Extract dates
    const departureDate = dates?.from
      ? format(new Date(dates.from), "yyyy-MM-dd")
      : null;
    const returnDate = dates?.to
      ? format(new Date(dates.to), "yyyy-MM-dd")
      : null;

    // Build the contact form message from deal request data
    const fromLabel = from?.name || from?.description || String(from) || "Origin";
    const toLabel = to?.name || to?.description || String(to) || "Destination";
    const typesLabel = Array.isArray(types) ? types.join(", ") : types;
    const dateLabel = returnDate
      ? `${departureDate} to ${returnDate}`
      : departureDate || "Flexible";

    const message = `Deal Request\nFrom: ${fromLabel}\nTo: ${toLabel}\nTravel types: ${typesLabel}\nDates: ${dateLabel}`;

    // Get current user's info from FastAPI
    const { getMeFromAPI } = await import("@/lib/api/auth");
    const { data: apiUser } = await getMeFromAPI(token);

    const fullname = apiUser?.kyc
      ? `${apiUser.kyc.first_name} ${apiUser.kyc.last_name}`.trim()
      : apiUser?.email?.split("@")[0] || "Traveller";

    // Submit as a contact form to FastAPI
    const { data: requestData, error } = await apiPost(
      "/v1/app/contact_forms/",
      {
        user_id: apiUser?.id || "00000000-0000-0000-0000-000000000000",
        email: apiUser?.email || "",
        fullname,
        phone: apiUser?.phone || null,
        message,
        is_active: true,
        invited_at: new Date().toISOString(),
        phone_e164: apiUser?.phone || "",
        whatsapp_opt_in: false,
        marketing_opt_in: false,
      },
      token
    );

    if (error) {
      console.error("[createDealRequest] FastAPI error:", error);
      return handleError("Failed to submit request.");
    }

    // Send admin notification email
    await resendEmail(
      {
        fullname,
        email: apiUser?.email,
        requestDetails: {
          from: fromLabel,
          to: toLabel,
          types: typesLabel,
          dates: dateLabel,
          quoteNumber: requestData?.id,
        },
      },
      "deal-request-admin"
    ).catch((err) => console.error("[createDealRequest] Admin email failed:", err));

    // Send user confirmation email
    const dateString = returnDate
      ? `${format(new Date(dates.from), "d MMM")} - ${format(new Date(dates.to), "d MMM yyyy")}`
      : `${format(new Date(dates.from), "d MMM yyyy")}`;

    await resendEmail(
      {
        fullname,
        email: apiUser?.email,
        from: fromLabel,
        to: toLabel,
        dates: dateString,
      },
      "deal-request-confirmation"
    ).catch((err) => console.error("[createDealRequest] User email failed:", err));

    return { success: true, data: requestData };
  } catch (err) {
    return handleError(err);
  }
};

// ─── Legacy Supabase A path (fallback during migration) ───────────────────────

async function createDealRequestLegacy({ from, to, types, dates, user, supabase }) {
  const departureDate = dates?.from
    ? format(new Date(dates.from), "yyyy-MM-dd")
    : null;
  const returnDate = dates?.to
    ? format(new Date(dates.to), "yyyy-MM-dd")
    : null;

  const { data: requestData, error } = await supabase
    .from("deal_requests")
    .insert({
      user_id: user.id,
      from_location: from,
      to_location: to,
      travel_types: types,
      departure_date: departureDate,
      return_date: returnDate,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("[createDealRequest] Legacy Supabase error:", error);
    return handleError("Failed to submit request.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const fullname = profile?.full_name || user.email;
  const fromLabel = from?.name || from?.description || "Origin";
  const toLabel = to?.name || to?.description || "Destination";
  const dateLabel = returnDate ? `${departureDate} - ${returnDate}` : departureDate;

  await resendEmail(
    { fullname, email: user.email, requestDetails: { from: fromLabel, to: toLabel, types, dates: dateLabel, quoteNumber: requestData.id }, user: profile },
    "deal-request-admin"
  );

  const dateString = returnDate
    ? `${format(new Date(dates.from), "d MMM")} - ${format(new Date(dates.to), "d MMM yyyy")}`
    : `${format(new Date(dates.from), "d MMM yyyy")}`;

  await resendEmail(
    { fullname, email: user.email, from: fromLabel, to: toLabel, dates: dateString },
    "deal-request-confirmation"
  );

  return { success: true, data: requestData };
}
