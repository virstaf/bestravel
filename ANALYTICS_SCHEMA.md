# Analytics Schema & Implementation Guide

This document outlines the analytics and conversion tracking system implemented for Virs Travel Club. The system is built on Google Tag Manager (GTM) via Next.js `@next/third-parties/google` component, with the `dataLayer` used for event orchestration.

## Data Layer Architecture

We use a standard `dataLayer.push` design with a strict `snake_case` naming convention for both events and parameters to ensure cross-platform compatibility (GA4, Meta Pixel, etc.).

### Generic Format:
```javascript
window.dataLayer.push({
  event: "event_name",
  parameter_1: "value",
  parameter_2: 123
});
```

The system uses a centralized, type-safe utility located at `lib/analytics.ts` which exposes the `trackEvent` function to prevent misspelled events and missing parameters.

## Core Tracked Events & Parameters

| Event Name | Description | Parameters |
|---|---|---|
| `page_view` | Fired automatically on route change | `page_path` (string), `page_title` (string, optional) |
| `click_cta` | Fired when a user clicks an important call-to-action button | `cta_name` (string), `cta_id` (string, optional) |
| `start_signup` | Fired when a user begins the signup process | None |
| `sign_up_completed` | Fired upon successful account creation *(Conversion)* | None |
| `view_pricing` | Fired when pricing or membership plans are viewed | `plan_name` (string, optional) |
| `select_plan` | Fired when a user selects a specific tier | `plan_name` (string) |
| `membership_purchase` | Fired on successful subscription/membership payment *(Conversion)* | `plan_name` (string), `price` (number), `billing_cycle` (string), `currency` (string, defaults to GBP) |
| `view_deal` | Fired when a user views a specific deal page | `deal_id` (string), `destination` (string) |
| `search` | Fired when a user performs a search | `query` (string) |
| `start_booking` | Fired when user clicks 'Book This Deal' | `destination` (string) |
| `booking_completed`| Fired upon successful booking confirmation *(Conversion)* | `value` (number), `destination` (string), `currency` (string, defaults to GBP) |
| `newsletter_signup`| Fired when user subscribes to email list | None |
| `contact_submission`| Fired on successful contact form submit | None |

## Conversion Tracking (GA4)

The following events should be marked as **Conversions** in Google Analytics 4:
* `sign_up_completed`
* `booking_completed`
* `membership_purchase`

## Funnels

Ensure the above events support analyzing the following critical paths.

### 1. Signup Funnel
`page_view` (homepage) → `click_cta` (e.g. "Get Started") → `start_signup` → `sign_up_completed`

### 2. Booking Funnel
`view_deal` → `click_cta` ("Book This Deal Now") → `start_booking` → `booking_completed`

## Meta Pixel Integration via GTM

Within Google Tag Manager, the custom dataLayer events mapped above should trigger corresponding Meta Pixel standard events:

| DataLayer Event | Meta Pixel Event | Meta Parameters to Map |
|---|---|---|
| `page_view` | `PageView` | URL, Title |
| `sign_up_completed`| `CompleteRegistration` | None |
| `view_deal` | `ViewContent` | `content_ids` (deal_id), `content_type` ('product') |
| `start_booking` | `InitiateCheckout` | None |
| `booking_completed`| `Purchase` | `value` (value), `currency` (currency) |
| `membership_purchase`| `Purchase` / `Subscribe` | `value` (price), `currency` (currency), `content_name` (plan_name) |

## Development & Debugging
- `NEXT_PUBLIC_GTM_ID` is required in your `.env.local` to initialize GTM.
- When `NODE_ENV === "development"`, events are logged to the console (e.g., `[Analytics Track]: view_deal {deal_id: "1", destination: "Dubai"}`).
- Validate tags firing correctly via GTM Preview Mode and GA4 DebugView.
- The `trackEvent` function is client-safe; it automatically aborts when executed server-side to prevent SSR errors.