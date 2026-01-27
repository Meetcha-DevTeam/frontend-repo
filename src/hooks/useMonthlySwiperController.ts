import { useContext, useRef, useState, useLayoutEffect } from "react";
import { addMonths, subMonths, getYear, getMonth } from "date-fns";
import type { Swiper as SwiperType } from "swiper";
import { DateContext } from "@/pages/schedule/DataContext";

export function useMonthlySwiperController() {
  const { year, month, setYear, setMonth } = useContext(DateContext)!;

  // 컴포넌트와 공유할 하나의 Ref만 사용
  const swiperRef = useRef<SwiperType | null>(null);

  const [standardDate, setStandardDate] = useState(() => new Date(year, month - 1, 1));

  const [calendarArr, setCalendarArr] = useState(() => {
    const prev = subMonths(standardDate, 1);
    const next = addMonths(standardDate, 1);
    return [
      { date: prev, key: prev.getTime() },
      { date: standardDate, key: standardDate.getTime() },
      { date: next, key: next.getTime() },
    ];
  });

  // 날짜 동기화
  useLayoutEffect(() => {
    setYear(getYear(standardDate));
    setMonth(getMonth(standardDate) + 1);
  }, [standardDate, setYear, setMonth]);

  // 데이터가 변경되면 화면을 다시 가운데(Index 1)로 정렬
  useLayoutEffect(() => {
    if (swiperRef.current) {
      // 애니메이션 없이 즉시 이동 (사용자는 데이터가 바뀐 줄 모름)
      swiperRef.current.slideTo(1, 0, false);
    }
  }, [calendarArr]);

  // 중요: 애니메이션이 끝난 후 호출될 함수
  const handleTransitionEnd = (swiper: SwiperType) => {
    const { activeIndex } = swiper;

    // 중앙(1)에 멈춰있으면 아무것도 안 함
    if (activeIndex === 1) return;

    setCalendarArr((prevArr) => {
      const movingForward = activeIndex > 1; // 1보다 크면 오른쪽(미래)
      const newStandard = movingForward ? addMonths(standardDate, 1) : subMonths(standardDate, 1);

      const newArr = [...prevArr];
      if (movingForward) {
        const nextMonth = addMonths(newStandard, 1);
        newArr.push({ date: nextMonth, key: nextMonth.getTime() });
        newArr.shift();
      } else {
        const prevMonth = subMonths(newStandard, 1);
        newArr.unshift({ date: prevMonth, key: prevMonth.getTime() });
        newArr.pop();
      }

      setStandardDate(newStandard);
      return newArr;
    });
  };

  return {
    swiperRef,
    calendarArr,
    handleTransitionEnd, // 이름 변경
  };
}
