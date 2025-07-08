import React, { useEffect, useRef, useState } from "react";
import styles from "./MeetingOptionCard.module.scss";
import DownArrow from "@assets/downArrow.svg?react";
import InputComponent from "./InputComponent";

interface Props {
  title: string;
  icon: React.ReactNode;
  data: string;
  type: number;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

const MeetingOptionCard = ({ title, icon, data, type, dataSetter }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false); // 카드가 펼쳐졌는지 여부
  const contentRef = useRef<HTMLDivElement>(null); // 사용자 입력 컴포넌트 크기 영역 참조 변수
  let inputType; // 사용자 입력 방식(input태그, 달력, ...)

  switch (type) {
    case 0:
      inputType = <InputComponent />;
  }

  useEffect(() => {
    console.log(data);
    if (data !== undefined && data !== null) setActive(true);
    else {
      setActive(false);
    }
  }, [data]);

  // 카드의 높이를 구하는 로직(애니메이션 적용 위함)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      console.log(el.scrollHeight);
      el.style.height = el.scrollHeight + "px"; // 펼침
    } else {
      el.style.height = "0px"; // 접힘
    }
  }, [expanded]);

  return (
    <div
      className={
        expanded ? `${styles.expanded} ${styles.meetingOptionCard}` : styles.meetingOptionCard
      }
    >
      <div className={styles.meetingOptionCard__top} onClick={() => setExpanded((prev) => !prev)}>
        <div className={styles.meetingOptionCard__top__icon}>{icon}</div>
        <div className={styles.meetingOptionCard__top__data}>
          <div className={styles.meetingOptionCard__top__data__label}>{title}</div>
          <div className={styles.meetingOptionCard__top__data__value}>{data}</div>
        </div>
        <div className={styles.meetingOptionCard__downArrow}>
          <DownArrow />
        </div>
      </div>

      <div ref={contentRef} className={styles.meetingOptionCard__content}>
        {expanded && inputType}
      </div>
    </div>
  );
};

export default MeetingOptionCard;
