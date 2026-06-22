import test from "node:test";
import assert from "node:assert";
import {
  getBackLink,
  getFormattedDate,
  getFormattedDateTime,
} from "./getFormattedDate.js";

test("getFormattedDate", async (t) => {
  await t.test("formats valid date string", () => {
    const result = getFormattedDate("2024-05-16T12:00:00Z");
    // Depending on timezone, might be May 16 or May 15
    assert.ok(
      result.includes("May 16, 2024") || result.includes("May 15, 2024")
    );
  });

  await t.test("returns N/A for null", () => {
    assert.strictEqual(getFormattedDate(null), "N/A");
  });

  await t.test("returns N/A for invalid date", () => {
    assert.strictEqual(getFormattedDate("invalid-date"), "N/A");
  });
});

test("getFormattedDateTime", async (t) => {
  await t.test("formats valid date time string", () => {
    const result = getFormattedDateTime("2024-05-16T12:00:00Z");
    assert.ok(result.includes("2024"));
    assert.ok(result.includes("May"));
  });

  await t.test("returns N/A for undefined", () => {
    assert.strictEqual(getFormattedDateTime(undefined), "N/A");
  });
});

test("getBackLink - edge cases", async (t) => {
  await t.test("returns '/' for empty path", () => {
    assert.strictEqual(getBackLink(""), "/");
  });

  await t.test("returns '/' for null path", () => {
    assert.strictEqual(getBackLink(null), "/");
  });

  await t.test("returns '/' for undefined path", () => {
    assert.strictEqual(getBackLink(undefined), "/");
  });

  await t.test("returns '/' for root path", () => {
    assert.strictEqual(getBackLink("/"), "/");
  });
});

test("getBackLink - top-level paths", async (t) => {
  await t.test("returns '/' for top-level path like '/admin'", () => {
    assert.strictEqual(getBackLink("/admin"), "/");
  });

  await t.test("returns '/' for top-level path without leading slash", () => {
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
