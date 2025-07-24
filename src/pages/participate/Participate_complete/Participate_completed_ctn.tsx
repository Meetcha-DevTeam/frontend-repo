import React from "react";

import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";

import "./Participate_completed_ctn.scss";

import completed from "@assets/meeting_complete.svg";

const Participate_completed_ctn = () => {
  const title="미팅 참가";
  const button_text="링크 다시 입력하기";
  return (<div className="partici_completed_ctn">
    <Top_banner text={title}/>
    <div className="partici_main_ctn">
      <img src={completed} alt="warning"></img>
      <div className="text_ctn">
        <p>이미 참여가 마감됐어요</p>
        
      </div>
    </div>
    <Botton_banner_button text={button_text}/>
  </div>);
};

export default Participate_completed_ctn;
