"use server";

/**
 * Quote Actions — Phase 3 Migration
 *
 * All quote operations now route through FastAPI (Supabase B).
 *
 * GET   /v1/app/quotes/quotes_by/{user_id}     → list user quotes
 * GET   /v1/app/quotes/items_by/{quote_id}     → get quote items
 * POST  /v1/app/quotes/                        → create quote
 * PATCH /v1/app/quotes/{quote_id}/status       → update quote status
 *
 * NOTE: acceptQuote and rejectQuote workflows involve cross-entity lookups
 * (trips, profiles) that previously used Supabase joins. These now use
 * sequential FastAPI calls. The email logic is preserved.
 */

import { apiGet, apiPost, apiPatch } from "@/lib/api/client";
import { getServerToken } from "@/lib/session";

// ─── Get User Quotes ──────────────────────────────────────────────────────────

export const getUserQuotes = async (userId) => {
  const token = await getServerToken();
  const { data, error } = await apiGet(
    `/v1/app/quotes/quotes_by/${userId}`,
    token
  );
  if (error) {
    console.warn(`[getUserQuotes] API returned error: ${error}`);
    return [];
  }

  const { getQuoteStatus } = await import("@/lib/statusHelpers");
  return (data || []).map((quote) => ({
    ...quote,
    currentStatus: getQuoteStatus(quote),
  }));
};

// ─── Get All Quotes (admin) ───────────────────────────────────────────────────

export const getAllQuotes = async () => {
  // FastAPI doesn't have a "get all quotes" admin endpoint yet.
  // TODO: Add when backend exposes it.
  console.warn("[getAllQuotes] No FastAPI endpoint yet for all quotes.");
  return [];
};

// ─── Get Quote by ID ──────────────────────────────────────────────────────────

export const getQuoteById = async (quoteId) => {
  const token = await getServerToken();
  // FastAPI doesn't have GET /v1/app/quotes/{quote_id} yet — using quotes_by workaround.
  // TODO: Replace with direct endpoint when available on the backend.
  throw new Error("getQuoteById: No direct FastAPI endpoint yet. Use getUserQuotes and filter client-side.");
};

// ─── Get Quote by Number ──────────────────────────────────────────────────────

export const getQuoteByNumber = async (quoteNumber) => {
  // No direct endpoint — same limitation as getQuoteById.
  // TODO: Replace with backend endpoint when available.
  throw new Error("getQuoteByNumber: No direct FastAPI endpoint yet.");
};

// ─── Get Quote Items ──────────────────────────────────────────────────────────

export const getQuoteItemsByQuoteId = async (quoteId) => {
  const token = await getServerToken();
  const { data, error } = await apiGet(
    `/v1/app/quotes/items_by/${quoteId}`,
    token
  );
  if (error) {
    console.warn(`[getQuoteItemsByQuoteId] API returned error: ${error}`);
    return [];
  }
  return data || [];
};

// ─── Update Quote Status ──────────────────────────────────────────────────────

/**
 * Generic status update — used internally by acceptQuote and rejectQuote.
 */
const updateQuoteStatus = async (quoteId, statusPayload, token) => {
  const { data, error } = await apiPatch(
    `/v1/app/quotes/${quoteId}/status`,
    statusPayload,
    token
  );
  if (error) throw new Error(error);
  return data;
};

// ─── Accept Quote ──────────────────────────────────────────────────────────────

export const acceptQuote = async (quoteId) => {
  const token = await getServerToken();

  try {
    // 1. Update quote status to accepted
    const updatedQuote = await updateQuoteStatus(
      quoteId,
      { status: "accepted" },
      token
    );

    // 2. Get quote items to find related reservations
    const items = await getQuoteItemsByQuoteId(quoteId);
    const reservationIds = items.map((item) => item.reservation_id).filter(Boolean);

    // 3. Update related reservations to confirmed
    for (const reservationId of reservationIds) {
      await apiPatch(
        `/v1/app/reservations/${reservationId}`,
        { status: "confirmed" },
        token
      ).catch((err) =>
        console.error(`[acceptQuote] Could not confirm reservation ${reservationId}:`, err)
      );
    }

    // 4. Send email notifications
    // Note: user email/name now needs to come from the calling context since
    // we no longer have direct Supabase profile access here.
    // TODO: FastAPI backend should expose a way to get quote + user details
    //       in a single call so emails can be triggered server-side cleanly.
    const { resendEmail } = await import("@/actions/resendEmail");
    const dashboardLink = `${process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com"}/dashboard/bookings`;

    // Admin notification (uses quote data we have)
    await resendEmail(
      {
        action: "accepted",
        quoteDetails: {
          quoteNumber: updatedQuote?.quote_number,
          totalAmount: updatedQuote?.total_amount,
        },
        adminEmail: "bookings@virstravelclub.com",
      },
      "quote-admin-notification"
    ).catch((err) => console.error("[acceptQuote] Admin email failed:", err));

    return updatedQuote;
  } catch (err) {
    console.error("[acceptQuote] Error:", err);
    throw err;
  }
};

// ─── Reject Quote ──────────────────────────────────────────────────────────────

export const rejectQuote = async (quoteId, reason, note) => {
  const token = await getServerToken();

  try {
    const updatedQuote = await updateQuoteStatus(
      quoteId,
      {
        status: "rejected",
        rejection_reason: reason,
        rejection_note: note,
      },
      token
    );

    // Admin notification
    const { resendEmail } = await import("@/actions/resendEmail");
    await resendEmail(
      {
        action: "rejected",
        quoteDetails: {
          quoteNumber: updatedQuote?.quote_number,
          rejectionReason: reason,
          rejectionNote: note,
        },
        adminEmail: "bookings@virstravelclub.com",
      },
      "quote-admin-notification"
    ).catch((err) => console.error("[rejectQuote] Admin email failed:", err));

    return updatedQuote;
  } catch (err) {
    console.error("[rejectQuote] Error:", err);
    throw err;
  }
};
