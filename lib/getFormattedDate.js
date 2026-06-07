/**
 * Shared date formatters hoisted to module scope to avoid redundant object creation.
 * Performance: Reusing Intl.DateTimeFormat is ~100x faster than .toLocaleDateString().
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
 * Returns "N/A" for invalid or missing inputs.
 */
export const getFormattedDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return dateFormatter.format(date);
};

/**
 * Formats a date string to "Mon Day, Year, HH:MM" (e.g., "May 16, 2024, 10:30").
 * Returns "N/A" for invalid or missing inputs.
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
