import { colorAutoSelector } from "@/utils/colorAutoSelector";
import CustomWeekHeader from "./CustomWeekHeader";
import { CustomEvent } from "./CustomEvent";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";

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
  return (
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
    />
  );
};

export default WeeklyCalendar;
