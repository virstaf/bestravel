/**
 * Centralized Intl formatters to improve performance by avoiding redundant object creation.
 * Hoisting these to the module scope ensures they are only instantiated once.
 */

const formatters = {
  currencyGBP: new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }),

  dateGBShort: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),

  dateGBLong: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),

  dateUSLong: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),

  dateUSShort: new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),

  dateUSShortDateTime: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
};

/**
 * Safe wrapper for date formatting to handle invalid inputs gracefully.
 * @param {Intl.DateTimeFormat} formatter
 * @param {any} date
 * @returns {string}
 */
const safeFormatDate = (formatter, date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";
  return formatter.format(d);
};

/**
 * Safe wrapper for currency formatting.
 * @param {Intl.NumberFormat} formatter
 * @param {number} amount
 * @returns {string}
 */
const safeFormatCurrency = (formatter, amount) => {
  return formatter.format(amount || 0);
};

export const formatCurrencyGBP = (amount) =>
  safeFormatCurrency(formatters.currencyGBP, amount);

export const formatDateGBShort = (date) =>
  safeFormatDate(formatters.dateGBShort, date);

export const formatDateGBLong = (date) =>
  safeFormatDate(formatters.dateGBLong, date);

export const formatDateUSLong = (date) =>
  safeFormatDate(formatters.dateUSLong, date);

export const formatDateUSShort = (date) =>
  safeFormatDate(formatters.dateUSShort, date);

export const formatDateUSShortDateTime = (date) =>
  safeFormatDate(formatters.dateUSShortDateTime, date);
