import React, { useEffect, useState } from "react";
import styles from "./MeetingCreationView.module.scss";
import MeetingOptionCard from "./MeetingOptionCard";
import type { MeetingSendData } from "./MeetingCreationPage";
import { parse } from "date-fns/parse";
import { cardDataSet } from "./constants/MeetingCreation.constants";

interface Props {
  setAllDataReserved: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteData: React.Dispatch<React.SetStateAction<MeetingSendData>>;
}

const MeetingCreationView = ({ setAllDataReserved, setCompleteData }: Props) => {
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingDescription, setMeetingDescription] = useState<string>("");
  const [meetingCandidateDates, setMeetingCandidateDates] = useState<string[]>([]);
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [projectData, setProjectData] = useState<string>(null);

  const stateMapping = {
    description: { data: meetingDescription, dataSetter: setMeetingDescription },
    candidateDates: { data: meetingCandidateDates, dataSetter: setMeetingCandidateDates },
    durationMinutes: { data: durationMinutes, dataSetter: setDurationMinutes },
    deadline: { data: deadline, dataSetter: setDeadline },
    project: { data: projectData, dataSetter: setProjectData },
  };

  const projectDataParse = (project: string) => {
    if (!project) return null;
    const index = project.indexOf(" ");
    return project.slice(0, index);
  };

  const durationMinutesParse = (durationMinutes: string) => {
    const parsedDate = parse(durationMinutes, "HH:mm", new Date()); // duration은 숫자로 파싱하면서 총 "분"으로 변환
    return parsedDate.getHours() * 60 + parsedDate.getMinutes();
  };

  const deadlineParse = (deadline: string) => {
    if (!deadline) return null;
    if (!deadline.includes("T")) return null;
    const [date, time] = deadline?.split("T");
    const [hour, minute] = time?.split(":");
    const paddedTime = hour?.padStart(2, "0") + ":" + minute;
    return date + "T" + paddedTime;
  };
  //
  useEffect(() => {
    if (
      meetingTitle &&
      meetingCandidateDates.length > 0 &&
      durationMinutes &&
      deadlineParse(deadline)
    ) {
      setAllDataReserved(true);
      setCompleteData({
        title: meetingTitle,
        description: meetingDescription,
        candidateDates: meetingCandidateDates,
        durationMinutes: durationMinutesParse(durationMinutes),
        deadline: deadlineParse(deadline),
        projectId: projectDataParse(projectData),
      });
    }
  }, [
    meetingTitle,
    meetingDescription,
    meetingCandidateDates,
    durationMinutes,
    deadline,
    projectData,
  ]);

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
            data={stateMapping[item.stateKey as keyof typeof stateMapping].data}
            dataSetter={stateMapping[item.stateKey as keyof typeof stateMapping].dataSetter}
            type={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetingCreationView;
