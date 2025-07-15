import React, { useEffect, useState } from "react";
import { useAPIs } from "@/apis/useAPIs";

import LeftChevron from "@assets/LeftChevron.svg";
import LowChevron from "@assets/LowChevron.svg";

import Summary_card from "./Summary_card";

import "./Memoir_meeting.scss";

const Mymeeting_summary = ({meetingLists}) => {
  
  const [meetingCount, setMeetingCount] = useState<number>(0);
  const [mainRole, setMainRole] = useState<string>("None");
  const [averageContribution, setAverageContribution] = useState<number>(0);

  const { response, fire } = useAPIs(
    "/my/meeting-summary",
    "GET",
    undefined,
    true,
    false
  );

  useEffect(() => {
    fire();
  }, []);

  useEffect(() => {
    if (response?.isSuccess) {
      const { meetingCount, mainRole, averageContribution } = response.data;
      setMeetingCount(meetingLists.size());
      setMainRole(mainRole);
      setAverageContribution(averageContribution);
    }
  }, [response]);

  //데이터를 받아온다..??
  return (
    <div className="meeting_summary_ctn">
      <div className="chevron_container">
        <button>
          <img src={LeftChevron} alt="leftChevron" />
        </button>
      </div>
      <div className="myMeeting_intro">
        <p>나의 미팅 요약</p>
        <button className="button_container">
          <p>전체</p>
          <img src={LowChevron} alt="lowchevron" />
        </button>
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
