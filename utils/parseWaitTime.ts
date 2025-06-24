export const parseWaitTime = (waitTime: string): number | null => {
  const m = waitTime.match(/^(\d+時間)?\s*(\d+分)?(?:以下)?$/);
  if (!m || (!m[1] && !m[2])) return null;

  const hours = m[1] ? Number(m[1].replace("時間", "")) : 0;
  const minutes = m[2] ? Number(m[2].replace("分", "")) : 0;
  return hours * 60 + minutes;
};
