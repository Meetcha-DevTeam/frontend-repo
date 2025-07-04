import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";
import styles from "./MonthlyScheduleView.module.scss";
import { useAPIs } from "@/apis/useAPIs";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";

interface Props {
  schedules: any[];
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  return (
    <div className={styles.monthlyScheduleView}>
      <Calendar
        tileContent={({ date, view }) => {
          const eventName = new Array();

          schedules &&
            schedules.map((user) => {
              if (user.date === dateFormatter(date)) {
                eventName.push(user.scheduleName);
              }
            });
          return <EventTagBox eventName={eventName} />;
        }}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        formatShortWeekday={(locale, date) => date.toLocaleString("en-US", { weekday: "short" })}
      />
    </div>
  );
};

export default MonthlyScheduleView;
