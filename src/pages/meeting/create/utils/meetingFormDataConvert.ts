import { parse } from "date-fns";
import type { MeetingCreationSchema } from "../hooks/useMeetingCreateForm";

export interface MeetingSendData {
  title: string;
  description: string;
  durationMinutes: number;
  candidateDates: string[];
  deadline: string;
  projectId: string;
}

/*
 * 폼 데이터를 서버에 적합한 형태로 정제
 * TODO: parse함수에서 검증 로직은 따로 분리해야함, zod쓰겠지~
 */
export const meetingFormDataConvert = (formData: MeetingCreationSchema) => {
  /**
   * 이거 먼가요? 나중에 누가 설명점
   */
  const projectDataParse = (projectId: MeetingCreationSchema["projectId"]) => {
    if (!projectId) return undefined;
    const index = projectId.indexOf(" ");
    return projectId.slice(0, index);
  };

  // duration은 숫자로 파싱하면서 총 "분"으로 변환
  const durationMinutesParse = (
    durationMinutes: MeetingCreationSchema["durationMinutes"]
  ) => {
    const parsedDate = parse(durationMinutes, "HH:mm", new Date());
    return parsedDate.getHours() * 60 + parsedDate.getMinutes();
  };

  const deadlineParse = (deadline: MeetingCreationSchema["deadline"]) => {
    if (!deadline) return undefined;
    if (!deadline.includes("T")) return undefined;
    const [date, time] = deadline.split("T");
    const [hour, minute] = time.split(":");
    const paddedTime = hour?.padStart(2, "0") + ":" + minute;
    return date + "T" + paddedTime;
  };
  
  return {
    ...formData,
    durationMinutes: durationMinutesParse(formData.durationMinutes),
    deadline: deadlineParse(formData.deadline),
    projectId: formData.projectId
      ? projectDataParse(formData.projectId)
      : undefined,
  };
};
