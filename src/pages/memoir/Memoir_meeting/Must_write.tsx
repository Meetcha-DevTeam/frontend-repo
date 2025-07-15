import React from "react";
import { useNavigate } from "react-router-dom";

import plus from "@/assets/plus.svg";

import "./Memoir_meeting.scss";

const Must_write = ({ meetingLists }) => {
  const navigate = useNavigate();

  const handleClick = (meeting) => {
    navigate("/memoir-write",{
      state:{
        title:meeting.title,
        meetingDate:meeting.meetingDate,
      },
    });
  };
  return (
    <div className="must_write_ctn">
      <p>작성이 필요한 미팅</p>
      <div className="meetingcard_container">
        {Array.isArray(meetingLists) &&
          meetingLists
            .filter((meeting) => !meeting.done)
            .map((meeting) => (
              <div key={meeting.id} className="meetingcard">
                <p>{meeting.title}</p>
                <p>{meeting.meetingDate}</p>
                <button 
                  className="writeMemoir_button"
                  onClick={()=>handleClick(meeting)}
                >
                  <img src={plus} alt="plus"></img>
                  <span>회고 작성하기</span>
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Must_write;
