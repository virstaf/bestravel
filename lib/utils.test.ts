import { describe, it, mock } from "node:test";
import assert from "node:assert";
import { handleError } from "./utils";

describe("handleError", () => {
  it("should handle an Error instance correctly", () => {
    // Mock console.error to suppress output and verify it's called
    const consoleErrorMock = mock.method(console, "error", () => {});

    const testError = new Error("This is a test error");
    const result = handleError(testError);

    assert.deepStrictEqual(result, { errorMessage: "This is a test error" });
    assert.strictEqual(consoleErrorMock.mock.calls.length, 1);
    assert.strictEqual(consoleErrorMock.mock.calls[0].arguments[0], "error handler:::");
    assert.strictEqual(consoleErrorMock.mock.calls[0].arguments[1], testError);

    // Restore the original console.error
    consoleErrorMock.mock.restore();
  });

  it("should handle a string correctly", () => {
    const consoleErrorMock = mock.method(console, "error", () => {});

    const result = handleError("This is a string error");

    assert.deepStrictEqual(result, { errorMessage: "An error occurred" });
    assert.strictEqual(consoleErrorMock.mock.calls.length, 0);

    consoleErrorMock.mock.restore();
  });

  it("should handle null correctly", () => {
    const consoleErrorMock = mock.method(console, "error", () => {});

    const result = handleError(null);

    assert.deepStrictEqual(result, { errorMessage: "An error occurred" });
    assert.strictEqual(consoleErrorMock.mock.calls.length, 0);

    consoleErrorMock.mock.restore();
  });

  it("should handle undefined correctly", () => {
    const consoleErrorMock = mock.method(console, "error", () => {});

    const result = handleError(undefined);

    assert.deepStrictEqual(result, { errorMessage: "An error occurred" });
    assert.strictEqual(consoleErrorMock.mock.calls.length, 0);

    consoleErrorMock.mock.restore();
  });

  it("should handle a plain object correctly", () => {
    const consoleErrorMock = mock.method(console, "error", () => {});

    const result = handleError({ message: "Object error" });

    assert.deepStrictEqual(result, { errorMessage: "An error occurred" });
    assert.strictEqual(consoleErrorMock.mock.calls.length, 0);

    consoleErrorMock.mock.restore();
  });
});
