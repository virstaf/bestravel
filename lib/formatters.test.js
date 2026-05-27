import test from "node:test";
import assert from "node:assert";
import {
  currencyGBP,
  dateGBShort,
  dateGBLong,
  dateUSLong,
  dateUSShortDateTime,
} from "./formatters.js";

test("currencyGBP formats correctly", () => {
  const result = currencyGBP.format(1234.56);
  // Using a regex to be flexible with different space characters (e.g., non-breaking space)
  assert.match(result, /£1,234\.56/);
});

test("dateGBShort formats correctly", () => {
  const date = new Date("2025-05-16T12:00:00Z");
  const result = dateGBShort.format(date);
  // Should be like "16 May 2025" or similar depending on environment, but checking for key components
  assert.ok(result.includes("16"));
  assert.ok(result.includes("May"));
  assert.ok(result.includes("2025"));
});

test("dateGBLong formats correctly", () => {
  const date = new Date("2025-05-16T12:00:00Z");
  const result = dateGBLong.format(date);
  assert.ok(result.includes("16"));
  assert.ok(result.includes("May"));
  assert.ok(result.includes("2025"));
});

test("dateUSLong formats correctly", () => {
  const date = new Date("2025-05-16T12:00:00Z");
  const result = dateUSLong.format(date);
  assert.ok(result.includes("May"));
  assert.ok(result.includes("16"));
  assert.ok(result.includes("2025"));
});

test("dateUSShortDateTime formats correctly", () => {
  const date = new Date("2025-05-16T12:30:00Z");
  const result = dateUSShortDateTime.format(date);
  assert.ok(result.includes("May"));
  assert.ok(result.includes("16"));
  assert.ok(result.includes("2025"));
  assert.ok(result.includes("12:30") || result.includes("12:30 PM") || result.includes("05:30")); // Time might vary by TZ, but check for format
});
