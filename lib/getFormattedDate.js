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

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Validates if a date string is valid.
 * @param {string} dateString
 * @returns {boolean}
 */
const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Optimized date formatter using hoisted Intl.DateTimeFormat.
 * @param {string} dateString
 * @returns {string}
 */
export const getFormattedDate = (dateString) => {
  if (!isValidDate(dateString)) return "N/A";
  return dateFormatter.format(new Date(dateString));
};

/**
 * Optimized date-time formatter using hoisted Intl.DateTimeFormat.
 * @param {string} dateString
 * @returns {string}
 */
export const getFormattedDateTime = (dateString) => {
  if (!isValidDate(dateString)) return "N/A";
  return dateTimeFormatter.format(new Date(dateString));
};

/**
 * Optimized short date formatter (DD MMM YYYY) using hoisted Intl.DateTimeFormat.
 * @param {string} dateString
 * @returns {string}
 */
export const getShortDate = (dateString) => {
  if (!isValidDate(dateString)) return "N/A";
  return shortDateFormatter.format(new Date(dateString));
};

/**
 * Gets the back link for a given path.
 * @param {string} currentPath
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
