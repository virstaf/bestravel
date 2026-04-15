import { test, describe } from "node:test";
import assert from "node:assert";
import { generateCustomerId, sanitizeEmailHeader } from "./utils.ts";

describe("generateCustomerId", () => {
  test("should return customer ID starting with 'V' and 6 digits by default", () => {
    const id = generateCustomerId();
    assert.match(id, /^V\d{6}$/);
  });

  test("should return customer ID starting with 'V' and 6 digits for 'USER' role", () => {
    const id = generateCustomerId("USER");
    assert.match(id, /^V\d{6}$/);
  });

  test("should return customer ID starting with 'A' and 6 digits for 'ADMIN' role", () => {
    const id = generateCustomerId("ADMIN");
    assert.match(id, /^A\d{6}$/);
  });

  test("should return customer ID starting with 'V' and 6 digits for unexpected inputs", () => {
    const id1 = generateCustomerId("UNKNOWN_ROLE");
    assert.match(id1, /^V\d{6}$/);

    const id2 = generateCustomerId("");
    assert.match(id2, /^V\d{6}$/);
  });
});

describe("sanitizeEmailHeader", () => {
  test("should remove newlines and carriage returns", () => {
    const input = "Line 1\nLine 2\r\nLine 3\rLine 4";
    const expected = "Line 1 Line 2 Line 3 Line 4";
    assert.strictEqual(sanitizeEmailHeader(input), expected);
  });

  test("should trim whitespace", () => {
    const input = "  Clean Me  \n";
    const expected = "Clean Me";
    assert.strictEqual(sanitizeEmailHeader(input), expected);
  });

  test("should return non-string inputs as is", () => {
    const input = 123 as any;
    assert.strictEqual(sanitizeEmailHeader(input), 123);
  });

  test("should handle empty strings", () => {
    assert.strictEqual(sanitizeEmailHeader(""), "");
  });
});
