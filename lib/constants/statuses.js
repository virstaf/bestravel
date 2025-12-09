/**
 * Valid status values for different entities
 * These must match the database check constraints
 */

// Reservation statuses
export const RESERVATION_STATUS = {
  PENDING: "pending",
  IN_REVIEW: "in review",
  CONFIRMED: "confirmed",
  ACTIVE: "active",
  COMPLETED: "completed",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
};

// Quote statuses
export const QUOTE_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  SENT: "sent",
  IN_REVIEW: "in review",
  CONFIRMED: "confirmed",
  ACCEPTED: "accepted",
  ACTIVE: "active",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
};

// Trip statuses
export const TRIP_STATUS = {
  PLANNING: "planning",
  CONFIRMED: "confirmed",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Helper to get all valid statuses for a type
export const getValidStatuses = (type) => {
  switch (type) {
    case "reservation":
      return Object.values(RESERVATION_STATUS);
    case "quote":
      return Object.values(QUOTE_STATUS);
    case "trip":
      return Object.values(TRIP_STATUS);
    default:
      return [];
  }
};

// Helper to validate status
export const isValidStatus = (status, type) => {
  return getValidStatuses(type).includes(status);
};
