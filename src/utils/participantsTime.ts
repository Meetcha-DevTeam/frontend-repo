import type { AvailabilityParticipant } from "@/apis/meeting/meetingTypes";
import type { ParticipateObject } from "@/apis/participate/participateTypes";
import { addMinutes, parseISO, isSameDay, formatISO } from "date-fns";

/**
 * 30분 단위로 참여자별 시간을 분리한 맵
 * @return ISO format time(30분 단위): 가능한 참여자 수
 */
export const splitParticipantsTime = (participants: AvailabilityParticipant[]) => {
  // 시간: 참여자 개수
  const participantsTime = new Map<string, number>();
  participants.forEach((participant) => {
    participant.availabilities.forEach((availability) => {
      const startTime = availability.startAt;
      const endTime = availability.endAt;
      const startTimeDate = parseISO(startTime);
      const endTimeDate = parseISO(endTime);
      let time = startTimeDate;
      while (time < endTimeDate) {
        if (participantsTime.has(time.toISOString())) {
          participantsTime.set(time.toISOString(), participantsTime.get(time.toISOString())! + 1);
        } else {
          participantsTime.set(time.toISOString(), 1);
        }
        time = addMinutes(time, 30);
      }
    });
  });
  return participantsTime;
};

/**
 * 개수를 만족하는 시간들만 필터링
 * @return 30분단위 ISO format times
 */
export const filterParticipantsTime = (participantsTime: Map<string, number>, count: number) => {
  return Array.from(participantsTime.entries())
    .filter(([, value]) => value >= count)
    .map(([key]) => key);
};

/**
 * UI에 한번에 보이게 30분 단위 시간을 합침
 * @param times 30분 단위 시간들
 */
export const mergeParticipantsTime = (times: string[]): ParticipateObject[] => {
  if (times.length === 0) return [];

  // 정렬
  const sorted = times.map((time) => parseISO(time)).sort((a, b) => a.getTime() - b.getTime());

  const result: ParticipateObject[] = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    const expectedNext = addMinutes(end, 30);
    const isConsecutive30Min = cur.getTime() === expectedNext.getTime();
    const sameDay = isSameDay(cur, end);

    if (sameDay && isConsecutive30Min) {
      end = cur;
      continue;
    }

    // flush current range
    result.push({
      startAt: formatISO(start),
      endAt: formatISO(addMinutes(end, 30)),
    });

    // start new range
    start = cur;
    end = cur;
  }

  // flush last
  result.push({
    startAt: formatISO(start),
    endAt: formatISO(addMinutes(end, 30)),
  });

  return result;
};
