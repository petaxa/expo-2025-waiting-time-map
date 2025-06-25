import { expect, test } from "vitest";

// 停止状態のテスト
test("停止 は status: stopped が返る", () => {
  const result = parseWaitTime("停止");
  expect(result).toEqual({ status: "stopped" });
});

// エラー状態のテスト
test("エラー は status: error が返る", () => {
  const result = parseWaitTime("エラー");
  expect(result).toEqual({ status: "error" });
});

// 正常な待ち時間のテスト - 時間と分の組み合わせ
test("1時間30分 は status: normal, minutes: 90 が返る", () => {
  const result = parseWaitTime("1時間30分");
  expect(result).toEqual({ status: "normal", minutes: 90 });
});

test("2時間15分 は status: normal, minutes: 135 が返る", () => {
  const result = parseWaitTime("2時間15分");
  expect(result).toEqual({ status: "normal", minutes: 135 });
});

test("102時間53分 は status: normal, minutes: 6173 が返る", () => {
  const result = parseWaitTime("102時間53分");
  expect(result).toEqual({ status: "normal", minutes: 6173 });
});

// 時間のみのテスト
test("1時間 は status: normal, minutes: 60 が返る", () => {
  const result = parseWaitTime("1時間");
  expect(result).toEqual({ status: "normal", minutes: 60 });
});

test("3時間 は status: normal, minutes: 180 が返る", () => {
  const result = parseWaitTime("3時間");
  expect(result).toEqual({ status: "normal", minutes: 180 });
});

// 分のみのテスト
test("30分 は status: normal, minutes: 30 が返る", () => {
  const result = parseWaitTime("30分");
  expect(result).toEqual({ status: "normal", minutes: 30 });
});

test("5分 は status: normal, minutes: 5 が返る", () => {
  const result = parseWaitTime("5分");
  expect(result).toEqual({ status: "normal", minutes: 5 });
});

// 0時間のテスト
test("0時間10分 は status: normal, minutes: 10 が返る", () => {
  const result = parseWaitTime("0時間10分");
  expect(result).toEqual({ status: "normal", minutes: 10 });
});

test("0時間30分 は status: normal, minutes: 30 が返る", () => {
  const result = parseWaitTime("0時間30分");
  expect(result).toEqual({ status: "normal", minutes: 30 });
});

// 「以下」付きのテスト
test("10分以下 は status: normal, minutes: 10 が返る", () => {
  const result = parseWaitTime("10分以下");
  expect(result).toEqual({ status: "normal", minutes: 10 });
});

test("0時間10分以下 は status: normal, minutes: 10 が返る", () => {
  const result = parseWaitTime("0時間10分以下");
  expect(result).toEqual({ status: "normal", minutes: 10 });
});

test("1時間30分以下 は status: normal, minutes: 90 が返る", () => {
  const result = parseWaitTime("1時間30分以下");
  expect(result).toEqual({ status: "normal", minutes: 90 });
});

test("2時間以下 は status: normal, minutes: 120 が返る", () => {
  const result = parseWaitTime("2時間以下");
  expect(result).toEqual({ status: "normal", minutes: 120 });
});

// スペースありのテスト
test("1時間 30分 (スペースあり) は status: normal, minutes: 90 が返る", () => {
  const result = parseWaitTime("1時間 30分");
  expect(result).toEqual({ status: "normal", minutes: 90 });
});

test("2時間 15分以下 (スペースあり) は status: normal, minutes: 135 が返る", () => {
  const result = parseWaitTime("2時間 15分以下");
  expect(result).toEqual({ status: "normal", minutes: 135 });
});

// エッジケース - 0分のテスト
test("0分 は status: normal, minutes: 0 が返る", () => {
  const result = parseWaitTime("0分");
  expect(result).toEqual({ status: "normal", minutes: 0 });
});

test("0時間0分 は status: normal, minutes: 0 が返る", () => {
  const result = parseWaitTime("0時間0分");
  expect(result).toEqual({ status: "normal", minutes: 0 });
});

// 無効な形式のテスト
test("無効な形式 abc は status: error が返る", () => {
  const result = parseWaitTime("abc");
  expect(result).toEqual({ status: "error" });
});

test("無効な形式 123 は status: error が返る", () => {
  const result = parseWaitTime("123");
  expect(result).toEqual({ status: "error" });
});

test("無効な形式 時間分 は status: error が返る", () => {
  const result = parseWaitTime("時間分");
  expect(result).toEqual({ status: "error" });
});

test("無効な形式 1時間分 は status: error が返る", () => {
  const result = parseWaitTime("1時間分");
  expect(result).toEqual({ status: "error" });
});

test("無効な形式 時間30分 は status: error が返る", () => {
  const result = parseWaitTime("時間30分");
  expect(result).toEqual({ status: "error" });
});

test("空文字 は status: error が返る", () => {
  const result = parseWaitTime("");
  expect(result).toEqual({ status: "error" });
});

// 大きな数値のテスト
test("999時間999分 は status: normal, minutes: 60939 が返る", () => {
  const result = parseWaitTime("999時間999分");
  expect(result).toEqual({ status: "normal", minutes: 60939 });
});
