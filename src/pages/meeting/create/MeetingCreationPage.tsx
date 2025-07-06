import styles from "./MeetingCreationPage.module.scss";
import Button from "@/components/Button";
import TopNav from "@/components/TopNav";
import MeetingCreationView from "./MeetingCreationView";

const MeetingCreationPage = () => {
  return (
    <div className={styles.meetingCreationPage}>
      <TopNav type="text" label="미팅 생성" />
      <div className={styles.meetingCreationPage__contents}>
        <MeetingCreationView />
        <Button label={"미팅 생성하기"} />
      </div>
    </div>
  );
};

export default MeetingCreationPage;
