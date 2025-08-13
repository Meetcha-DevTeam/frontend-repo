import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { Meeting } from "./types";

export const fetchMeetingList = async () => {
  const res: ApiResponse<Meeting[]> = await apiCall("/meeting-lists", "GET", null, true);
  console.log("res:", res);
  return res.data;
};
