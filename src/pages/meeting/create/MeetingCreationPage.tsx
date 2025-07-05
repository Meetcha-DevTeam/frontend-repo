import React from "react";
import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";

const MeetingCreationPage = () => {
  return (
    <div className={styles.meetingCreationPage}>
      <TopNav type="text" label="미팅 생성" />
      MeetingCreationPage
      <Button label={"미팅 생성하기"} />
    </div>
  );
};

export default MeetingCreationPage;
