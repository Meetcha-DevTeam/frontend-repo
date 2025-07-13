import React from "react";
import styles from "./MeetingItemCard.module.scss";

const MeetingItemCard = () => {
  return (
    <div className={styles.meetingItemCard}>
      <div className={styles.meetingItemCard__leftEdge}></div>
      <div className={styles.meetingItemCard__dataArea}>
        <div className={styles.meetingItemCard__dataArea__meetingInfo}></div>
        <div className={styles.meetingItemCard__dataArea__meetingState}></div>
      </div>
    </div>
  );
};

export default MeetingItemCard;
