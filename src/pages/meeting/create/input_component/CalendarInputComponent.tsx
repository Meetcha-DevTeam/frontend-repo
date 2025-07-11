import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.scss";
import { dateFormatter } from "@/utils/dateFormatter";

interface Props {
  dataSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
}
const CalendarInputComponent = ({ dataSetter }: Props) => {
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
    dataSetter(clickedDays);
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
