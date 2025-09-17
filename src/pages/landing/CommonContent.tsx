import React from "react";
import "./CommonContent.scss";

import meetingPage from "@assets/meetingCreate.svg";
import participatePage from "@assets/participate.svg";
import meetingListPage from "@assets/meetingLists.svg";
import memoirPage from "@assets/memoir.svg";

const CommonContent = () => {
  return (
    <div className="content_ctn">
      <div className="content-">
        <div className="content_text">
          <p>미팅 생성과 공유</p>
          <div className="content_desc">
            <p>미팅을 간단하게</p>
            <p>생성하고 공유하세요</p>
          </div>
        </div>
        <div className="img_ctn">
          <img src={meetingPage} alt="meetingPage"></img>
          <span className="line"></span>
          <span className="circle"></span>
          <img src={participatePage} alt="participatePage"></img>
        </div>
      </div>
      <div className="content">
        <div className="content_text">
          <p>미팅 관리</p>
          <div className="content_desc">
            <p>나의 미팅 목록을 통해</p>
            <p> 미팅을 관리해요</p>
          </div>
        </div>
        <img src={meetingListPage} alt="meetingListPage"></img>
      </div>
      <div className="content">
        <div className="content_text">
          <p>미팅 회고</p>
          <div className="content_desc">
            <p>느낀 점을 작성하고</p>
            <p>미팅을 회고해보세요</p>
          </div>
        </div>
        <img src={memoirPage} alt="memoirPage"></img>
      </div>
    </div>
  );
};

export default CommonContent;
