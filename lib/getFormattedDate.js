import { dateUSLong, dateUSShortDateTime } from "./formatters.js";

/**
 * Optimized date formatting using hoisted Intl instances.
 */
export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return dateUSLong.format(date);
};

export const getFormattedDateTime = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return dateUSShortDateTime.format(date);
};


export const getBackLink = (currentPath) => {
  // Handle edge cases
  if (!currentPath || currentPath === '/') return '/';
  
  const segments = currentPath.split('/').filter(segment => segment);
  
  // If we're at a top-level path like "/admin", go to home
  if (segments.length === 1) return '/';
  
  // Remove the last segment and reconstruct path
  segments.pop();
  return `/${segments.join('/')}`;
};
