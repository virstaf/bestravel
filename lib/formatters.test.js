import { test } from "node:test";
import assert from "node:assert";
import { currencyGBP, dateGBShort, dateGBLong, dateUSLong, dateUSShortDateTime } from "./formatters.js";

test("currencyGBP formats currency correctly", () => {
  const result = currencyGBP.format(1234.56);
  // Using includes because of different whitespace characters in different environments
  assert.ok(result.includes("£1,234.56"));
});

test("dateGBShort formats date correctly", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateGBShort.format(date);
  // Match "25 Dec 2023" (might vary slightly by locale/env)
  assert.ok(result.includes("25 Dec 2023"));
});

test("dateGBLong formats date correctly", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateGBLong.format(date);
  assert.ok(result.includes("25 December 2023"));
});

test("dateUSLong formats date correctly", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateUSLong.format(date);
  assert.ok(result.includes("December 25, 2023"));
});

test("dateUSShortDateTime formats date and time correctly", () => {
  const date = new Date("2023-12-25T15:30:00");
  const result = dateUSShortDateTime.format(date);
  assert.ok(result.includes("Dec 25, 2023"));
  assert.ok(result.includes("03:30"));
});
