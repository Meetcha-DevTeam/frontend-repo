import { useAPIs } from "@/apis/useAPIs";
import styles from "./MeetingIncompleteSection.module.scss";
import Carousel from "@/components/Carousel/Carousel";
import CarouselItem from "@/pages/meeting/list/CarouselItem";

const MeetingIncompleteSection = () => {
  const userId = 3;
  const { response: dataSet, loading, error } = useAPIs(`/meeting_list?id=${userId}`);
  const incompleteData = dataSet?.data.filter((item) => {
    return item.meetingState === "incomplete";
  });

  return (
    <div className={styles.meetingIncompleteSection}>
      <div className={styles.meetingIncompleteSection__label}>매칭 완료 미팅</div>
      <Carousel
        dataSet={incompleteData}
        renderItem={(data, index) => <CarouselItem key={index} data={data} />}
      />
    </div>
  );
};

export default MeetingIncompleteSection;
