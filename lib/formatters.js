/**
 * Hoisted Intl formatters to avoid redundant object creation on every render.
 * These are particularly useful for components rendered in lists or frequently updated.
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

export const dateUSShortDateTime = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
