// import Calendar from "react-calendar";
// import "./Calendar.scss";
// import EventTagBox from "./EventTagBox";
// import { dateFormatter } from "@/utils/dateFormatter";
// import { getMonth } from "date-fns/getMonth";
// import { getYear } from "date-fns";
// import { useContext } from "react";
// import { DateContext } from "../DataContext";
// import type { DateContextValue } from "../DataContext";
// import type { UserScheduleData } from "@/apis/participate/participateTypes";

// interface Props {
//   schedules: UserScheduleData[];
// }

// export interface Event {
//   id: string;
//   name: string;
// }

// const MonthlyScheduleView = ({ schedules }: Props) => {
//   const { year, month, setYear, setMonth } = useContext(DateContext) as DateContextValue;
//   const activeStartDate = new Date(year, month - 1, 1);

//   return (
//     <div className="monthlyScheduleView">
//       <Calendar
//         activeStartDate={activeStartDate}
//         showNeighboringMonth={false}
//         tileContent={({ date, view }) => {
//           const eventNames: Event[] = [];

//           schedules &&
//             schedules.map((schedule) => {
//               const date1 = dateFormatter(new Date(schedule.startAt)); // 서버에서 받아온 일정의 날짜
//               const date2 = dateFormatter(new Date(date));

//               if (date1 === date2) {
//                 eventNames.push({ id: schedule.eventId, name: schedule.title });
//               }
//             });
//           return <EventTagBox eventNames={eventNames} />;
//         }}
//         formatDay={(_, date) => {
//           return date.toLocaleString("en", { day: "numeric" });
//         }}
//         formatShortWeekday={(_, date) => date.toLocaleString("en-US", { weekday: "short" })}
//         onActiveStartDateChange={({ activeStartDate, view }) => {
//           setYear((prev) => {
//             const newYear = getYear(activeStartDate as Date);
//             if (prev !== newYear) {
//               return newYear;
//             } else {
//               return prev;
//             }
//           });
//           setMonth((prev) => {
//             const newMonth = getMonth(activeStartDate as Date);
//             if (prev !== newMonth) {
//               return newMonth;
//             } else {
//               return prev;
//             }
//           });
//         }}
//       />
//     </div>
//   );
// };

// export default MonthlyScheduleView;

import Calendar from "react-calendar";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";
import type { UserScheduleData } from "@/apis/participate/participateTypes";
import { useMonthlySwiperController } from "@/hooks/useMonthlySwiperController";
// import { useEffect } from "react"; // 디버깅용 외엔 제거 가능

interface Props {
  schedules: UserScheduleData[];
}

export interface Event {
  id: string;
  name: string;
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  // 훅에서 ref와 핸들러를 모두 가져옴
  const { swiperRef, calendarArr, handleTransitionEnd } = useMonthlySwiperController();

  return (
    <div className="monthlyScheduleView">
      <Swiper
        // Swiper 인스턴스를 ref에 연결
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        // 중요: 스와이프 애니메이션이 "완전히 끝난 뒤" 실행
        onSlideChangeTransitionEnd={handleTransitionEnd}
        initialSlide={1}
        spaceBetween={20}
        allowTouchMove={true}
        // loop={true} // 가상 슬라이드 방식이므로 loop prop은 false여야 함 (기본값)
      >
        {calendarArr.map((item) => (
          <SwiperSlide key={item.key}>
            <div className="calendar-wrapper">
              <Calendar
                activeStartDate={item.date}
                showNavigation={true}
                nextLabel={null}
                prevLabel={null}
                next2Label={null}
                prev2Label={null}
                view="month"
                onViewChange={() => {}}
                showNeighboringMonth={false}
                tileContent={({ date }) => {
                  const eventNames: Event[] = [];
                  if (schedules) {
                    schedules.forEach((schedule) => {
                      const date1 = dateFormatter(new Date(schedule.startAt));
                      const date2 = dateFormatter(new Date(date));
                      if (date1 === date2) {
                        eventNames.push({ id: schedule.eventId, name: schedule.title });
                      }
                    });
                  }
                  return <EventTagBox eventNames={eventNames} />;
                }}
                formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
                formatShortWeekday={(_, date) => date.toLocaleString("en-US", { weekday: "short" })}
                onActiveStartDateChange={() => {}}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MonthlyScheduleView;
