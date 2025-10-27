import { useEffect, useState } from "react";
import "./MyPage.scss";
import { fetchProfileData } from "@/apis/mypage/mypageAPI";
import MoonLoader from "react-spinners/MoonLoader";

const MyPage = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProfileData();
      setUserData(data);
    };
    load();
  }, []);

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
        <div className="featureItem">로그아웃</div>
      </section>
    </main>
  );
};

export default MyPage;
