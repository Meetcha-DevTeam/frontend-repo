import React from "react";
import styles from "./MeetingItemCard.module.scss";
import type { MeetingDataType } from "@/types/meeting-data-type";
import { useNavigate } from "react-router-dom";

interface Props {
  data: MeetingDataType;
}

const MeetingItemCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("detail", { state: data });
  };
  return (
    <div className={styles.meetingItemCard} onClick={handleClick}>
      <div className={styles.meetingItemCard__leftEdge}></div>
      <div className={styles.meetingItemCard__dataArea}>
        <div className={styles.meetingItemCard__dataArea__meetingInfo}>
          <div className={styles.meetingItemCard__dataArea__meetingInfo__meetingName}>
            {data.meetingName}
          </div>
          <div className={styles.meetingItemCard__dataArea__meetingInfo__meetingExpirationDate}>
            {data.participationExpirationDate} 마감
          </div>
        </div>
        <div className={styles.meetingItemCard__dataArea__meetingState}>{data.meetingState}</div>
      </div>
    </div>
  );
};

export default MeetingItemCard;
