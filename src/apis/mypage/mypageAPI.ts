import { apiCall } from "../apiCall";
import type { ApiResponse } from "../common/types";
import type { profileResponse } from "./mypageTypes";

export const fetchProfileData = async () => {
  const res: ApiResponse<profileResponse> = await apiCall("/user/mypage", "GET", null, true);

  switch (res.code) {
    case 200:
      return res.data;
    default:
      alert(res.message);
  }
};
