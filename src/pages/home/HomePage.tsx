import { useEffect } from "react";
import styles from "./MeetingPage.module.scss";
import MeetingIncompleteSection from "../meeting/list/MeetingIncompleteSection";
import MeetingCompleteSection from "../meeting/list/MeetingCompleteSection";
import { useMeetingStore } from "@/store/meetingStore";
import { useNavigate } from "react-router-dom";

const MeetingPage = () => {
  const meetings = useMeetingStore((state) => state.meetingList);
  const fetchMeetings = useMeetingStore((state) => state.fetchMeetings);

  useEffect(() => {
    const userId = 3;
    fetchMeetings(userId);
  }, []);

  return (
    <div className={styles.meetingPage}>
      <MeetingCompleteSection meetingList={meetings} />
      <MeetingIncompleteSection meetingList={meetings} />
    </div>
  );
};

export default MeetingPage;
