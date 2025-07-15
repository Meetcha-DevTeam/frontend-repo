import React from "react";
import leftchevron from "@/assets/LeftChevron.svg";

import "./Memoir_write.scss";

const Memoir_write_intro = () => {
  return (
    <div className="memoir_write_intro_container">
      <button>
        <img src={leftchevron} alt="leftchevron"></img>
      </button>
      <p>회고 작성하기</p>
    </div>
  );
};

export default Memoir_write_intro;
