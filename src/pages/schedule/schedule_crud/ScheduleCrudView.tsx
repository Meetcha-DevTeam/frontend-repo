import React, { useEffect, useState } from "react";
import styles from "./ScheduleCrudView.module.scss";
import Clock from "@assets/clock.svg?react";
import Pencil from "@assets/pencil.svg?react";
import { TimePicker } from "@/pages/schedule/schedule_crud/components/TimePicker";
import ScheduleCreationCard from "./ScheduleCrudCard";
import ScheduleRepetitionRow from "./ScheduleRepetitionRow";
import ScheduleDurationRow from "./ScheduleDurationRow";
import ScheduleCrudCardExpandable from "./ScheduleCrudCardExpandable";
import ScheduleCrudCard from "./ScheduleCrudCard";
import { useScheduleCreateForm, useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";

interface Props {
  clickedSpan: string;
  scheduleTitle: string;
  scheduleTime: string;
  recurrence: string;
  setScheduleTitle: React.Dispatch<React.SetStateAction<string>>;
  setScheduleTime: React.Dispatch<React.SetStateAction<string>>;
  setRecurrence: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleCrudView = ({
  clickedSpan,
  scheduleTitle,
  scheduleTime,
  recurrence,
  setScheduleTitle,
  setScheduleTime,
  setRecurrence,
}: Props) => {
  const form = useScheduleCreateFormContext();
  // const cardDataSet = [
  //   {
  //     id: 0,
  //     icon: <Clock />,
  //     expand: true,
  //     expandedComponent: TimePicker,
  //     basicComponent: ScheduleDurationRow,
  //     basicProps: {
  //       clickedSpan,
  //       dataSetter: setScheduleTime,
  //     },
  //     data: scheduleTime,
  //     dataSetter: setScheduleTime,
  //   },
  //   {
  //     id: 1,
  //     icon: <Pencil />,
  //     expand: false,
  //     expandedComponent: null,
  //     basicComponent: ScheduleRepetitionRow,
  //     basicProps: {
  //       data: recurrence,
  //       dataSetter: setRecurrence,
  //     },
  //     data: recurrence,
  //     dataSetter: setRecurrence,
  //   },
  // ];

  return (
    <div className={styles.scheduleCrudView}>
      <input
        className={styles.scheduleCrudView__inputTag}
        type="text"
        placeholder="일정 제목"
        value={form.getFormValue("title")}
        onChange={(e) => {
          // setScheduleTitle(e.target.value);
          form.setFormValue("title", e.target.value);
        }}
      />
      <div className={styles.scheduleCrudView__scheduleOptionContainer}>
        {/* {cardDataSet.map((item, _) => (
          <ScheduleCreationCard
            key={item.id}
            icon={item.icon}
            expand={item.expand}
            data={item.data}
            dataSetter={item.dataSetter}
            BasicComponent={item.basicComponent}
            basicProps={item.basicProps}
            ExpandedComponent={item.expandedComponent}
          />
        ))} */}
        <ScheduleCrudCardExpandable clickedSpan={clickedSpan} />
        <ScheduleCrudCard icon={<Pencil />} content={<ScheduleRepetitionRow />} type={"recurrence"} />
      </div>
    </div>
  );
};

export default ScheduleCrudView;
