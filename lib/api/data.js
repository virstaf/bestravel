/**
 * FastAPI Data API — Trips, Reservations, Quotes, Deals
 *
 * These are thin wrappers used when making API calls directly from
 * client components (not server actions). Server actions should import
 * from @/lib/api/client directly.
 */

import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "./client.js";

// ─── Trips ─────────────────────────────────────────────────────────────────────

export const tripsAPI = {
  getByUser: (userId, token) => apiGet(`/v1/app/trips/trip_by/${userId}`, token),
  getById: (tripId, token) => apiGet(`/v1/app/trips/${tripId}`, token),
  create: (data, token) => apiPost("/v1/app/trips/", data, token),
  update: (tripId, data, token) => apiPut(`/v1/app/trips/${tripId}`, data, token),
  delete: (tripId, token) => apiDelete(`/v1/app/trips/${tripId}`, token),
};

// ─── Reservations ─────────────────────────────────────────────────────────────

export const reservationsAPI = {
  create: (data, token) => apiPost("/v1/app/reservations/", data, token),
  getById: (id, token) => apiGet(`/v1/app/reservations/${id}`, token),
  getByUser: (userId, token) => apiGet(`/v1/app/reservations/by_user_id/${userId}`, token),
  getByTrip: (tripId, token) => apiGet(`/v1/app/reservations/by_trip_id/${tripId}`, token),
  update: (id, data, token) => apiPut(`/v1/app/reservations/${id}`, data, token),
  delete: (id, token) => apiDelete(`/v1/app/reservations/${id}`, token),
};

// ─── Quotes ───────────────────────────────────────────────────────────────────

export const quotesAPI = {
  create: (data, token) => apiPost("/v1/app/quotes/", data, token),
  getByUser: (userId, token) => apiGet(`/v1/app/quotes/quotes_by/${userId}`, token),
  getItems: (quoteId, token) => apiGet(`/v1/app/quotes/items_by/${quoteId}`, token),
  updateStatus: (quoteId, data, token) => apiPatch(`/v1/app/quotes/${quoteId}/status`, data, token),
  createItem: (data) => apiPost("/v1/app/quotes/quote-items", data),
  createRevision: (data) => apiPost("/v1/app/quotes/quote-revisions", data),
};

// ─── Deals ────────────────────────────────────────────────────────────────────

export const dealsAPI = {
  getAll: (token) => apiGet("/v1/app/deals/grab/all", token),
  getById: (dealId, token) => apiGet(`/v1/app/deals/${dealId}`, token),
  create: (data, token) => apiPost("/v1/app/deals/", data, token),
  update: (dealId, data, token) => apiPut(`/v1/app/deals/${dealId}`, data, token),
  delete: (dealId, token) => apiDelete(`/v1/app/deals/${dealId}`, token),
};

// ─── Partners ─────────────────────────────────────────────────────────────────

export const partnersAPI = {
  getAll: (token) => apiGet("/v1/app/partners/all", token),
  getById: (partnerId, token) => apiGet(`/v1/app/partners/${partnerId}`, token),
  create: (data, token) => apiPost("/v1/app/partners/", data, token),
  update: (partnerId, data, token) => apiPut(`/v1/app/partners/${partnerId}`, data, token),
  delete: (partnerId, token) => apiDelete(`/v1/app/partners/${partnerId}`, token),
};

// ─── Flights ──────────────────────────────────────────────────────────────────

export const flightsAPI = {
  create: (data, token) => apiPost("/v1/app/flights/", data, token),
  getById: (id, token) => apiGet(`/v1/app/flights/${id}`, token),
  getByTrip: (tripId, token) => apiGet(`/v1/app/flights/trip/${tripId}`, token),
  getByReservation: (reservationId, token) => apiGet(`/v1/app/flights/reservation/${reservationId}`, token),
  update: (id, data, token) => apiPut(`/v1/app/flights/${id}`, data, token),
  delete: (id, token) => apiDelete(`/v1/app/flights/${id}`, token),
};

// ─── Hotels ───────────────────────────────────────────────────────────────────

export const hotelsAPI = {
  create: (data, token) => apiPost("/v1/app/hotels/", data, token),
  getById: (id, token) => apiGet(`/v1/app/hotels/${id}`, token),
  getByTrip: (tripId, token) => apiGet(`/v1/app/hotels/trip/${tripId}`, token),
  getByReservation: (reservationId, token) => apiGet(`/v1/app/hotels/reservation/${reservationId}`, token),
  update: (id, data, token) => apiPut(`/v1/app/hotels/${id}`, data, token),
  delete: (id, token) => apiDelete(`/v1/app/hotels/${id}`, token),
};

// ─── Transfers ────────────────────────────────────────────────────────────────

export const transfersAPI = {
  create: (data, token) => apiPost("/v1/app/transfers/", data, token),
  getById: (id, token) => apiGet(`/v1/app/transfers/${id}`, token),
  getAll: (token) => apiGet("/v1/app/transfers/all", token),
  update: (id, data, token) => apiPut(`/v1/app/transfers/${id}`, data, token),
  delete: (id, token) => apiDelete(`/v1/app/transfers/${id}`, token),
};
