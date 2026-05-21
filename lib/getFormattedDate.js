import { dateUSLong, dateUSShortDateTime } from "./formatters.js";

/**
 * Formats a date string using the hoisted dateUSLong formatter.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date.
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return "N/A";
  return dateUSLong.format(new Date(dateString));
};

/**
 * Formats a date-time string using the hoisted dateUSShortDateTime formatter.
 * @param {string} dateString - The date-time string to format.
 * @returns {string} The formatted date-time.
 */
export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "N/A";
  return dateUSShortDateTime.format(new Date(dateString));
};

/**
 * Returns the parent path of a given current path.
 * @param {string} currentPath - The current path.
 * @returns {string} The back link path.
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
