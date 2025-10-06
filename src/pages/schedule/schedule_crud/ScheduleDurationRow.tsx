import React, { useEffect, useState } from "react";
import styles from "./ScheduleDurationRow.module.scss";
import RightChevron from "@assets/rightChevron.svg?react";

interface Props {
  clickedSpan: string;
  sharingData: string;
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleDurationRow = ({ clickedSpan, sharingData, dataSetter }: Props) => {
  // ex) clickedSpan : 07월 31일(목) 오전 02:00 07월 31일(목) 오전 05:30
  const [
    initStartYear,
    initStartMonth,
    initStartDate,
    initStartMeridiem,
    initStartTime,
    initEndYear,
    initEndMonth,
    initEndDate,
    initEndMeridiem,
    initEndTime,
  ] = clickedSpan.split(" ");

  const [startOrEnd, setStartOrEnd] = useState<number>(1);
  const [startTime, setStartTime] = useState<string>(`${initStartMeridiem} ${initStartTime}`);
  const [endTime, setEndTime] = useState<string>(`${initEndMeridiem} ${initEndTime}`);

  useEffect(() => {
    if (sharingData == null || sharingData === "") return;
    if (startOrEnd === 1) {
      setStartTime(sharingData);
    } else if (startOrEnd === 2) {
      setEndTime(sharingData);
    }
  }, [sharingData]);

  useEffect(() => {
    dataSetter(
      `${initStartYear} ${initStartMonth} ${initStartDate} ${startTime} ${initEndYear} ${initEndMonth} ${initEndDate} ${endTime}`
    );
  }, [startTime, endTime]);

  return (
    <div className={styles.scheduleDurationRow}>
      <div
        className={styles.scheduleDurationRow__box}
        onClick={(e) => {
          e.stopPropagation();
          setStartOrEnd(1);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {initStartMonth} {initStartDate}
        </div>
        <div
          className={
            startOrEnd === 1
              ? `${styles.active} ${styles.scheduleDurationRow__box__time}`
              : styles.scheduleDurationRow__box__time
          }
        >
          {startTime}
        </div>
      </div>
      <RightChevron />
      <div
        className={styles.scheduleDurationRow__box}
        onClick={(e) => {
          e.stopPropagation();
          setStartOrEnd(2);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {initEndMonth} {initEndDate}
        </div>
        <div
          className={
            startOrEnd === 2
              ? `${styles.active} ${styles.scheduleDurationRow__box__time}`
              : styles.scheduleDurationRow__box__time
          }
        >
          {endTime}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDurationRow;
