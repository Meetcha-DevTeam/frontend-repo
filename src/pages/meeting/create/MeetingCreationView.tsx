import React from "react";
import styles from "./MeetingCreationView.module.scss";

const MeetingCreationView = () => {
  return (
    <div className={styles.meetingCreationView}>
      <input
        className={styles.meetingCreationView__inputTag}
        type="text"
        placeholder="미팅 제목을 적어주세요"
      />
      <div className={styles.meetingCreationView__meetingOptionContainer}></div>
    </div>
  );
};

export default MeetingCreationView;
