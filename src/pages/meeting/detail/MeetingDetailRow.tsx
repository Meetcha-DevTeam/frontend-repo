import React from "react";
import styles from "./MeetingDetailRow.module.scss";

interface Props {
  label: string;
  icon: React.ReactNode;
  data: string;
}

const MeetingDetailRow = ({ label, icon, data }: Props) => {
  return (
    <div className={styles.meetingDetailRow}>
      <div className={styles.meetingDetailRow__leftArea}>
        {icon}
        {label}
      </div>
      <div className={styles.meetingDetailRow__rightArea}>{data}</div>
    </div>
  );
};

export default MeetingDetailRow;
