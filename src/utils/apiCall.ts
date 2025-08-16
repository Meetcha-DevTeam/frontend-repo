import { request } from "@/apis/client";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  withAuth = false
) => {
  // 공통 클라이언트로 위임 (401 처리/토큰 재발급/재시도 자동)
  return await request(path, {
    method,
    body: data,
    withAuth,      // 필요 시 false로 호출하면 Authorization 헤더 없이 보냄
    // retryOn401: true (기본값)  ← 옵션으로 꺼도 됨
  });
};
