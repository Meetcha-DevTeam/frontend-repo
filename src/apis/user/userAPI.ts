import { apiCall } from "../apiCall";
import type { MypageResponse } from "./userTypes";

export const fetchMyPage = async () => {
  return apiCall<MypageResponse>("/user/mypage", "GET", null, true);
};
