/**
 * Hoisted Intl formatters for high-performance data formatting.
 * Reusing these instances is significantly faster than creating new ones on every call.
 */

export const currencyGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const dateLongUS = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const dateShortUS = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const dateLongGB = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const dateShortGB = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const dateTimeShortUS = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Format an amount in GBP.
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export const formatCurrencyGBP = (amount) => {
  return currencyGBP.format(amount || 0);
};

/**
 * Validates a date string and formats it using the provided formatter.
 * @param {string|Date} date - The date to format.
 * @param {Intl.DateTimeFormat} formatter - The formatter to use.
 * @returns {string} The formatted date or 'N/A' if invalid.
 */
export const safeFormatDate = (date, formatter) => {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";
  return formatter.format(d);
};
