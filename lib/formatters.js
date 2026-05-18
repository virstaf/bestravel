/**
 * Centralized Intl formatters for better performance.
 * Hoisting these prevents redundant object instantiation on every render.
 */

export const currencyGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const dateGBShort = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const dateGBLong = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const dateUSLong = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const dateUSDateTime = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
