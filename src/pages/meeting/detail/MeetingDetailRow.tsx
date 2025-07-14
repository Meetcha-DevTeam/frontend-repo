import React, { useEffect, useState } from "react";
import styles from "./MeetingDetailRow.module.scss";
import { useNavigate } from "react-router-dom";
import type { MeetingDataType } from "@/types/meeting-data-type";
import { apiCall } from "@/utils/apiCall";

interface Props {
  label: string;
  icon: React.ReactNode;
  data: string | MeetingDataType;
}

const MeetingDetailRow = ({ label, icon, data }: Props) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    const getParticipantsData = async () => {
      const response = await apiCall(`/meeting_participants?id=${data}`);
      setParticipants(response);
    };
    if (label === "참여자 정보 확인") {
      getParticipantsData();
    }
  }, [data]);

  const handleClick = () => {
    if (label === "참여자 정보 확인")
      navigate("/participant", {
        state: { ...participants, name: (data as MeetingDataType).meetingName },
      });
  };

  return (
    <div className={styles.meetingDetailRow} onClick={handleClick}>
      <div className={styles.meetingDetailRow__leftArea}>
        {icon}
        {label}
      </div>
      <div className={styles.meetingDetailRow__rightArea}>
        {label === "참여자 정보 확인" ? "..." : (data as string)}
      </div>
    </div>
  );
};

export default MeetingDetailRow;
