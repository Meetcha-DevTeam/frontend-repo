import { useState } from "react";
import styles from "./SchedulePage.module.scss";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import MonthlyScheduleView from "./monthly_schedule/MonthlyScheduleView";
import WeeklyScheduleView from "./weekly_schedule/WeeklyScheduleView";
import WriteButton from "@assets/writeButton.svg?react";

const SchedulePage = () => {
  const [viewNum, setViewNum] = useState<number>(0);
  return (
    <div className={styles.schedulePage}>
      <Header />
      <div className={styles.schedulePage__viewBox}>
        <div className={styles.schedulePage__viewBox__buttonContainer}>
          <div
            onClick={() => setViewNum(0)}
            className={
              viewNum === 0
                ? `${styles.active} ${styles.schedulePage__viewBox__buttonContainer__button}`
                : styles.schedulePage__viewBox__buttonContainer__button
            }
          >
            Monthly
          </div>
          <div
            onClick={() => setViewNum(1)}
            className={
              viewNum === 1
                ? `${styles.active} ${styles.schedulePage__viewBox__buttonContainer__button}`
                : styles.schedulePage__viewBox__buttonContainer__button
            }
          >
            Weekly
          </div>
        </div>
        {viewNum === 0 ? <MonthlyScheduleView /> : <WeeklyScheduleView />}
      </div>
      <WriteButton className={styles.writeButton} />
      <BottomNav />
    </div>
  );
};

export default SchedulePage;
