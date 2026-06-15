import test from "node:test";
import assert from "node:assert";
import {
  getBackLink,
  getFormattedDate,
  getFormattedDateTime,
  getFormattedShortDate,
  getFormattedMonthDay,
  isValidDate,
} from "./getFormattedDate.js";

test("isValidDate", async (t) => {
  await t.test("returns true for valid date strings", () => {
    assert.strictEqual(isValidDate("2023-01-01"), true);
    assert.strictEqual(isValidDate("2023-12-31T23:59:59Z"), true);
  });

  await t.test("returns true for Date objects", () => {
    assert.strictEqual(isValidDate(new Date()), true);
  });

  await t.test("returns false for invalid date strings", () => {
    assert.strictEqual(isValidDate("invalid-date"), false);
    assert.strictEqual(isValidDate(""), false);
  });

  await t.test("returns false for null or undefined", () => {
    assert.strictEqual(isValidDate(null), false);
    assert.strictEqual(isValidDate(undefined), false);
  });
});

test("getFormattedDate", async (t) => {
  await t.test("formats valid date correctly", () => {
    const result = getFormattedDate("2024-05-16");
    assert.ok(result.includes("May"));
    assert.ok(result.includes("2024"));
  });

  await t.test('returns "N/A" for invalid date', () => {
    assert.strictEqual(getFormattedDate(null), "N/A");
    assert.strictEqual(getFormattedDate("invalid"), "N/A");
  });
});

test("getFormattedDateTime", async (t) => {
  await t.test("formats valid date-time correctly", () => {
    const result = getFormattedDateTime("2024-05-16T15:30:00Z");
    assert.ok(result.includes("May"));
    assert.ok(result.includes("2024"));
    assert.ok(/\d{1,2}:\d{2}/.test(result));
  });

  await t.test('returns "N/A" for invalid date-time', () => {
    assert.strictEqual(getFormattedDateTime(null), "N/A");
  });
});

test("getFormattedShortDate", async (t) => {
  await t.test("formats valid date correctly", () => {
    const result = getFormattedShortDate("2024-05-16");
    assert.ok(result.includes("May"));
    assert.ok(result.includes("16") || result.includes("15"));
    assert.ok(result.includes("2024"));
  });

  await t.test('returns "N/A" for invalid short date', () => {
    assert.strictEqual(getFormattedShortDate(undefined), "N/A");
  });
});

test("getFormattedMonthDay", async (t) => {
  await t.test("formats valid date correctly", () => {
    const result = getFormattedMonthDay("2024-05-16");
    assert.ok(result.includes("May"));
    assert.ok(result.includes("16") || result.includes("15"));
  });

  await t.test('returns "N/A" for invalid month-day', () => {
    assert.strictEqual(getFormattedMonthDay(""), "N/A");
  });
});

test("getBackLink - edge cases", async (t) => {
  await t.test('returns "/" for empty path', () => {
    assert.strictEqual(getBackLink(""), "/");
  });

  await t.test('returns "/" for null path', () => {
    assert.strictEqual(getBackLink(null), "/");
  });

  await t.test('returns "/" for undefined path', () => {
    assert.strictEqual(getBackLink(undefined), "/");
  });

  await t.test('returns "/" for root path', () => {
    assert.strictEqual(getBackLink("/"), "/");
  });
});

test("getBackLink - top-level paths", async (t) => {
  await t.test('returns "/" for top-level path like "/admin"', () => {
    assert.strictEqual(getBackLink("/admin"), "/");
  });

  await t.test('returns "/" for top-level path without leading slash', () => {
    assert.strictEqual(getBackLink("admin"), "/");
  });
});

test("getBackLink - nested paths", async (t) => {
  await t.test("returns parent path for nested paths", () => {
    assert.strictEqual(getBackLink("/admin/settings"), "/admin");
    assert.strictEqual(getBackLink("/blog/posts/1"), "/blog/posts");
  });

  await t.test("handles paths without leading slash", () => {
    assert.strictEqual(getBackLink("admin/settings"), "/admin");
  });
});

test("getBackLink - complex paths", async (t) => {
  await t.test("handles trailing slashes", () => {
    assert.strictEqual(getBackLink("/admin/settings/"), "/admin");
  });

  await t.test("handles multiple consecutive slashes", () => {
    assert.strictEqual(getBackLink("/admin//settings"), "/admin");
    assert.strictEqual(getBackLink("///admin///settings///"), "/admin");
  });
});
