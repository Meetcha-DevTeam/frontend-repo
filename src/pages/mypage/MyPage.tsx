import "./MyPage.scss";
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect, useState } from "react";
import { fetchProfileData } from "@/apis/mypage/mypageAPI";
import { logout } from "@/apis/auth/authAPI";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProfileData();
      setUserData(data);
    };
    load();
  }, []);

  const logoutHandler = () => {
    if (logout()) navigate("/landingPage");
  };

  return (
    <main className="myPage">
      <section className="profileContainer">
        {userData ? (
          <>
            <img className="image" src={userData.profileImgUrl} alt="profile" />
            <div className="nickname">{userData.nickname}</div>
          </>
        ) : (
          <MoonLoader />
        )}
      </section>
      <section className="featureContainer">
        <div className="featureItem" onClick={() => logoutHandler()}>
          로그아웃
        </div>
      </section>
    </main>
  );
};

export default MyPage;
