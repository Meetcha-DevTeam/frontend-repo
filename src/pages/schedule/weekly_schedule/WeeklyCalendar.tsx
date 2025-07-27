import { colorAutoSelector } from "@/utils/colorAutoSelector";
import CustomWeekHeader from "./CustomWeekHeader";
import { CustomEvent } from "./CustomEvent";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScheduleCreationPage from "../schedule_creation/ScheduleCreationPage";
import { format } from "date-fns/format";
import { ko } from "date-fns/locale";

interface Props {
  week: Date;
  events: any[];
}

const localizer = luxonLocalizer(DateTime);

const formats = {
  timeGutterFormat: (date: Date, culture: string, localizer: any) => {
    return DateTime.fromJSDate(date).toFormat("H"); // 예: 22
  },
};

const WeeklyCalendar = ({ week, events }: Props) => {
  const [creationOpen, setCreationOpen] = useState<boolean>(false);
  const [clickedSpan, setClickedSpan] = useState<string>();

  const portal = ReactDOM.createPortal(
    <AnimatePresence>
      {creationOpen && (
        <>
          {/* 1) 백드롭: 클릭 시 닫기 */}
          <motion.div key="backdrop" className="backdrop" onClick={() => setCreationOpen(false)} />

          {/* 2) 슬라이드업 패널: 클릭 이벤트 전파 차단 */}
          <motion.div
            key="panel"
            className="slideUpContainer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragDirectionLock={true}
            onDragEnd={(_, info) => {
              console.log(info.offset.y);
              console.log(window.innerHeight);
              if (info.offset.y > window.innerHeight * 0.2) {
                setCreationOpen(false);
              }
            }}
          >
            <ScheduleCreationPage clickedSpan={clickedSpan} />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
  return (
    <>
      <Calendar
        date={week}
        localizer={localizer}
        events={events}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        components={{
          week: {
            header: CustomWeekHeader,
            event: CustomEvent,
          },
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: `${colorAutoSelector(event.id)}`,
              borderRadius: "6px",
              color: "white",
            },
          };
        }}
        selectable={true}
        step={30} // ✅ 각 시간 슬롯 간격 (분 단위)
        timeslots={2} // ✅ 한 시간당 몇 개의 슬롯
        longPressThreshold={0}
        onSelectSlot={(slotInfo) => {
          setTimeout(() => setCreationOpen(true), 0);
          console.log("빈 영역 클릭됨:", slotInfo);
          const formattedStartDate = format(slotInfo.start, "MM월 dd일(EEE)", { locale: ko });
          const formattedStartTime = format(slotInfo.start, "a hh:mm")
            .replace("AM", "오전")
            .replace("PM", "오후");
          const formattedEndDate = format(slotInfo.end, "MM월 dd일(EEE)", { locale: ko });
          const formattedEndTime = format(slotInfo.end, "a hh:mm")
            .replace("AM", "오전")
            .replace("PM", "오후");
          console.log(
            `${formattedStartDate} ${formattedStartTime} ${formattedEndDate} ${formattedEndTime}`
          );
          setClickedSpan(
            `${formattedStartDate} ${formattedStartTime} ${formattedEndDate} ${formattedEndTime}`
          );
        }}
        onSelectEvent={(event) => {
          console.log("일정 클릭됨:", event);
          // 원하는 동작 수행 (예: 모달 열기, 상세 페이지 이동 등)
        }}
      />
      {portal}
    </>
  );
};

export default WeeklyCalendar;
