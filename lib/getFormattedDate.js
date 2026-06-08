/**
 * Hoisted formatters to module scope for performance optimization.
 * Reusing Intl.DateTimeFormat instances is ~40x faster than .toLocaleDateString()
 */
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Checks if a value is a valid Date object.
 */
const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

/**
 * Formats a date string to "Month Day, Year" (e.g., "May 15, 2023").
 * @param {string|Date} dateString - The date to format.
 * @returns {string} Formatted date or "N/A" if invalid.
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (!isValidDate(date)) return "N/A";
  return DATE_FORMATTER.format(date);
};

/**
 * Formats a date string to a short date with time (e.g., "May 15, 2023, 10:00 AM").
 * @param {string|Date} dateString - The date to format.
 * @returns {string} Formatted date/time or "N/A" if invalid.
 */
export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (!isValidDate(date)) return "N/A";
  return DATE_TIME_FORMATTER.format(date);
};

/**
 * Utility to calculate the back link based on current path.
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
