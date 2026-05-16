/**
 * Hoisted Intl.DateTimeFormat instances to avoid redundant object creation on every call.
 * This improves performance by reusing the same formatter instance.
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
 * Formats a date string into a long date format (e.g., January 1, 2024).
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date.
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "" : dateFormatter.format(date);
};

/**
 * Formats a date string into a short date format with time (e.g., Jan 1, 2024, 12:00 PM).
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date and time.
 */
export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "" : dateTimeFormatter.format(date);
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
