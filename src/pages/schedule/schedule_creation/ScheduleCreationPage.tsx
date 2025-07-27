import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import styles from "./ScheduleCreationPage.module.scss";
import ScheduleCreationView from "./ScheduleCreationView";
import { apiCall } from "@/utils/apiCall";

interface Props {
  clickedSpan: string;
  createMode: boolean; // true -> create mode, false -> edit mode
}

const PATH = `/schedule-create`;

const ScheduleCreationPage = ({ clickedSpan, createMode }: Props) => {
  const [allDataReserved, setAllDataReserved] = useState<boolean>(false);
  const [scheduleTitle, setScheduleTitle] = useState<string>();
  const [scheduleTime, setScheduleTime] = useState<string>();
  const [repetition, setRepetition] = useState<string>();

  useEffect(() => {
    console.log("1: ", scheduleTitle);
    console.log("2: ", scheduleTime);
    console.log("3: ", repetition);
    if (scheduleTitle && scheduleTime && repetition) setAllDataReserved(true);
  }, [scheduleTitle, scheduleTime, repetition]);

  const sendCreationReq = async () => {
    if (!allDataReserved) return;
    const data = {
      scheduleTitle: scheduleTitle,
      scheduleTime: scheduleTime,
      repetition: repetition,
    };
    const response = await apiCall(PATH, "POST", data, true);

    switch (response.code) {
      case 20000:
        alert("일정 생성이 완료되었습니다");
        break;
      default:
        alert("오류가 발생하였습니다.. 잠시후 다시 시도해주세요");
    }
  };

  return (
    <div className={styles.scheduleCreationPage}>
      <ScheduleCreationView
        clickedSpan={clickedSpan}
        scheduleTitle={scheduleTitle}
        scheduleTime={scheduleTime}
        repetition={repetition}
        setScheduleTitle={setScheduleTitle}
        setScheduleTime={setScheduleTime}
        setRepetition={setRepetition}
      />
      <Button
        className={allDataReserved ? styles.active : styles.inactive}
        label={"미팅 생성하기"}
        clickHandler={sendCreationReq}
      />
    </div>
  );
};

export default ScheduleCreationPage;
