"use client";

// Define the custom Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

// ---------------------------------------------------------------------------
// Event Parameter Types
// ---------------------------------------------------------------------------

export type PageViewParams = {
  page_path: string;
  page_title?: string;
};

export type ClickCtaParams = {
  cta_name: string; // The text or name of the button
  cta_id?: string;  // Unique ID of the button (optional)
};

export type ViewDealParams = {
  deal_id: string;
  destination: string;
};

export type SearchParams = {
  query: string;
};

export type StartBookingParams = {
  destination: string;
};

export type BookingCompletedParams = {
  value: number;
  currency?: string; // e.g., "GBP", default will be "GBP"
  destination: string;
};

export type ViewPricingParams = {
  plan_name?: string;
};

export type SelectPlanParams = {
  plan_name: string;
};

export type MembershipPurchaseParams = {
  plan_name: string;
  price: number;
  billing_cycle: string; // e.g., "monthly", "yearly"
  currency?: string; // defaults to "GBP"
};

export type EmptyParams = Record<string, never>;

// ---------------------------------------------------------------------------
// Event Map
// ---------------------------------------------------------------------------

export interface TrackingEvents {
  // Core Events
  page_view: PageViewParams;
  click_cta: ClickCtaParams;

  // User Acquisition & Signup
  start_signup: EmptyParams;
  sign_up_completed: EmptyParams;

  // Pricing & Membership
  view_pricing: ViewPricingParams;
  select_plan: SelectPlanParams;
  membership_purchase: MembershipPurchaseParams;

  // Deals & Engagement
  view_deal: ViewDealParams;
  search: SearchParams;

  // Booking Flow
  start_booking: StartBookingParams;
  booking_completed: BookingCompletedParams;

  // Other
  newsletter_signup: EmptyParams;
  contact_submission: EmptyParams;
}

// ---------------------------------------------------------------------------
// Core Tracking Function
// ---------------------------------------------------------------------------

/**
 * Pushes an event to the GTM dataLayer in snake_case format.
 *
 * @param eventName The name of the event from the TrackingEvents map.
 * @param params The typed parameters corresponding to the event.
 */
export const trackEvent = <K extends keyof TrackingEvents>(
  eventName: K,
  ...args: TrackingEvents[K] extends EmptyParams ? [] : [TrackingEvents[K]]
) => {
  if (typeof window === "undefined") {
    return; // Don't track on the server
  }

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  const params = args[0] || {};

  // For booking/purchases, default currency to GBP if not provided
  if ("currency" in params === false && ("value" in params || "price" in params)) {
    (params as any).currency = "GBP";
  }

  const eventPayload = {
    event: eventName,
    ...params,
  };

  window.dataLayer.push(eventPayload);

  // Useful for debugging in development:
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Track]: ${eventName}`, params);
  }
};
