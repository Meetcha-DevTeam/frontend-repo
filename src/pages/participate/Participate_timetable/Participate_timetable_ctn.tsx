import React from "react";

import "./Participate_timetabe.scss";

import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";
import Timetable from "./Timetable";

const Participate_timetable_ctn = () => {
  return (
    <>
      <Top_banner text={"미팅 참가"} />
      <div className="participate_ctn">
        <div className="text_container1">
          <div className="meeting_info_ctn">
            <div className="dividend"></div>
            <div className="meeting_info">
              <p>코딩 스터디 회의</p>
              <p>2025.05.10</p>
            </div>
          </div>
          <input type="text" placeholder="닉네임*"></input>
        </div>

        <div className="timetable">
          <p>
            참여 가능 시간<span>*</span>
          </p>
          <div className="timetable_ctn">
            <Timetable />
          </div>
        </div>
      </div>
      <Botton_banner_button text={"참여하기"} />
    </>
  );
};

export default Participate_timetable_ctn;
