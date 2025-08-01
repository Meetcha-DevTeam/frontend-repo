import { http } from "msw";

export const handlers = [
  http.get("/user/schedule", ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    console.log("쿼리 파라미터:", { from, to });

    return Response.json({
      isSuccess: true,
      code: 200,
      message: "일정 조회 성공",
      data: [
        {
          eventId: "abc123xyz",
          title: "회의",
          startAt: "2025-08-01T14:00:00",
          endAt: "2025-08-01T15:00:00",
          recurrence: "매주", // or "매일", "매월", "NONE"
        },
        {
          eventId: "def456uvw",
          title: "점심 시간",
          startAt: "2025-08-02T12:00:00",
          endAt: "2025-08-02T13:00:00",
          recurrence: "매주", // or "매일", "매월", "NONE"
        },
      ],
    });
  }),
  http.get("/meeting-lists", ({ request }) => {
    return Response.json({
      isSuccess: true,
      code: 200,
      message: "유저 미팅 목록 조회 성공",
      data: [
        {
          meetingId: "a8f2b6f7-43a7-4a83-b57e-7dc99c3a9d3d",
          title: "전공 기초 프로젝트",
          deadline: "2024-05-31T13:00:00+09:00",
          confirmedTime: "2024-05-27T13:00:00+09:00",
          durationMinutes: 120,
          meetingStatus: "진행 중",
        },
        {
          meetingId: "a8f2b6f7-43a7-4a83-b57e-7dc99c67cn13",
          title: "모바일 프로그래밍",
          deadline: "2025-08-01T13:00:00+09:00",
          confirmedTime: "2024-08-03T13:00:00+09:00",
          durationMinutes: 120,
          meetingStatus: "완료",
        },
        {
          meetingId: "6c3d43e4-2de2-4bd7-8b92-5c1c2e3bc18e",
          title: "코딩 스터디",
          deadline: "2024-06-01T13:00:00+09:00",
          confirmedTime: null,
          durationMinutes: 90,
          meetingStatus: "매칭 실패",
        },
        {
          meetingId: "6c3d1111-2de2-4bd7-8b92-5c1c2e3bc18e",
          title: "자바스크립트 스터디",
          deadline: "2024-06-01T13:00:00+09:00",
          confirmedTime: null,
          durationMinutes: 90,
          meetingStatus: "매칭 중",
        },
      ],
    });
  }),
];
