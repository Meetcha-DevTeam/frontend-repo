import React from "react";
import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";

const MeetingCreationPage = () => {
  return (
    <div className={styles.meetingCreationPage}>
      MeetingCreationPage
      <Button label={"미팅 생성하기"} />
    </div>
  );
};

export default MeetingCreationPage;
