import { useAPIs } from "@/apis/useAPIs";
import styles from "./MeetingIncompleteSection.module.scss";
import Carousel from "@/components/Carousel/Carousel";
import CarouselItem from "@/pages/meeting/list/CarouselItem";
import type { IncompleteMeetingData } from "@/types/incomp-meeting";

const MeetingIncompleteSection = () => {
  const userId = 3;
  const { response: dataSet, loading, error } = useAPIs(`/meeting_incomplete?id=${userId}`);

  // const dataSet: IncompleteMeetingData[] = [
  //   {
  //     participationExpirationDate: "2025/06/07",
  //     participationExpirationTime: "12:00",
  //     meetingName: "하이루",
  //     currentParticipantNum: 3,
  //   },
  //   {
  //     participationExpirationDate: "2025/12/07",
  //     participationExpirationTime: "12:45",
  //     meetingName: "ㅁㅁㅁㅁㅁ",
  //     currentParticipantNum: 4,
  //   },
  //   {
  //     participationExpirationDate: "2025/03/15",
  //     participationExpirationTime: "23:00",
  //     meetingName: "빠이",
  //     currentParticipantNum: 2,
  //   },
  // ];
  return (
    <div className={styles.meetingIncompleteSection}>
      <div className={styles.meetingIncompleteSection__label}>
        곧 다가올 나의 미팅을 확인해보세요
      </div>
      <Carousel
        dataSet={dataSet?.data}
        renderItem={(data, index) => <CarouselItem key={index} data={data} />}
      />
    </div>
  );
};

export default MeetingIncompleteSection;
