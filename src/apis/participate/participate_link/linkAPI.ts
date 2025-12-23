import { apiCall } from "@/apis/apiCall";
import type { ApiResponse } from "@/apis/common/types";
import type { MeetingData } from "./linkTypes";

export const requestLinkCheckFunc = async (linkText: string) => {
  const code = linkText.trim();
  if (!code) return;
  try {
    const res: ApiResponse<MeetingData> = await apiCall(
      `/meeting/code/${encodeURIComponent(code)}`,
      "GET",
      null,
      true
    );
    return res;
  } catch (e) {
    if (e instanceof Error) throw e;
  }
};
