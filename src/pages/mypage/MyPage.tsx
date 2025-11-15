import React, { useEffect, useState } from "react";
// import myPageImg from "@/assets/myPage.png"; // ← fallback 용으로 유지
import "./MyPage.scss";
import { fetchMyPage } from "@/apis/user/userAPI";
import type { MypageResponse } from "@/apis/user/userTypes";

const MyPage = () => {
  const [userData, setUserData] = useState<MypageResponse>(null);

  const getUserData = async () => {
    try {
      const res = await fetchMyPage();

      if (!res) return;
      if (res.code === 401) {
        alert("인증이 필요합니다");
      } else if (res.code === 404) {
        alert("사용자를 찾을 수 없습니다.");
      } else if (res.code === 200) {
        // 실제 데이터만 저장
        setUserData(res.data);
      } else {
        alert(res.message ?? "유저 정보를 불러오지 못했습니다.");
      }
    } catch (e) {
      alert("서버 오류");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 데이터 오기 전에는 렌더하지 않음
  if (!userData) return <div className="myPage_ctn">불러오는 중…</div>;

  return (
    <div className="myPage_ctn">
      {/* <p className="myPage_text">마이 페이지</p> */}
      <div className="myPage_nickname">
        <div className="img_ctn">
          <img
            className="myPageImg"
            src={userData.profileImgUrl}
            alt="profile"
            // onError={(e) => {
            //   // 이미지 깨질 때 기본 이미지로
            //   (e.currentTarget as HTMLImageElement).src = myPageImg;
            // }}
          />
        </div>
        <div className="nickname_ctn">
          <p className="nickname_text">닉네임</p>
          <input value={userData.nickname} className="nickname" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
