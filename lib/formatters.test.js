import test from "node:test";
import assert from "node:assert";
import {
  currencyGBP,
  dateGBShort,
  dateGBLong,
  dateUSShort,
  dateUSLong,
} from "./formatters.js";

test("currencyGBP formatter", () => {
  const result = currencyGBP.format(1234.56);
  // Support both standard space and non-breaking space
  assert.ok(result.includes("£1,234.56"));
});

test("dateGBShort formatter", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateGBShort.format(date);
  assert.strictEqual(result, "25 Dec 2023");
});

test("dateGBLong formatter", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateGBLong.format(date);
  assert.strictEqual(result, "25 December 2023");
});

test("dateUSShort formatter", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateUSShort.format(date);
  assert.strictEqual(result, "Dec 25, 2023");
});

test("dateUSLong formatter", () => {
  const date = new Date("2023-12-25T12:00:00Z");
  const result = dateUSLong.format(date);
  assert.strictEqual(result, "December 25, 2023");
});
