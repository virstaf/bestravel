/**
 * Centralized, hoisted Intl formatters for high-performance data formatting.
 * Reusing these instances avoids the significant overhead of repeated object creation.
 */

export const dateLongUS = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const dateTimeShortUS = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Safely formats a date using the provided formatter.
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
