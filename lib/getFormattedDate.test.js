import test from "node:test";
import assert from "node:assert";
import {
  getFormattedDate,
  getFormattedDateTime,
  getBackLink,
} from "./getFormattedDate.js";

test("getFormattedDate", async (t) => {
  await t.test("formats a valid date string", () => {
    const date = "2024-05-15";
    const formatted = getFormattedDate(date);
    // Note: Result can vary slightly by timezone in some environments,
    // but the format should be "Month Day, Year"
    assert.ok(formatted.includes("May 15, 2024") || formatted.includes("May 14, 2024"));
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDate(null), "N/A");
  });

  await t.test('returns "N/A" for invalid date', () => {
    assert.strictEqual(getFormattedDate("invalid-date"), "N/A");
  });
});

test("getFormattedDateTime", async (t) => {
  await t.test("formats a valid datetime string", () => {
    const date = "2024-05-15T10:00:00Z";
    const formatted = getFormattedDateTime(date);
    // Format: "May 15, 2024, 10:00 AM" or similar depending on locale/TZ
    assert.ok(formatted.includes("May 15, 2024") || formatted.includes("May 14, 2024"));
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDateTime(null), "N/A");
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

  await t.test("returns \"/\" for top-level path without leading slash", () => {
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
