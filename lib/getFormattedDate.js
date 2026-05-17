import { dateUSLong, dateTimeUSShort } from "./formatters.js";

/**
 * Formats a date string into a long date format (en-US).
 * Uses hoisted Intl.DateTimeFormat for performance.
 */
export const getFormattedDate = (dateString) => {
  return dateUSLong.format(new Date(dateString));
};

/**
 * Formats a date string into a short date-time format (en-US).
 * Uses hoisted Intl.DateTimeFormat for performance.
 */
export const getFormattedDateTime = (dateString) => {
  return dateTimeUSShort.format(new Date(dateString));
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
