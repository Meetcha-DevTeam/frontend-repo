import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type {
  ParticipateResponse,
  MeetingInfoData,
  UserScheduleData,
} from "./participateTypes";

export const getUserMeetingData = async (meetingId: string) => {
  const res: ApiResponse<MeetingInfoData> = await apiCall(
    `/meeting/id/${meetingId}`,
    "GET",
    null,
    true
  );

  console.log("meetingData:", res);

  return res.data;
};

export const getUserScheduleData = async (first: string, last: string) => {
  const res: ApiResponse<UserScheduleData> = await apiCall(
    `/user/schedule?from=${first}T00:00:00&to=${last}T23:59:59`,
    "GET",
    null,
    true
  );
  console.log("UserScheduleData:",res);
  return res.data;
};

export const getPreviousAvailTime = async (meetingId: string) => {
  const res: ApiResponse<ParticipateResponse> = await apiCall(
    `/meeting/${meetingId}/available-times`,
    "GET",
    null,
    true
  );

  console.log("cur part: ", res);

  return res.data;
};
