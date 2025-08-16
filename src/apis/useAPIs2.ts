// src/apis/useAPIs2.ts
import { useEffect, useState } from "react";
import { apiCall } from "@/utils/apiCall";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log("useAPI hook 실행됨");

export const useAPIs2 = <T = any>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  withAuth = false,
  manual = false // 수동 실행 여부
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!manual);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0); // 실행 트리거 카운터

  useEffect(() => {
    // manual 모드면 fire() 호출 전에는 실행하지 않음
    if (manual && trigger === 0) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const json = await apiCall(path, method, data, withAuth);
        if (!cancelled) setResponse(json as T);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    // cleanup
    return () => {
      cancelled = true;
    };
    // data가 객체일 수 있으니 안전하게 stringified deps
  }, [trigger, path, method, withAuth, JSON.stringify(data), manual]);

  const fire = () => setTrigger((n) => n + 1);

  return { response, loading, error, fire };
};
