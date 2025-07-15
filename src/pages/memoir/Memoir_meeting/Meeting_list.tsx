import React, { useEffect } from "react";

import "./Memoir_meeting.scss";

import Meeting_list_content from "./Meeting_list_content";



const Meeting_list = ({meetingLists}) => {
  


  return (
    <div className="meetingList_container">
      <div className="list_header">
        <p>미팅 회고 목록</p>
        <button>필터</button>
      </div>
      <div className="meetingLists_container">
        <Meeting_list_content meetingLists={meetingLists} />
      </div>
    </div>
  );
};

export default Meeting_list;
