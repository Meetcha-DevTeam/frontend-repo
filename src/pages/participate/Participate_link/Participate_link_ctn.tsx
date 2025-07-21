import React from "react";

import "./Participate_link.scss";

import Top_banner from "../common/Top_banner";
import Botton_banner_button from "../common/Botton_banner_button";

const Participate_link = () => {
  const top_text = "미팅 참가";
  const bottom_text = "다음";

  return (
    <div className="partici_link_ctn">
      <Top_banner text={top_text} />
      <div className="partici_link_main">
        <div className="p_input_ctn">
          <p>
            공유받은 링크로
            <br />
            미팅에 참여할 수 있어요
          </p>
          <input type="text" placeholder="링크 입력 및 붙여넣기"></input>
        </div>
      </div>
      <Botton_banner_button text={bottom_text} />
    </div>
  );
};

export default Participate_link;
