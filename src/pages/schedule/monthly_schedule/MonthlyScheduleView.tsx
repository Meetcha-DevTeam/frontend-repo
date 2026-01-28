import Calendar from "react-calendar";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Calendar.scss";
import EventTagBox from "./EventTagBox";
import { dateFormatter } from "@/utils/dateFormatter";
import type { UserScheduleData } from "@/apis/participate/participateTypes";
import { useMonthlySwiperController } from "@/hooks/useMonthlySwiperController";

interface Props {
  schedules: UserScheduleData[];
}

export interface Event {
  id: string;
  name: string;
}

const MonthlyScheduleView = ({ schedules }: Props) => {
  const { swiperRef, calendarArr, handleTransitionEnd } = useMonthlySwiperController();

  return (
    <div className="monthlyScheduleView">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChangeTransitionEnd={handleTransitionEnd}
        initialSlide={1}
        spaceBetween={20}
        allowTouchMove={true}
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
