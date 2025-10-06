import dayjs from "dayjs";
import min from "dayjs/plugin/minMax";
import { useEffect, useState } from "react";
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from "@ncdai/react-wheel-picker";
import { useScheduleCreateFormContext } from "@/pages/schedule/schedule_crud/hooks/useScheduleCreateForm";
import type { ScheduleCreationData } from "@/pages/schedule/schedule_crud/schemas/scheduleCreationSchema";
import type { Dispatch, SetStateAction } from "react";
import styles from "./TimePicker.module.scss";

dayjs.extend(min);
interface TimeOption {
  meridiem: string;
  hour: string;
  minute: string;
}

const formatDate = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const formatTime = (time: TimeOption) => {
  const hour = Number(time.hour) + (time.meridiem === "오후" ? 12 : 0);
  return `${hour}:${time.minute}`;
};

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i * add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString().padStart(2, "0"),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(12, 5);
const meridiemOptions: WheelPickerOption[] = [
  { label: "오전", value: "오전" },
  { label: "오후", value: "오후" },
];

// type ScheduleCreationKeys = keyof ScheduleCreationData;

interface TimePickerProps {
  setStringTime: Dispatch<SetStateAction<string>>;
}

export const TimePicker = ({ setStringTime }: TimePickerProps) => {
  // const form = useScheduleCreateFormContext();
  const [time, setTime] = useState<TimeOption>({
    meridiem: "오전",
    hour: "12",
    minute: "00",
  });

  // const timeSetter = (time: TimeOption) => {
  //   setTime(time);
  //   form.setFormValue(`${startOrEnd}`, `${formatDate(day)}T${formatTime(time)}`);
  // };

  useEffect(() => {
    setStringTime(`${formatTime(time)}`);
  }, [time]);

  return (
    <div
      className={`${styles.timePicker} timePicker`}
      onPointerDownCapture={(e) => e.stopPropagation()}
      onClickCapture={(e) => e.stopPropagation()}
    >
      <WheelPickerWrapper>
        <WheelPicker
          options={meridiemOptions}
          value={time.meridiem}
          onValueChange={(value) => {
            setTime({ ...time, meridiem: value });
          }}
        />
        <WheelPicker
          options={hourOptions}
          infinite
          value={time.hour}
          onValueChange={(value) => {
            setTime({ ...time, hour: value });
          }}
        />
        <WheelPicker
          options={minuteOptions}
          infinite
          value={time.minute}
          onValueChange={(value) => {
            setTime({ ...time, minute: value });
          }}
        />
      </WheelPickerWrapper>
    </div>
  );
};
