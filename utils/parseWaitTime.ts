// 停止、情報なし、予約のみ

export type WaitTime =
  | { status: "normal"; minutes: number }
  | { status: "stopped" }
  | { status: "no-info" }
  | { status: "only-reservation" }
  | { status: "error" };
export const parseWaitTime = (waitTime: string): WaitTime => {
  if (waitTime === "停止") {
    return { status: "stopped" };
  } else if (waitTime === "情報なし") {
    return { status: "no-info" };
  } else if (waitTime === "予約のみ") {
    return { status: "only-reservation" };
  } else if (waitTime === "エラー" || waitTime.trim() === "") {
    return { status: "error" };
  }

  const m = waitTime.match(/^(\d+時間)?\s*(\d+分)?(?:以下)?$/);
  if (!m) {
    return { status: "error" };
  }

  const hours = m[1] ? Number(m[1].replace("時間", "")) : 0;
  const minutes = m[2] ? Number(m[2].replace("分", "")) : 0;
  return {
    status: "normal",
    minutes: hours * 60 + minutes,
  };
};
