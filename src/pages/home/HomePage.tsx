import React, { useEffect } from "react";
import styles from "./HomePage.module.scss";
import MeetingIncompleteSection from "../meeting/list/MeetingIncompleteSection";
import MeetingCompleteSection from "../meeting/list/MeetingCompleteSection";
import { useMeetingStore } from "@/store/meetingStore";

const HomePage = () => {
  const fetchMeetings = useMeetingStore((state) => state.fetchMeetings);

  useEffect(() => {
    const userId = 3;
    fetchMeetings(userId);
  }, []);

  return (
    <div className={styles.homePage}>
      <MeetingIncompleteSection />
      <MeetingCompleteSection />
    </div>
  );
};

export default HomePage;
