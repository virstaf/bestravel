/**
 * Centralized Intl formatters to avoid redundant object instantiation
 * and improve performance across the application.
 */

// Hoisted Intl instances
const currencyGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const dateGBLong = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateGBShort = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dateUSLong = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateUSShortDateTime = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Formats a number as GBP currency.
 * @param {number|null|undefined} amount
 * @returns {string}
 */
export const formatCurrencyGBP = (amount) => {
  return currencyGBP.format(amount || 0);
};

/**
 * Formats a date string using en-GB locale (Long).
 * @param {string|null|undefined} dateString
 * @returns {string}
 */
export const formatDateGBLong = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : dateGBLong.format(date);
};

/**
 * Formats a date string using en-GB locale (Short).
 * @param {string|null|undefined} dateString
 * @returns {string}
 */
export const formatDateGBShort = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : dateGBShort.format(date);
};

/**
 * Formats a date string using en-US locale (Long).
 * @param {string|null|undefined} dateString
 * @returns {string}
 */
export const formatDateUSLong = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : dateUSLong.format(date);
};

/**
 * Formats a date string using en-US locale (Short Date Time).
 * @param {string|null|undefined} dateString
 * @returns {string}
 */
export const formatDateUSShortDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : dateUSShortDateTime.format(date);
};
