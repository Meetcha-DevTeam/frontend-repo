import React from "react";
import meetchaLogo from "@assets/MeetchaLogo.svg";
import calendar from "@assets/realCalendar.svg";
import "./LadingPage.scss";

import CommonContent from "./CommonContent";


const LandingPage = () => {
  return (
    <div className="landingPage_ctn">
      <div className="Header">
        <img src={meetchaLogo} alt="MeetchaLogo"></img>
        <p>모임의 시작은 MeetCha에서</p>
      </div>
      <div className="main_desc">
        <p><span style={{color:"#FF6200"}}>구글 캘린더</span>와 연동된 시작</p>
        <img src={calendar} alt="calendar"></img>
      </div>
      <CommonContent/>
      <div className="closing_ment">
        <p>
          팀원과 일정을 공유하고
          <br />
          회의 시간을 편리하게 정해보세요!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
