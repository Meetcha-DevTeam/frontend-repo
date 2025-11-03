import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //  수정됨: 드래그/선택을 위해 추가
import "./Participate_timetabe.scss";

import {
  parseISO,
  startOfDay,
  endOfDay,
  addDays,
  differenceInCalendarDays,
  getDay,
  getHours,
  format as formatDate,
  setMinutes,
  setSeconds,
  setMilliseconds,
  addMinutes,
  isAfter,
  getTime,
  getMinutes,
} from "date-fns";
import { ko } from "date-fns/locale";

import type { ParticipateObject, UISlot } from "@apis/participate/participateTypes";

interface BusyInterval {
  startAt: string;
  endAt: string;
}

interface Props {
  candidateDates: string[];
  selectedTimes: ParticipateObject[];
  setSelectedTimes: React.Dispatch<React.SetStateAction<ParticipateObject[]>>;
  scheduleData: BusyInterval[];
  previousAvailTime?: { startAt: string; endAt: string }[];
}

const Timetable = ({
  candidateDates,
  selectedTimes,
  setSelectedTimes,
  scheduleData,
  previousAvailTime,
}) => {
  const snap30 = (d: Date) => {
    const m = Math.floor(getMinutes(d) / 30) * 30;
    return setMilliseconds(setSeconds(setMinutes(d, m), 0), 0);
  };
  const keyOf = (sISO: string, eISO: string) => {
    const s = getTime(setMilliseconds(setSeconds(parseISO(sISO), 0), 0));
    const e = getTime(setMilliseconds(setSeconds(parseISO(eISO), 0), 0));
    return `${s}|${e}`;
  };

  useEffect(() => {
    if (!Array.isArray(previousAvailTime) || previousAvailTime.length === 0) return;

    setSelectedTimes((prev) => {
      const exists = new Set(prev.map((s) => keyOf(s.startAt, s.endAt)));
      const merged = [...prev];
      let changed = false;

      for (const slot of previousAvailTime) {
        const s = snap30(parseISO(slot.startAt));
        const e = snap30(parseISO(slot.endAt));
        const sISO = s.toISOString();
        const eISO = e.toISOString();
        const key = keyOf(sISO, eISO);
        if (!exists.has(key)) {
          merged.push({ startAt: sISO, endAt: eISO });
          exists.add(key);
          changed = true;
        }
      }

      return changed ? merged : prev;
    });
  }, [previousAvailTime, setSelectedTimes]);
  console.log(candidateDates);
  const sortedDates: string[] = [...(candidateDates ?? [])].sort();
  console.log(sortedDates);
  console.log(previousAvailTime);

  if (sortedDates.length === 0) return <p>표시할 날짜가 없습니다.</p>;

  const validDates: Date[] = sortedDates.map((dateStr) => parseISO(dateStr));

  const start = validDates[0];
  const end = validDates[validDates.length - 1];
  const daysSpan = differenceInCalendarDays(end, start) + 1;

  const allowedDows: Set<number> = new Set(validDates.map((d) => getDay(d))); // 0=일 ... 6=토
  const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter((dow: number) => !allowedDows.has(dow));

  const rangeStart = formatDate(startOfDay(validDates[0]), "yyyy-MM-dd");
  const rangeEndExclusive = formatDate(addDays(endOfDay(validDates.at(-1)!), 1), "yyyy-MM-dd");

  const handleSelect = (info: any) => {
    let s = snap30(info.start as Date);
    let e = snap30(info.end as Date);
    if (!isAfter(e, s)) {
      e = addMinutes(s, 30);
    }
    const sISO = s.toISOString();
    const eISO = e.toISOString();
    const k = keyOf(sISO, eISO);

    const exists = selectedTimes.some((t) => keyOf(t.startAt, t.endAt) === k);
    if (exists) {
      setSelectedTimes((prev) => prev.filter((t) => keyOf(t.startAt, t.endAt) !== k));
    } else {
      setSelectedTimes((prev) => [...prev, { startAt: sISO, endAt: eISO }]);
    }
  };

  const busyEvents = (scheduleData ?? []).map((ev) => ({
    start: parseISO(ev.startAt), // 'YYYY-MM-DDTHH:mm:ss' → 로컬 Date로 해석
    end: parseISO(ev.endAt),
    display: "background",
    classNames: ["busy-block"],
    extendedProps: { isBusy: true },
  }));

  const selectedEvents = selectedTimes.map((time) => ({
    start: time.startAt,
    end: time.endAt,
    display: "background",
    backgroundColor: "#FF6200",
    classNames: ["selected-block"],
    extendedProps: { isBusy: false },
  }));
  console.log(selectedTimes);

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]} //  수정됨: 드래그/선택 위해 interactionPlugin 추가
      initialView="timeGridSpan"
      views={{
        timeGridSpan: { type: "timeGrid", duration: { days: daysSpan } },
      }}
      initialDate={formatDate(validDates[0], "yyyy-MM-dd")}
      visibleRange={{ start: rangeStart, end: rangeEndExclusive }}
      hiddenDays={hiddenDays}
      locale="ko"
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00"
      slotDuration="00:30:00"
      allDaySlot={false}
      nowIndicator={true}
      selectable={true} // 수정됨: 드래그 선택 활성화
      selectMirror={false}
      unselectAuto={false}
      select={handleSelect} //  수정됨: 드래그 선택 이벤트 핸들러
      selectOverlap={(event) => !event.extendedProps?.isBusy}
      events={[...busyEvents, ...selectedEvents]} //  수정됨: 선택된 시간대 렌더링
      height="auto"
      headerToolbar={false}
      dayHeaderContent={(info) => {
        const label = formatDate(info.date, "M.d(EEE)", { locale: ko }); // 예: 7.22(화)
        return label;
      }}
      slotLabelContent={(arg) => {
        return String(getHours(arg.date)); // 0~23
      }}
    />
  );
};

export default Timetable;
