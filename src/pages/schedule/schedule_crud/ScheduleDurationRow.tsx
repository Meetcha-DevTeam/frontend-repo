import React, { useEffect, useState } from "react";
import styles from "./ScheduleDurationRow.module.scss";
import RightChevron from "@assets/rightChevron.svg?react";
import { Picker, type PickerType } from "./ScheduleCrudCardExpandable";

interface Props {
  clickedSpan: string;
  // sharingData: string;
  // dataSetter: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  endTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  pickerType: PickerType;
  setPickerType: React.Dispatch<React.SetStateAction<PickerType>>;
}

const ScheduleDurationRow = ({
  clickedSpan,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  pickerType,
  setPickerType,
}: Props) => {
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

  return (
    <div className={styles.scheduleDurationRow}>
      <div
        className={styles.scheduleDurationRow__box}
        onClick={(e) => {
          e.stopPropagation();
          setPickerType(Picker.Start);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {initStartMonth} {initStartDate}
        </div>
        <div
          className={
            pickerType === Picker.Start
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
          setPickerType(Picker.End);
        }}
      >
        <div className={styles.scheduleDurationRow__box__date}>
          {initEndMonth} {initEndDate}
        </div>
        <div
          className={
            pickerType === Picker.End
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
