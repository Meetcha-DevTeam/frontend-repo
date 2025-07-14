import React from "react";
import styles from "./MeetingDetailPage.module.scss";
import Header from "@/components/Header";
import MeetingDetailView from "./MeetingDetailView";
import Button from "@/components/Button";
import { useLocation } from "react-router-dom";

const MeetingDetailPage = () => {
  const { state } = useLocation();

  console.log(state);

  return (
    <div className={styles.meetingDetailPage}>
      <Header prevButton={true} />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          <MeetingDetailView data={state} />
        </div>
        {state.meetingState === "failure" && (
          <Button label={"다른 시간 제안"} className={styles.button} />
        )}
      </div>
    </div>
  );
};

export default MeetingDetailPage;
