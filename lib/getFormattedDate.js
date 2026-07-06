import { dateLongUS, dateTimeShortUS, safeFormatDate } from "./formatters.js";

/**
 * Formats a date string into a long US format (e.g., January 1, 2024).
 * Uses hoisted Intl.DateTimeFormat for performance.
 */
export const getFormattedDate = (dateString) => {
  return safeFormatDate(dateString, dateLongUS);
};

/**
 * Formats a date string into a short US datetime format.
 * Uses hoisted Intl.DateTimeFormat for performance.
 */
export const getFormattedDateTime = (dateString) => {
  return safeFormatDate(dateString, dateTimeShortUS);
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
