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
];
