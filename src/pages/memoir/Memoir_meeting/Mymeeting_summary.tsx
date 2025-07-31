import React, { useEffect, useState } from "react";
import { useAPIs } from "@/apis/useAPIs";

import LowChevron from "@assets/LowChevron.svg";
import meetchalogo from "@assets/MeetchaLogo.svg";

import Summary_card from "./Summary_card";

import "./Memoir_meeting.scss";

const Mymeeting_summary = ({ meetingLists }) => {
  const [meetingCount, setMeetingCount] = useState<number>(0);
  const [mainRole, setMainRole] = useState<string>("");
  const [averageContribution, setAverageContribution] = useState<string>("");

  useEffect(() => {
    if (!Array.isArray(meetingLists) || meetingLists.length === 0) return;

    const finishedMeetings = meetingLists.filter((meeting) => {
      return meeting.meeting_status === "종료";
    });

    console.log(finishedMeetings);
    /* 1) 미팅 건수 */
    setMeetingCount(finishedMeetings.length);

    /* 2) 주요 역할 */
   
    setMainRole("--");

    /* 3) 평균 기여도 */
    
    setAverageContribution(`0%`);
  }, [meetingLists]); // meetingLists가 바뀔 때만 실행

  return (
    <div className="meeting_summary_ctn">
      <div className="logo_container">
        <button>
          <img className="logo_button" src={meetchalogo} alt="leftChevron" />
        </button>
      </div>
      <div className="myMeeting_intro">
        <p>나의 미팅 요약</p>
       
      </div>
      <div className="myMeetings">
        <Summary_card title="미팅 건수" value={`${meetingCount}`} />
        <Summary_card title="주요 역할" value={mainRole} />
        <Summary_card title="평균 기여도" value={`${averageContribution}`} />
      </div>
    </div>
  );
};

export default Mymeeting_summary;
