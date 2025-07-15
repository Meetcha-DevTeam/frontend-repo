import React from "react";

interface Props{
    meetingLists: any[];
}
import "./Memoir_meeting.scss";

const Meeting_list_content = ({meetingLists}:Props) => {
  return (
  <div className="meetings_ctn">
    {
        
        Array.isArray(meetingLists) && meetingLists.map((meeting)=>{
            return(
                <div key={meeting.id} className="meeting_ctn">
                    <div className="meeting_intro">
                        <div className="meeting_study">{meeting.study}</div>
                        <p className="meeting_date">{meeting.meetingDate}</p>
                    </div>
                    <div className="meeting_main">
                        <p className="meeting_title">{meeting.title}</p>
                    </div>
                    <div className="meeting_last">
                        <p className="meeting_lastWeekDone">{meeting.lastWeekDone}</p>
                        <p className="meeting_nextWeekDone">{meeting.nextWeekDone}</p>
                    </div>
                </div>
            );
        })
    }
  </div>);
};

export default Meeting_list_content;
