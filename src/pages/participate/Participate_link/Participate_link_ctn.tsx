import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Participate_link.scss";

import Top_banner from "../common/Top_banner";

import { useMeetingStore } from "@/store/meetingStore";

import type { MeetingDataType } from "@/types/meeting-data-type";

const Participate_link = () => {
  const top_text = "미팅 참가";

  const userId=3;
  const [linkText, setLinkText] = useState<string>("");
  const navigate = useNavigate();
  //이친구는 지금 상태임...
  //내가 입력한 링크와 같은 미팅을 map을 통해 추출해낸 다음에..
  //그 미팅에 대한 정보를 얻어 내어서 미팅 정보를 다음페이지에
  // 전송한다. 만약 해당 미팅이 존재하지 않을 시
  //error로 navigate되고
  //만약 meetingstatus가 완료일시 completed로 이동한다.

  const {meetingList,fetchMeetings}=useMeetingStore();

  useEffect(()=>{
    fetchMeetings(userId);
  },[userId]);

  const handletextchange = (e) => {
    setLinkText(e.target.value);
  };
  let chosenMeeting: MeetingDataType | null = null;
  const LinkCheck = () => {
    const found = meetingList.find(
      (meeting) => meeting.meeting_code === linkText
    );
    chosenMeeting = found ?? null;
  }; //chosenmeeting이 정해짐

  const handleLinkCheck = () => {
    LinkCheck();
    //chosenmeeting의 status의 값에는
    // "매칭 중", 진행중" "매칭 실패" "완료" "시작 전"
    //만약 chosenmeeting의 status값이
    if (!chosenMeeting) {
      navigate("/error");
    } else if (chosenMeeting.meeting_status === "종료") {
      navigate("/complete");
    } else {
      navigate("/timetable", {
        state: {
          chosenMeeting: chosenMeeting,
        },
      });
    }
  };
  //chosen meeting이 어느 상태인지
  //아니면 null인지에 따라서 로직을 다르게 구현

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
          <input
            type="text"
            value={linkText}
            onChange={handletextchange}
            placeholder="링크 입력 및 붙여넣기"
          ></input>
        </div>
      </div>

      <div className="button_ctn">
        <button className="button" onClick={handleLinkCheck}>
          <div className="button_p_ctn">
            <p>다음</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Participate_link;
