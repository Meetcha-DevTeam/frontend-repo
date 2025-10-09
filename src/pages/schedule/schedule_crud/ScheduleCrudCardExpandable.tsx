import React, { useEffect, useState } from "react";
import ScheduleDurationRow from "./ScheduleDurationRow";
import { useScheduleCreateForm } from "./hooks/useScheduleCreateForm";
import { TimePicker } from "./components/TimePicker";
import Clock from "@assets/clock.svg?react";
import styles from "./ScheduleCrudCard.module.scss";

interface Props {
  clickedSpan: string; // 주간캘린더에서 선택한 일정 범위
  dataSetter: React.Dispatch<React.SetStateAction<string>>;
}

export const Picker = {
  Start: "start",
  End: "end",
} as const;

export type PickerType = (typeof Picker)[keyof typeof Picker];

const ScheduleCrudCardExpandable = ({ clickedSpan, dataSetter }: Props) => {
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
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [pickerType, setPickerType] = useState<PickerType>(Picker.Start);
  const [startTime, setStartTime] = useState<string>(`${initStartMeridiem} ${initStartTime}`);
  const [endTime, setEndTime] = useState<string>(`${initEndMeridiem} ${initEndTime}`);
  const form = useScheduleCreateForm();

  const [initStartHour, initStartMinute] = initStartTime.split(":");
  const [initEndHour, initEndMinute] = initEndTime.split(":");

  useEffect(() => {
    dataSetter(
      `${initStartYear} ${initStartMonth} ${initStartDate} ${startTime} ${initEndYear} ${initEndMonth} ${initEndDate} ${endTime}`
    );
  }, [startTime, endTime]);

  return (
    <div
      onClick={(e) => {
        setIsCardOpen((prev) => !prev);
      }}
      className={isCardOpen ? `${styles.active} ${styles.scheduleCrudCard}` : styles.scheduleCrudCard}
    >
      <div className={styles.scheduleCrudCard__basic}>
        <div className={styles.scheduleCrudCard__basic__icon}>
          <Clock />
        </div>
        <div className={styles.scheduleCrudCard__basic__data}>
          <ScheduleDurationRow
            pickerType={pickerType}
            setPickerType={setPickerType}
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            clickedSpan={clickedSpan}
          />
        </div>
      </div>
      {isCardOpen && (
        <div className={styles.scheduleCrudCard__expanded}>
          {pickerType === Picker.Start ? (
            <TimePicker setStringTime={setStartTime} stringTime={startTime} />
          ) : (
            <TimePicker setStringTime={setEndTime} stringTime={endTime} />
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCrudCardExpandable;
