/**
 * Status Helper Functions
 * Automatically calculate status based on dates and current state
 */

/**
 * Calculate reservation status based on dates and current status
 * @param {Object} reservation - The reservation object
 * @returns {string} - The calculated status
 */
export const getReservationStatus = (reservation) => {
  if (!reservation) return "unknown";
  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  
  // If manually cancelled, always show cancelled
  if (reservation.status === "cancelled") {
    return "cancelled";
  }
  
  // Get the relevant date based on reservation type
  let reservationDate;
  if (reservation.type === "flight") {
    reservationDate = new Date(reservation.details?.departureDate);
  } else if (reservation.type === "hotel") {
    reservationDate = new Date(reservation.details?.checkIn);
  } else if (reservation.type === "transfer") {
    reservationDate = new Date(reservation.details?.pickupDate);
  }
  
  if (!reservationDate || isNaN(reservationDate.getTime())) {
    return reservation.status || "pending";
  }
  
  reservationDate.setHours(0, 0, 0, 0);
  
  // If reservation date has passed, mark as completed or expired
  if (reservationDate < currentDate) {
    return reservation.status === "confirmed" ? "completed" : "expired";
  }
  
  // If confirmed and date is in future, it's active
  if (reservation.status === "confirmed") {
    return "active";
  }
  
  // Otherwise return the current status (pending, in review, etc.)
  return reservation.status || "pending";
};

/**
 * Calculate quote status based on valid_until date and current status
 * @param {Object} quote - The quote object
 * @returns {string} - The calculated status
 */
export const getQuoteStatus = (quote) => {
  if (!quote) return "unknown";
  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  // If manually cancelled or rejected, always show that status
  if (quote.status === "cancelled" || quote.status === "rejected") {
    return quote.status;
  }
  
  // If confirmed/accepted, it's active
  if (quote.status === "confirmed" || quote.status === "accepted") {
    return "active";
  }
  
  // Check if quote has expired based on valid_until date
  if (quote.valid_until) {
    const validUntil = new Date(quote.valid_until);
    validUntil.setHours(0, 0, 0, 0);
    
    if (validUntil < currentDate && quote.status !== "confirmed") {
      return "expired";
    }
  }
  
  // Return current status (pending, in review, etc.)
  return quote.status || "pending";
};

/**
 * Calculate trip status based on dates and current status
 * @param {Object} trip - The trip object
 * @returns {string} - The calculated status
 */
export const getTripStatus = (trip) => {
  if (!trip) return "unknown";
  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  // If manually cancelled, always show cancelled
  if (trip.status === "cancelled") {
    return "cancelled";
  }
  
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  
  // If end date has passed, trip is completed
  if (endDate < currentDate) {
    return "completed";
  }
  
  // If currently between start and end date, trip is active
  if (startDate <= currentDate && currentDate <= endDate) {
    return "active";
  }
  
  // If start date is in the future, trip is planning/upcoming
  if (startDate > currentDate) {
    return trip.status === "confirmed" ? "confirmed" : "planning";
  }
  
  return trip.status || "planning";
};

/**
 * Get status color classes for UI display
 * @param {string} status - The status value
 * @returns {string} - Tailwind CSS classes for the status
 */
export const getStatusColor = (status) => {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
    planning: "bg-blue-100 text-blue-800",
    "in review": "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
    expired: "bg-yellow-100 text-yellow-800",
  };
  
  return statusColors[status] || "bg-gray-100 text-gray-800";
};
