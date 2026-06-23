import test from "node:test";
import assert from "node:assert";
import {
  getFormattedDate,
  getFormattedDateTime,
  getBackLink,
} from "./getFormattedDate.js";

test("getFormattedDate", async (t) => {
  await t.test("formats a valid date string", () => {
    const date = "2024-05-16T00:00:00Z";
    const formatted = getFormattedDate(date);
    // Use includes to be resilient to timezone differences in CI if any
    // "May 16, 2024" or "May 15, 2024" depending on environment
    assert.ok(
      formatted.includes("May 16, 2024") || formatted.includes("May 15, 2024")
    );
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDate(null), "N/A");
  });

  await t.test('returns "N/A" for undefined', () => {
    assert.strictEqual(getFormattedDate(undefined), "N/A");
  });

  await t.test('returns "N/A" for invalid date string', () => {
    assert.strictEqual(getFormattedDate("not-a-date"), "N/A");
  });
});

test("getFormattedDateTime", async (t) => {
  await t.test("formats a valid date time string", () => {
    const date = "2024-05-16T15:30:00Z";
    const formatted = getFormattedDateTime(date);
    assert.ok(
      formatted.includes("May 16, 2024") || formatted.includes("May 15, 2024")
    );
    // Should include time component (e.g., 3:30 PM or similar)
    assert.ok(formatted.includes(":") || formatted.includes("AM") || formatted.includes("PM"));
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDateTime(null), "N/A");
  });

  await t.test('returns "N/A" for invalid date string', () => {
    assert.strictEqual(getFormattedDateTime("not-a-date"), "N/A");
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
