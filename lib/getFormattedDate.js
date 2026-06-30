/**
 * Performance-optimized date formatting utilities.
 * Uses hoisted Intl.DateTimeFormat instances to avoid expensive re-initialization.
 */

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
 * @param {string} dateString
 * @returns {string}
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return dateFormatter.format(date);
};

/**
 * Formats a date string to "Month Day, Year, Time" (e.g., "May 16, 2024, 12:00 PM").
 * @param {string} dateString
 * @returns {string}
 */
export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return dateTimeFormatter.format(date);
};

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
