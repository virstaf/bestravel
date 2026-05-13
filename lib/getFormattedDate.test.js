import { describe, it } from "node:test";
import assert from "node:assert";
import { getFormattedDate, getFormattedDateTime, getBackLink } from "./getFormattedDate.js";

describe("getFormattedDate", () => {
  it("should format date correctly", () => {
    const date = "2023-12-25";
    const formatted = getFormattedDate(date);
    // Expect "December 25, 2023" for en-US
    assert.strictEqual(formatted, "December 25, 2023");
  });

  it("should return empty string for null/undefined", () => {
    assert.strictEqual(getFormattedDate(null), "");
    assert.strictEqual(getFormattedDate(undefined), "");
  });
});

describe("getFormattedDateTime", () => {
  it("should format date and time correctly", () => {
    const date = "2023-12-25T15:30:00";
    const formatted = getFormattedDateTime(date);
    // Expect something like "Dec 25, 2023, 03:30 PM" or "Dec 25, 2023, 15:30"
    // depending on environment locale defaults for 2-digit hour.
    // Given dateTimeFormatter uses en-US and 2-digit hour:
    assert.ok(formatted.includes("Dec 25, 2023"));
    assert.ok(formatted.includes("3:30"));
  });

  it("should return empty string for null/undefined", () => {
    assert.strictEqual(getFormattedDateTime(null), "");
    assert.strictEqual(getFormattedDateTime(undefined), "");
  });
});

describe("getBackLink", () => {
  it("returns '/' for empty path", () => {
    assert.strictEqual(getBackLink(""), "/");
    assert.strictEqual(getBackLink(null), "/");
  });

  it("returns '/' for top-level path like '/admin'", () => {
    assert.strictEqual(getBackLink("/admin"), "/");
  });

  it("returns parent path for nested paths", () => {
    assert.strictEqual(getBackLink("/admin/users"), "/admin");
    assert.strictEqual(getBackLink("/dashboard/bookings/123"), "/dashboard/bookings");
  });
});
