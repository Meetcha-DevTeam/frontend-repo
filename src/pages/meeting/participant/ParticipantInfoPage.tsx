import React from "react";
import styles from "./ParticipantInfoPage.module.scss";
import TopNav from "@/components/TopNav";
import ParticipantInfoView from "./ParticipantInfoView";
import { useLocation } from "react-router-dom";

const ParticipantInfoPage = () => {
  const { state } = useLocation();
  return (
    <div className={styles.participantInfoPage}>
      <TopNav label={"참여자 정보"} />
      <ParticipantInfoView data={state} />
    </div>
  );
};

export default ParticipantInfoPage;
