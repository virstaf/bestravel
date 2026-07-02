// lib/getFormattedDate.js

// Hoist Intl.DateTimeFormat instances for performance.
// This avoids recreating the formatter on every function call.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Formats a date string to "Month Day, Year" (e.g., "May 16, 2024").
 * @param {string|Date} dateString - The date to format.
 * @returns {string} The formatted date or "N/A" if invalid.
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return dateFormatter.format(date);
  } catch (error) {
    return "N/A";
  }
};

/**
 * Formats a date string to a shorter date with time (e.g., "May 16, 2024, 12:00 PM").
 * @param {string|Date} dateString - The date to format.
 * @returns {string} The formatted date/time or "N/A" if invalid.
 */
export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return dateTimeFormatter.format(date);
  } catch (error) {
    return "N/A";
  }
};

/**
 * Returns the parent path for a given path.
 * @param {string} currentPath - The current URL path.
 * @returns {string} The parent path.
 */
export const getBackLink = (currentPath) => {
  // Handle edge cases
  if (!currentPath || currentPath === "/") return "/";

  const segments = currentPath.split("/").filter((segment) => segment);

  // If we're at a top-level path like "/admin", go to home
  if (segments.length === 1) return "/";

  // Remove the last segment and reconstruct path
  segments.pop();
  return `/${segments.join("/")}`;
};
