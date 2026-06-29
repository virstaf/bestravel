import test from "node:test";
import assert from "node:assert";
import {
  getBackLink,
  getFormattedDate,
  getFormattedDateTime,
} from "./getFormattedDate.js";

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

test("getFormattedDate", async (t) => {
  await t.test("formats a valid date string", () => {
    const result = getFormattedDate("2023-10-27");
    assert.strictEqual(result, "October 27, 2023");
  });

  await t.test("returns 'N/A' for invalid date string", () => {
    assert.strictEqual(getFormattedDate("invalid-date"), "N/A");
  });

  await t.test("returns 'N/A' for null input", () => {
    assert.strictEqual(getFormattedDate(null), "N/A");
  });

  await t.test("returns 'N/A' for undefined input", () => {
    assert.strictEqual(getFormattedDate(undefined), "N/A");
  });

  await t.test("returns 'N/A' for empty string", () => {
    assert.strictEqual(getFormattedDate(""), "N/A");
  });
});

test("getFormattedDateTime", async (t) => {
  await t.test("formats a valid date time string", () => {
    const result = getFormattedDateTime("2023-10-27T10:30:00Z");
    // Depending on timezone, but checking if it contains the date part at least
    assert.ok(result.includes("Oct 27, 2023") || result.includes("Oct 26, 2023"));
    assert.ok(result.includes("AM") || result.includes("PM"));
  });

  await t.test("returns 'N/A' for invalid date time string", () => {
    assert.strictEqual(getFormattedDateTime("invalid-date"), "N/A");
  });

  await t.test("returns 'N/A' for null input", () => {
    assert.strictEqual(getFormattedDateTime(null), "N/A");
  });

  await t.test("returns 'N/A' for undefined input", () => {
    assert.strictEqual(getFormattedDateTime(undefined), "N/A");
  });
});
