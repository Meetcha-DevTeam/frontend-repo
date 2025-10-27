import {
  parseISO,
  setMinutes,
  setSeconds,
  setMilliseconds,
  getMinutes,
  getTime,
} from "date-fns";
//시간을 30분 단위로 내림하는 역할
export const snap30 = (d: Date): Date => {
  const m = Math.floor(getMinutes(d) / 30) * 30;
  return setMilliseconds(setSeconds(setMinutes(d, m), 0), 0);
};
//문자열을 Date단위로 변환
export const toDate = (x: any): Date =>
  x instanceof Date ? x : parseISO(String(x));

export const keyOf = (sISO: string, eISO: string) => {
  const s = getTime(setMilliseconds(setSeconds(parseISO(sISO), 0), 0));
  const e = getTime(setMilliseconds(setSeconds(parseISO(eISO), 0), 0));
  return `${s}|${e}`;
};
