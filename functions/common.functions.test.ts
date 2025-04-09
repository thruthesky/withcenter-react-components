import { describe, it } from "node:test";
import { numberWithCommas } from "./common.functions";
import assert from "assert";

describe("numberWithCommas", () => {
  it("should format numbers with commas", () => {
    assert.strictEqual(numberWithCommas(1000), "1,000");
    assert.strictEqual(numberWithCommas(123456789), "123,456,789");
    assert.strictEqual(numberWithCommas(9876543210), "9,876,543,210");
  });

  it("should handle small numbers without commas", () => {
    assert.strictEqual(numberWithCommas(123), "123");
    assert.strictEqual(numberWithCommas(0), "0");
  });

  it("should handle negative numbers", () => {
    assert.strictEqual(numberWithCommas(-1000), "-1,000");
    assert.strictEqual(numberWithCommas(-987654321), "-987,654,321");
  });

  it("should handle decimal numbers", () => {
    assert.strictEqual(numberWithCommas(1234.56), "1,234.56");
    assert.strictEqual(numberWithCommas(-9876.54321), "-9,876.54321");
    assert.strictEqual(numberWithCommas(1000000.1234), "1,000,000.1234");
  });
});
