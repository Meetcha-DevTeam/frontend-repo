import React, { useEffect, useRef } from "react";
import styles from "./CarouselItem.module.scss";
import type { IncompleteMeetingData } from "@/types/meeting-data-type";
import Human from "@assets/human.svg?react";

interface Props {
  data: IncompleteMeetingData;
}

const CarouselItem = ({ data }: Props) => {
  const carouselItemRef = useRef<HTMLDivElement>(null);

  // CarouselItem의 width를 동적으로 감지 후 상태에 세팅
  // useEffect(() => {
  //   const target = carouselItemRef.current;
  //   if (!target) return;

  //   const resizeObserver = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       const newWidth = entry.contentRect.width;
  //       setItemWidth(newWidth);
  //     }
  //   });

  //   resizeObserver.observe(target);

  //   // 클린업
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [setItemWidth]);

  return (
    <div className={styles.carouselItem} ref={carouselItemRef}>
      <div className={styles.carouselItem__topEdge}></div>
      <div className={styles.carouselItem__dataArea}>
        <div className={styles.carouselItem__dataArea__expirationDate}>
          {data.participationExpirationDate}
        </div>
        <div className={styles.carouselItem__dataArea__timeAndPlace}>
          <div>{data.participationExpirationTime}</div>
          <div>{data.meetingName}</div>
        </div>
        <div className={styles.carouselItem__dataArea__participantNum}>
          <Human />
          {data.currentParticipantNum}
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
