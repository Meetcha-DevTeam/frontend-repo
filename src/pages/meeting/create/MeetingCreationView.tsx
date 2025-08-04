import React, { useEffect, useState } from "react";
import styles from "./MeetingCreationView.module.scss";
import Pencil from "@assets/pencil.svg?react";
import Calendar from "@assets/calendar.svg?react";
import Clock from "@assets/clock.svg?react";
import Watch from "@assets/watch.svg?react";
import MeetingOptionCard from "./MeetingOptionCard";
import type { MeetingSendData } from "./MeetingCreationPage";

interface Props {
  setAllDataReserved: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteData: React.Dispatch<React.SetStateAction<MeetingSendData>>;
}

const MeetingCreationView = ({ setAllDataReserved, setCompleteData }: Props) => {
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingDescription, setMeetingDescription] = useState<string>();
  const [meetingCandidateDates, setMeetingCandidateDates] = useState<string[]>();
  const [meetingProceedTime, setMeetingProceedTime] = useState<string>();
  const [deadline, setDeadline] = useState<string>("");

  const cardDataSet = [
    {
      id: 0,
      title: "미팅 설명",
      icon: <Pencil />,
      data: meetingDescription,
      dataSetter: setMeetingDescription,
    },
    {
      id: 1,
      title: "미팅 후보 날짜",
      icon: <Calendar />,
      data: meetingCandidateDates,
      dataSetter: setMeetingCandidateDates,
    },
    {
      id: 2,
      title: "미팅 진행 시간",
      icon: <Clock />,
      data: meetingProceedTime,
      dataSetter: setMeetingProceedTime,
    },
    {
      id: 3,
      title: "투표 마감 시간",
      icon: <Watch />,
      data: deadline,
      dataSetter: setDeadline,
    },
  ];

  useEffect(() => {
    if (
      meetingTitle &&
      meetingDescription &&
      meetingCandidateDates &&
      meetingProceedTime &&
      deadline
    ) {
      setAllDataReserved(true);
      setCompleteData({
        title: meetingTitle,
        description: meetingDescription,
        candidateDates: meetingCandidateDates,
        proceedTime: meetingProceedTime,
        deadline: deadline,
        projectId: crypto.randomUUID(),
      });
    }
  }, [meetingTitle, meetingDescription, meetingCandidateDates, meetingProceedTime, deadline]);

  return (
    <div className={styles.meetingCreationView}>
      <input
        className={styles.meetingCreationView__inputTag}
        type="text"
        placeholder="미팅 제목을 적어주세요"
        onChange={(e) => {
          setMeetingTitle(e.target.value);
        }}
      />
      <div className={styles.meetingCreationView__meetingOptionContainer}>
        {cardDataSet.map((item, _) => (
          <MeetingOptionCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            data={item.data}
            dataSetter={item.dataSetter}
            type={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingCreationView;
