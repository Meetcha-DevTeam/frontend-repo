import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.scss";
import { dateFormatter } from "@/utils/dateFormatter";

const CalendarInputComponent = () => {
  const [clickedDays, setClickedDays] = useState<string[]>([]);

  const clickDaySaver = (value: Date) => {
    const clickedDay = dateFormatter(value);
    console.log(clickedDay);
    if (clickedDays.includes(clickedDay)) {
      setClickedDays((prevClickedDays) => prevClickedDays.filter((day) => day !== clickedDay));
      return;
    }
    setClickedDays((prevClickedDays) => [...prevClickedDays, clickedDay]);
  };

  useEffect(() => {
    console.log(clickedDays);
  }, [clickedDays]);

  return (
    <div className="calendarInputComponent">
      <Calendar
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        onClickDay={clickDaySaver}
        tileClassName={({ date, view }) => {
          if (clickedDays.includes(dateFormatter(date))) {
            return "custom-active";
          }
        }}
      />
    </div>
  );
};

export default CalendarInputComponent;
