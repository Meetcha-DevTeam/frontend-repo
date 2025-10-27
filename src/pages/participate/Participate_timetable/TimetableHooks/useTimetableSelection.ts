//handleSelect함수 따로 뺌ㅋ
import { addMinutes, isAfter } from "date-fns";
import { snap30,keyOf } from "@/utils/dateUtil";
import type { ParticipateObject } from "@/apis/participate/participateTypes";

export const useTimetableSelection = (
  selectedTimes: ParticipateObject[],
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>
) => {
  const handleSelect = (info: any) => {
    let s = snap30(info.start as Date);
    let e = snap30(info.end as Date);

    if (!isAfter(e, s)) e = addMinutes(s, 30);

    const sISO = s.toISOString();
    const eISO = e.toISOString();
    const key = keyOf(sISO, eISO);

    const exists = selectedTimes.some(
      (t) => keyOf(t.startAt, t.endAt) === key
    );

    setSelectedTimes((prev) =>
      exists
        ? prev.filter((t) => keyOf(t.startAt, t.endAt) !== key)
        : [...prev, { startAt: sISO, endAt: eISO }]
    );
  };

  return { handleSelect };
};
