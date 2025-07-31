import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  meetingLists: any[];
}
import "./Memoir_meeting.scss";
//여기에서는 post요청으로 한 부분을 해야됨... 미팅작성에서
//부터 가져온 데이터들로 구성해야 합니둥

const Meeting_list_content = ({ meetingLists }: Props) => {
  const navigate = useNavigate();
  const handleClick = (meeting: any) => {
    setTimeout(() => {
    navigate("/memoir-complete", { state: meeting });
  }, 0);
  };
  return (
    <div className="meetings_ctn">
      {Array.isArray(meetingLists) &&
        meetingLists.map((meeting) => {
          return (
            <div
              key={meeting.meeting_id}
              className="meeting_ctn"
              onClick={() => handleClick(meeting)}
            >
              <div className="meeting_intro">
                <div className="meeting_study">{meeting.title}</div>
                <p className="meeting_date">{meeting.created_at}</p>
              </div>
              <div className="meeting_main">
                <p className="meeting_title">{meeting.title}</p>
              </div>
              <div className="meeting_last">
                <p className="meeting_lastWeekDone"></p>
                <p className="meeting_nextWeekDone"></p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Meeting_list_content;
