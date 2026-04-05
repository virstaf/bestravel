import { test, describe } from "node:test";
import assert from "node:assert";
import { calculateReadingTime, extractCategory } from "./blogUtils.js";

describe("blogUtils", () => {
  describe("calculateReadingTime", () => {
    test("should return 1 for short content", () => {
      const content = "This is a short post.";
      assert.strictEqual(calculateReadingTime(content), 1);
    });

    test("should return 2 for content with ~300 words", () => {
      const words = Array(300).fill("word").join(" ");
      assert.strictEqual(calculateReadingTime(words), 2);
    });

    test("should return 1 for empty content", () => {
      assert.strictEqual(calculateReadingTime(""), 1);
    });
  });

  describe("extractCategory", () => {
    test('should return "Membership" if content contains "member"', () => {
      assert.strictEqual(extractCategory("id", "This is for a member"), "Membership");
    });

    test('should return "Membership" if content contains "VIP"', () => {
      assert.strictEqual(extractCategory("id", "Exclusive VIP access"), "Membership");
    });

    test('should return "Travel Tips" if content contains "booking"', () => {
      assert.strictEqual(extractCategory("id", "How to manage your booking"), "Travel Tips");
    });

    test('should return "Travel Tips" if content contains "deal"', () => {
      assert.strictEqual(extractCategory("id", "Check out this amazing deal"), "Travel Tips");
    });

    test('should return "Success Stories" if content contains "trust"', () => {
      assert.strictEqual(extractCategory("id", "Built on trust"), "Success Stories");
    });

    test('should return "Success Stories" if content contains "story"', () => {
      assert.strictEqual(extractCategory("id", "Read our success story"), "Success Stories");
    });

    test('should return "Destinations" if content contains "dubai"', () => {
      assert.strictEqual(extractCategory("id", "Trip to Dubai"), "Destinations");
    });

    test('should return "Destinations" if content contains "destination"', () => {
      assert.strictEqual(extractCategory("id", "Choose your next destination"), "Destinations");
    });

    test('should return "Travel" as default if no keywords match', () => {
      assert.strictEqual(extractCategory("id", "General travel content"), "Travel");
    });

    test("should be case-insensitive", () => {
      assert.strictEqual(extractCategory("id", "DUBAI"), "Destinations");
      assert.strictEqual(extractCategory("id", "vIp"), "Membership");
    });

    test("should follow priority in code", () => {
      // "member" is checked before "booking", so it should return "Membership"
      assert.strictEqual(extractCategory("id", "member booking"), "Membership");

      // "booking" is checked before "trust"
      assert.strictEqual(extractCategory("id", "booking trust"), "Travel Tips");
    });
  });
});
