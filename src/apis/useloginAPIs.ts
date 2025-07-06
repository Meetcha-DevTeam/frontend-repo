export const postGoogleAuthCode = async (code: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }
  );

  const data = await response.json();
  return data;
};
