import React from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import './Participate_timetabe.scss';

const Timetable = () => {
  return (
  <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00"
      allDaySlot={false}
      headerToolbar={false}
      nowIndicator={true}
      height="auto"
      slotDuration="01:00:00"
      dayHeaderFormat={{ weekday: 'short', day: 'numeric', omitCommas: true }}
      events={[
        {
          title: '참여 가능',
          start: '2025-07-28T07:00:00',
          end: '2025-07-28T11:00:00',
          backgroundColor: '#FF5C00',
          borderColor: '#FF5C00',
          textColor: 'white',
        },
        {
          title: '불가능',
          start: '2025-07-29T08:00:00',
          end: '2025-07-29T10:00:00',
          backgroundColor: 'gray',
          borderColor: 'gray',
          display: 'background',
        },
      ]}
    />
  );
};

export default Timetable;
