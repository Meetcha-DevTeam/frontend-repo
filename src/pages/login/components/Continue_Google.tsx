import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAPIs2 } from "@/apis/useAPIs2";
import google_logo from "../../../assets/Google.svg";
import "../styles/login.scss";

const Continue_Google = () => {
  const navigate = useNavigate();

  // 콜백 URL: 로컬/배포 자동 대응
  const redirectUri = `${window.location.origin}/oauth/google/callback`;

  // 콜백 시 ?code=... 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // 수동 실행 훅 (withAuth=false)
  const { response, error, fire: sendAuthCodeToServer } = useAPIs2(
    "/oauth/google",
    "POST",
    code ? { code, redirectUri } : undefined, // ← 서버가 redirectUri 검증 시 사용
    false,
    true
  );

  // code 교환 1회 가드
  const sentRef = useRef(false);
  useEffect(() => {
    if (code && !sentRef.current) {
      sentRef.current = true;
      sendAuthCodeToServer();
    }
  }, [code, sendAuthCodeToServer]);

  // 응답 처리
  useEffect(() => {
    if (response) {
      const ok = response.success ?? response.isSuccess;
      if (ok && response.data?.accessToken) {
        sessionStorage.setItem("access-token", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refresh-token", response.data.refreshToken);
        }
        // 주소창에서 ?code 제거 (새로고침 시 재전송 방지)
        window.history.replaceState({}, "", window.location.pathname);
        navigate("/schedule", { replace: true });
      } else if (response.code && response.code !== 200) {
        alert(`로그인 실패: ${response.message ?? "알 수 없는 오류"}`);
        navigate("/login", { replace: true });
      }
    }
    if (error) {
      console.error(error);
      alert("로그인에 실패했습니다.");
      navigate("/login", { replace: true });
    }
  }, [response, error, navigate]);

  // 구글로 이동
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      alert("VITE_GOOGLE_CLIENT_ID가 설정되지 않았습니다.");
      return;
    }
    const scope = encodeURIComponent("openid email profile");
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` + // ← 위와 동일한 값
      `&response_type=code` +
      `&scope=${scope}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = authUrl;
  };

  return (
    <button className="google_button" onClick={handleGoogleLogin}>
      <img src={google_logo} alt="google_logo" />
      <p>Sign in with Google</p>
    </button>
  );
};

export default Continue_Google;

