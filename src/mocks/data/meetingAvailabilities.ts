import type { MeetingAvailabilities } from "@/apis/meeting/meetingTypes";

export const meetingAvailabilitiesMock: MeetingAvailabilities = {
  participants: [
    {
      // 1번: 월 화 수 목 금 토 (일 제외)
      participantId: "participant-1",
      userId: "user-1",
      name: "참여자1",
      availabilities: [
        {
          availabilityId: "avail-1-1",
          startAt: "2025-12-22T18:00:00",
          endAt: "2025-12-22T21:00:00",
        }, // 월
        {
          availabilityId: "avail-1-2",
          startAt: "2025-12-23T18:00:00",
          endAt: "2025-12-23T21:00:00",
        }, // 화
        {
          availabilityId: "avail-1-3",
          startAt: "2025-12-24T18:00:00",
          endAt: "2025-12-24T21:00:00",
        }, // 수
        {
          availabilityId: "avail-1-4",
          startAt: "2025-12-25T18:00:00",
          endAt: "2025-12-25T21:00:00",
        }, // 목
        {
          availabilityId: "avail-1-5",
          startAt: "2025-12-26T18:00:00",
          endAt: "2025-12-26T21:00:00",
        }, // 금
        {
          availabilityId: "avail-1-6",
          startAt: "2025-12-27T18:00:00",
          endAt: "2025-12-27T21:00:00",
        }, // 토
      ],
    },
    {
      // 2번: 화 수 목 금 토 (일, 월 제외)
      participantId: "participant-2",
      userId: "user-2",
      name: "참여자2",
      availabilities: [
        {
          availabilityId: "avail-2-1",
          startAt: "2025-12-23T18:00:00",
          endAt: "2025-12-23T21:00:00",
        }, // 화
        {
          availabilityId: "avail-2-2",
          startAt: "2025-12-24T18:00:00",
          endAt: "2025-12-24T21:00:00",
        }, // 수
        {
          availabilityId: "avail-2-3",
          startAt: "2025-12-25T18:00:00",
          endAt: "2025-12-25T21:00:00",
        }, // 목
        {
          availabilityId: "avail-2-4",
          startAt: "2025-12-26T18:00:00",
          endAt: "2025-12-26T21:00:00",
        }, // 금
        {
          availabilityId: "avail-2-5-1",
          startAt: "2025-12-27T18:00:00",
          endAt: "2025-12-27T18:30:00",
        }, // 토 30분
        {
          availabilityId: "avail-2-5-2",
          startAt: "2025-12-27T18:30:00",
          endAt: "2025-12-27T19:00:00",
        }, // 토 30분
        {
          availabilityId: "avail-2-5-3",
          startAt: "2025-12-27T19:00:00",
          endAt: "2025-12-27T19:30:00",
        }, // 토 30분
        {
          availabilityId: "avail-2-5-4",
          startAt: "2025-12-27T19:30:00",
          endAt: "2025-12-27T20:00:00",
        }, // 토 30분
        {
          availabilityId: "avail-2-5-5",
          startAt: "2025-12-27T20:00:00",
          endAt: "2025-12-27T20:30:00",
        }, // 토 30분
        {
          availabilityId: "avail-2-5-6",
          startAt: "2025-12-27T20:30:00",
          endAt: "2025-12-27T21:00:00",
        }, // 토 30분
      ],
    },
    {
      // 3번: 수 목 금 토 (일, 월, 화 제외)
      participantId: "participant-3",
      userId: "user-3",
      name: "참여자3",
      availabilities: [
        {
          availabilityId: "avail-3-1",
          startAt: "2025-12-24T18:00:00",
          endAt: "2025-12-24T21:00:00",
        }, // 수
        {
          availabilityId: "avail-3-2",
          startAt: "2025-12-25T18:00:00",
          endAt: "2025-12-25T21:00:00",
        }, // 목
        {
          availabilityId: "avail-3-3",
          startAt: "2025-12-26T18:00:00",
          endAt: "2025-12-26T21:00:00",
        }, // 금
        {
          availabilityId: "avail-3-4-1",
          startAt: "2025-12-27T18:00:00",
          endAt: "2025-12-27T19:00:00",
        }, // 토 1시간
        {
          availabilityId: "avail-3-4-2",
          startAt: "2025-12-27T19:00:00",
          endAt: "2025-12-27T20:00:00",
        }, // 토 1시간
        {
          availabilityId: "avail-3-4-3",
          startAt: "2025-12-27T20:00:00",
          endAt: "2025-12-27T21:00:00",
        }, // 토 1시간
      ],
    },
    {
      // 4번: 목 금 토 (일, 월, 화, 수 제외)
      participantId: "participant-4",
      userId: "user-4",
      name: "참여자4",
      availabilities: [
        {
          availabilityId: "avail-4-1",
          startAt: "2025-12-25T18:00:00",
          endAt: "2025-12-25T21:00:00",
        }, // 목
        {
          availabilityId: "avail-4-2",
          startAt: "2025-12-26T18:00:00",
          endAt: "2025-12-26T21:00:00",
        }, // 금
        {
          availabilityId: "avail-4-3",
          startAt: "2025-12-27T18:00:00",
          endAt: "2025-12-27T21:00:00",
        }, // 토
      ],
    },
    {
      // 5번: 금 토 (일, 월, 화, 수, 목 제외)
      participantId: "participant-5",
      userId: "user-5",
      name: "참여자5",
      availabilities: [
        {
          availabilityId: "avail-5-1",
          startAt: "2025-12-26T18:00:00",
          endAt: "2025-12-26T21:00:00",
        }, // 금
        {
          availabilityId: "avail-5-2",
          startAt: "2025-12-27T18:00:00",
          endAt: "2025-12-27T21:00:00",
        }, // 토
      ],
    },
    {
      // 6번: 토 (일, 월, 화, 수, 목, 금 제외)
      participantId: "participant-6",
      userId: "user-6",
      name: "참여자6",
      availabilities: [
        {
          availabilityId: "avail-6-1",
          startAt: "2025-12-27T18:00:00",
          endAt: "2025-12-27T21:00:00",
        }, // 토
      ],
    },
    {
      // 7번: 월 (일, 화, 수, 목, 금, 토 제외)
      participantId: "participant-7",
      userId: "user-7",
      name: "참여자7",
      availabilities: [
        {
          availabilityId: "avail-7-1",
          startAt: "2025-12-22T18:00:00",
          endAt: "2025-12-22T21:00:00",
        }, // 월
      ],
    },
  ],
  count: 7,
};
