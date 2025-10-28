//구글 캘린더에 이미 있는 일정...,선택된 일정들 fullcalendar에서 쓰기 위해 데이터 변환
import { parseISO } from "date-fns";
import type {
  UserScheduleData,
  UISlot,
} from "@/apis/participate/participateTypes";
interface BusyEvent {
  start: Date;
  end: Date;
  display: string;
  classNames: string[];
  extendedProps: Record<string, any>;
}
interface SelectedEvent {
  start: string;
  end: string;
  display: string;
  backgroundColor: string;
  classNames: string[];
  extendedProps: Record<string, any>;
}

export const toBusyEvents = (
  scheduleData: UserScheduleData[] | null
): BusyEvent[] =>
  scheduleData.map((ev) => ({
    start: parseISO(ev.startAt),
    end: parseISO(ev.endAt),
    display: "background",
    classNames: ["busy-block"],
    extendedProps: { isBusy: true },
  }));

export const toSelectedEvents = (selectedTimes: UISlot[]): SelectedEvent[] =>
  selectedTimes.map((time) => ({
    start: time.startISO,
    end: time.endISO,
    display: "background",
    backgroundColor: "#FF6200",
    classNames: ["selected-block"],
    extendedProps: { isBusy: false },
  }));
