import React from "react";
import styles from "./MeetingCompleteSection.module.scss";
import Checkbox from "@assets/checkbox.svg?react";
import { useMeetingStore } from "@/store/meetingStore";

const MeetingCompleteSection = () => {
  const meetingList = useMeetingStore((state) => state.meetingList);
  console.log("meetingList:", meetingList);

  return (
    <div className={styles.meetingCompleteSection}>
      <div className={styles.meetingCompleteSection__label}>
        <Checkbox />
        확인해주세요
      </div>
    </div>
  );
};

export default MeetingCompleteSection;
