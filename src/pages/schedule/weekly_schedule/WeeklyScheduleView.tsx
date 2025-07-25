import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import { CustomEvent } from "./CustomEvent";
import "./WeeklyCalendar.scss";
import CustomWeekHeader from "./CustomWeekHeader";
import { colorAutoSelector } from "@/utils/colorAutoSelector";
import { useRef, useState } from "react";
import { addWeeks, subWeeks } from "date-fns";

interface Props {
  schedules: any[];
}

const localizer = luxonLocalizer(DateTime);

const formats = {
  timeGutterFormat: (date: Date, culture: string, localizer: any) => {
    return DateTime.fromJSDate(date).toFormat("H"); // 예: 22
  },
};

const WeeklyScheduleView = ({ schedules }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const prevWeek = subWeeks(currentDate, 1);
  const nextWeek = addWeeks(currentDate, 1);

  const [offset, setOffset] = useState(0); // 슬라이딩용 오프셋
  const touchStartX = useRef<number | null>(null);

  const events = schedules.map((item, index) => ({
    id: item.id,
    title: item.scheduleName,
    start: new Date(`${item.date}T${item.startTime}`),
    end: new Date(`${item.date}T${item.endTime}`),
  }));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 50) {
      setOffset(100); // 오른쪽으로 이동
      setTimeout(() => {
        setCurrentDate(prevWeek);
        setOffset(0);
      }, 300);
    } else if (deltaX < -50) {
      setOffset(-100); // 왼쪽으로 이동
      setTimeout(() => {
        setCurrentDate(nextWeek);
        setOffset(0);
      }, 300);
    }

    touchStartX.current = null;
  };

  const calendaryArr = [
    <Calendar
      date={prevWeek}
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
    />,

    <Calendar
      date={currentDate}
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
    />,
    <Calendar
      date={nextWeek}
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
    />,
  ];

  return (
    <div className="calendar-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="calendar-slider" style={{ transform: `translateX(${offset}%)` }}>
        <div className="calendar-viewport">{calendaryArr.map((item, index) => item)}</div>
      </div>

      {/* <Calendar
        date={new Date("2025-8-1")}
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
      /> */}
    </div>
  );
};

export default WeeklyScheduleView;
