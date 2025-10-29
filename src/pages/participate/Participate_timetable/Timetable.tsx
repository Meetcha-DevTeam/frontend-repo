import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react"; //기본코어->렌더링 담당
import timeGridPlugin from "@fullcalendar/timegrid"; //시간 단위로 일정이 보이는 형태(주간/일간 뷰)
import interactionPlugin from "@fullcalendar/interaction"; //드래그,선택,클릭 같은 사용자 상호작용

import { toBusyEvents, toSelectedEvents } from "@/utils/eventTransform"; //데이터 transform util함수 호출
import { useMergePreviousTimes } from "./TimetableHooks/useMergePreviousTime"; //
import { useTimetableSelection } from "./TimetableHooks/useTimetableSelection"; //

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
} from "date-fns";

import { ko } from "date-fns/locale";

const Timetable = ({
  candidateDates,
  selectedTimes,
  setSelectedTimes,
  scheduleData,
  previousAvailTime,
}) => {
  const [clickNum, setClickNum] = useState<number>(0);
  useMergePreviousTimes(previousAvailTime, setSelectedTimes);
  //previousAvailTime(이전에 지정했던 시간=>대안시간 투표 전에 지정한 시간)이 존재하지 않으면 시행x
  const sortedDates: string[] = [...(candidateDates ?? [])].sort();

  if (sortedDates.length === 0) return <p>표시할 날짜가 없습니다.</p>;

  const validDates: Date[] = sortedDates.map((dateStr) => parseISO(dateStr)); //date객체 변환

  const start = validDates[0];
  const end = validDates[validDates.length - 1];
  const daysSpan = differenceInCalendarDays(end, start) + 1;

  const allowedDows: Set<number> = new Set(validDates.map((d) => getDay(d))); // 0=일 ... 6=토
  const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (dow: number) => !allowedDows.has(dow)
  );

  const rangeStart = formatDate(startOfDay(validDates[0]), "yyyy-MM-dd");
  const rangeEndExclusive = formatDate(
    addDays(endOfDay(validDates.at(-1)!), 1),
    "yyyy-MM-dd"
  );

  const { handleSelect } = useTimetableSelection(
    selectedTimes,
    setSelectedTimes
  );

  console.log(candidateDates);
  console.log(sortedDates);
  console.log(previousAvailTime);
  console.log(selectedTimes);
  console.log(scheduleData);
 
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
      events={[
        ...toBusyEvents(scheduleData),
        ...toSelectedEvents(clickNum, selectedTimes),
      ]} //  수정됨: 선택된 시간대 렌더링
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
