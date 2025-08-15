import { useEffect, useState } from "react";
import styles from "./MeetingDetailPage.module.scss";
import Header from "@/components/Header";
import MeetingDetailView from "./MeetingDetailView";
import Button from "@/components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import type { MeetingDetail } from "@/apis/meeting/meetingTypes";
import { fetchMeetingDetail } from "@/apis/meeting/meetingAPI";

const MeetingDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(null);

  const clickHandler = () => {
    navigate(`/alternative/${state}`);
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchMeetingDetail(state);
      setMeetingDetail(data);
    };
    load();
  }, []);

  return (
    <div className={styles.meetingDetailPage}>
      <Header prevButton={true} />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          {meetingDetail && <MeetingDetailView data={meetingDetail} />}
        </div>
        {meetingDetail?.meetingStatus !== "BEFORE" && (
          <Button
            label={"나의 미팅 시간 수정하기"}
            className={styles.button}
            clickHandler={clickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default MeetingDetailPage;
