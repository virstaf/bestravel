"use server";

/**
 * Deal Actions — Phase 3 Migration
 *
 * Public deal reads (featured deals, all deals, deal by ID) now route through
 * FastAPI (Supabase B).
 *
 * GET /v1/app/deals/grab/all       → all deals
 * GET /v1/app/deals/{deal_id}      → single deal
 *
 * NOTE: The FastAPI DealOut schema is flatter than Supabase A (no joined
 * `partners` object). Partner data comes via the `partner_id` field.
 * Admin write operations (createDealAction, updateDealAction, deleteDealAction)
 * are migrated but require an admin JWT with appropriate permissions.
 *
 * MISSING vs Supabase A:
 *  - No server-side filtering (destination, price, date range, sort) — FastAPI
 *    returns all deals and filtering is done client-side until backend adds
 *    query params to GET /v1/app/deals/grab/all.
 *  - No joined partner data — partner_id is returned; use GET /v1/app/partners/{id}
 *    separately if partner name is needed.
 */

import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api/client";
import { getServerToken } from "@/lib/session";
import { revalidatePath } from "next/cache";

// ─── Get All Deals (with optional client-side filtering) ───────────────────────

export const getDealsAction = async ({
  limit,
  dest,
  maxPrice,
  from,
  to,
  sort,
} = {}) => {
  try {
    const token = await getServerToken();
    const { data, error } = await apiGet("/v1/app/deals/grab/all", token);
    if (error) throw new Error(error);

    let deals = data || [];

    // Client-side filtering (FastAPI doesn't support query params yet on this route)
    if (dest) {
      const safeDest = dest.toLowerCase();
      deals = deals.filter(
        (d) =>
          d.destination?.toLowerCase().includes(safeDest) ||
          d.title?.toLowerCase().includes(safeDest)
      );
    }

    if (maxPrice) {
      deals = deals.filter((d) => d.price <= parseInt(maxPrice));
    }

    if (from) {
      deals = deals.filter(
        (d) => !d.start_date || new Date(d.start_date) >= new Date(from)
      );
    }

    if (to) {
      deals = deals.filter(
        (d) => !d.end_date || new Date(d.end_date) <= new Date(to)
      );
    }

    // Sorting
    switch (sort) {
      case "lowest-price":
        deals.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "popular":
        deals.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
      case "ending-soon":
        deals.sort(
          (a, b) => new Date(a.end_date || 0) - new Date(b.end_date || 0)
        );
        break;
      case "newest":
      default:
        deals.sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
        );
        break;
    }

    if (limit) deals = deals.slice(0, limit);

    return deals;
  } catch (err) {
    console.error("[getDealsAction] Error:", err);
    return [];
  }
};

// ─── Get Featured Deals ───────────────────────────────────────────────────────

export const getFeaturedDealsAction = async ({ limit } = {}) => {
  try {
    const token = await getServerToken();
    const { data, error } = await apiGet("/v1/app/deals/grab/all", token);
    if (error) throw new Error(error);

    const now = new Date();
    let deals = (data || []).filter(
      (d) => d.is_featured && d.status !== "inactive" && (!d.end_date || new Date(d.end_date) >= now)
    );

    deals.sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
    );

    if (limit) deals = deals.slice(0, limit);

    return deals;
  } catch (err) {
    console.error("[getFeaturedDealsAction] Error:", err);
    return [];
  }
};

// ─── Get Deal By ID ───────────────────────────────────────────────────────────

export const getDealByIdAction = async (dealId) => {
  try {
    const token = await getServerToken();
    const { data, error } = await apiGet(`/v1/app/deals/${dealId}`, token);
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    return { errorMessage: err.message };
  }
};

// ─── Get Partners List ────────────────────────────────────────────────────────

export const getPartnersListAction = async () => {
  try {
    const token = await getServerToken();
    const { data, error } = await apiGet("/v1/app/partners/all", token);
    if (error) throw new Error(error);
    // Map to { id, name } shape expected by consumers (FastAPI uses `title`)
    return (data || []).map((p) => ({ id: p.id, name: p.title }));
  } catch (err) {
    console.error("[getPartnersListAction] Error:", err);
    return [];
  }
};

// ─── Admin: Create Deal ───────────────────────────────────────────────────────

export const createDealAction = async (dealData) => {
  try {
    const token = await getServerToken();
    const { error } = await apiPost("/v1/app/deals/", dealData, token);
    if (error) throw new Error(error);

    revalidatePath("/admin/deals");
    revalidatePath("/dashboard/deals");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("[createDealAction] Error:", err);
    return { success: false, error: err.message };
  }
};

// ─── Admin: Update Deal ───────────────────────────────────────────────────────

export const updateDealAction = async (dealId, dealData) => {
  try {
    const token = await getServerToken();
    const { error } = await apiPut(`/v1/app/deals/${dealId}`, dealData, token);
    if (error) throw new Error(error);

    revalidatePath("/admin/deals");
    revalidatePath("/dashboard/deals");
    revalidatePath(`/dashboard/deals/${dealId}`);
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("[updateDealAction] Error:", err);
    return { success: false, error: err.message };
  }
};

// ─── Admin: Delete Deal ───────────────────────────────────────────────────────

export const deleteDealAction = async (dealId) => {
  try {
    const token = await getServerToken();
    const { error } = await apiDelete(`/v1/app/deals/${dealId}`, token);
    if (error) throw new Error(error);

    revalidatePath("/admin/deals");
    revalidatePath("/dashboard/deals");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
