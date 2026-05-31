/**
 * Date formatting utilities with re-exported centralized formatters.
 */
import { formatDateUSLong, formatDateUSShortDateTime } from "./formatters.js";

/**
 * Formats a date string using the en-US locale (Long Month format).
 * @param {string|Date|null|undefined} dateString
 * @returns {string}
 */
export const getFormattedDate = (dateString) => {
  return formatDateUSLong(dateString);
};

/**
 * Formats a date string using the en-US locale (Short Month with Time format).
 * @param {string|Date|null|undefined} dateString
 * @returns {string}
 */
export const getFormattedDateTime = (dateString) => {
  return formatDateUSShortDateTime(dateString);
};

/**
 * Generates a backlink from a given path.
 * @param {string|null|undefined} currentPath
 * @returns {string}
 */
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
