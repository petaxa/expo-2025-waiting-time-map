import { expect, test } from "vitest";

test("xxx時間xx分 はその数値(分)にパースされる", () => {
  const result = parseWaitTime("102時間53分");
  expect(result).toBe(6173);
});
test("0時間10分以下 は 10 にパースされる", () => {
  const result = parseWaitTime("0時間10分以下");
  expect(result).toBe(10);
});
test("停止 は null にパースされる", () => {
  const result = parseWaitTime("停止");
  expect(result).toBe(null);
});
test("エラー は null にパースされる", () => {
  const result = parseWaitTime("エラー");
  expect(result).toBe(null);
});
