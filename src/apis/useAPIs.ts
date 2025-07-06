import { useEffect, useState } from "react";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useAPIs = (path: string, method = "GET", data?: any, withAuth = false) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const access_token = sessionStorage.getItem("access-token");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}${path}`, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            ...(withAuth && { Authorization: `Bearer ${access_token}` }),
          },
          ...(data && { body: JSON.stringify(data) }),
        });
        const jsonData = await response.json();
        setResponse(jsonData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, method, JSON.stringify(data)]);

  return { response, loading, error };
};
