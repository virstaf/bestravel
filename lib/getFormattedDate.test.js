import test from "node:test";
import assert from "node:assert";
import {
  getBackLink,
  getFormattedDate,
  getFormattedDateTime,
} from "./getFormattedDate.js";

test("getFormattedDate - formatting", async (t) => {
  await t.test("formats a valid date string", () => {
    const result = getFormattedDate("2024-05-16");
    // Use includes to be robust against different CI environments/locales if necessary,
    // though Intl.DateTimeFormat with 'en-US' should be stable.
    assert.ok(result.includes("May 16, 2024") || result.includes("May 15, 2024"));
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

test("getFormattedDateTime - formatting", async (t) => {
  await t.test("formats a valid date-time string", () => {
    const result = getFormattedDateTime("2024-05-16T14:30:00Z");
    assert.ok(result.includes("May 16, 2024") || result.includes("May 15, 2024"));
    // Time check can be tricky due to timezone, but we verify it's formatted
    assert.ok(result.includes("AM") || result.includes("PM") || /\d{1,2}:\d{2}/.test(result));
  });

  await t.test('returns "N/A" for null', () => {
    assert.strictEqual(getFormattedDateTime(null), "N/A");
  });

  await t.test('returns "N/A" for invalid date string', () => {
    assert.strictEqual(getFormattedDateTime("invalid"), "N/A");
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
