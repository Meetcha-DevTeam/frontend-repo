import React from "react";
import styles from "./HomePage.module.scss";
import MeetingIncompleteSection from "../meeting/list/MeetingIncompleteSection";
import MeetingCompleteSection from "../meeting/list/MeetingCompleteSection";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <MeetingIncompleteSection />
      <MeetingCompleteSection />
    </div>
  );
};

export default HomePage;
