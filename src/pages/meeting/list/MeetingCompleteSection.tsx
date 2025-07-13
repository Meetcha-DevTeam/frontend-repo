import React from "react";
import styles from "./MeetingCompleteSection.module.scss";
import Checkbox from "@assets/checkbox.svg?react";
import { useMeetingStore } from "@/store/meetingStore";
import MeetingItemCard from "./MeetingItemCard";
import type { MeetingDataType } from "@/types/meeting-data-type";

const MeetingCompleteSection = () => {
  const meetingList: MeetingDataType[] = useMeetingStore((state) => state.meetingList);
  const completeDataList = meetingList?.filter((item) => {
    return item.meetingState !== "incomplete";
  });

  return (
    <div className={styles.meetingCompleteSection}>
      <div className={styles.meetingCompleteSection__label}>
        <Checkbox />
        확인해주세요
      </div>
      <div className={styles.meetingCompleteSection__meetingList}>
        {completeDataList.map((item, _) => (
          <MeetingItemCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MeetingCompleteSection;
