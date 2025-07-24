import React from "react";

import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";

import "./Participate_error.scss";

import error from "@assets/warning.svg";

const Participate_error_ctn = () => {
  const title="미팅 참가";
  const button_text="링크 다시 입력하기";
  return (<div className="partici_error_ctn">
    <Top_banner text={title}/>
    <div className="partici_main_ctn">
      <img src={error} alt="warning"></img>
      <div className="text_ctn">
        <p>미팅을 찾을 수 없어요</p>
        <p>다시 한번 링크를 확인해주세요!</p>
      </div>
    </div>
    <Botton_banner_button text={button_text}/>
  </div>);
};

export default Participate_error_ctn;
