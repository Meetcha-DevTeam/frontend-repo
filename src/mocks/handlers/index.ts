import { RequestHandler, WebSocketHandler, http, HttpResponse } from "msw";
import { meetingAvailabilitiesMock } from "../data/meetingAvailabilities";
import type { ApiResponse } from "@/apis/common/types";
import type { MeetingAvailabilities } from "@/apis/meeting/meetingTypes";
import { API_BASE } from "@/apis/apiCall";

export const handlers: Array<RequestHandler | WebSocketHandler> = [
  http.get(`${API_BASE}/meeting-lists/:meetingId/availabilities`, () => {
    const response: ApiResponse<MeetingAvailabilities> = {
      timestamp: new Date().toISOString(),
      path: "/meeting-lists/:meetingId/availabilities",
      code: 200,
      message: "Success",
      data: meetingAvailabilitiesMock,
    };

    return HttpResponse.json(response);
  }),
];
