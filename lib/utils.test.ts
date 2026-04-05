import { test, describe } from "node:test";
import assert from "node:assert";
import { generateCustomerId } from "./utils.ts";

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
