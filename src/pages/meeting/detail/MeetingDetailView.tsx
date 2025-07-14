import React, { useEffect, useState } from "react";
import styles from "./MeetingDetailView.module.scss";
import type { MeetingDataType } from "@/types/meeting-data-type";
import MeetingDetailRow from "./MeetingDetailRow";
import CircleGraph from "@assets/circleGraph.svg?react";
import Check from "@assets/check.svg?react";
import People from "@assets/people.svg?react";
import CompletedMatching from "@assets/completedMatching.svg?react";
import FailedMatching from "@assets/failedMatching.svg?react";

interface Props {
  data: MeetingDataType;
}

const MeetingDetailView = ({ data }: Props) => {
  const dataArray = [
    {
      label: "진행시간",
      icon: <CircleGraph />,
      data: data.executionTime,
    },
    {
      label: "상태",
      icon: <Check />,
      data: data.meetingState,
    },
    {
      label: "참여자 정보 확인",
      icon: <People />,
      data: null,
    },
  ];

  return (
    <div className={styles.meetingDetailView}>
      <div className={styles.meetingDetailView__summary}>
        <div className={styles.meetingDetailView__summary__name}>{data.meetingName}</div>
        <div className={styles.meetingDetailView__summary__desc}>{data.meetingDescription}</div>
      </div>
      <div className={styles.meetingDetailView__infoArea}>
        {dataArray.map((item, index) => (
          <MeetingDetailRow key={index} label={item.label} icon={item.icon} data={item.data} />
        ))}
      </div>
      <div className={styles.meetingDetailView__iconArea}>
        {data.meetingState !== "incomplete" ? (
          <CompletedMatching className={styles.success} />
        ) : (
          <FailedMatching className={styles.failure} />
        )}
        {data.meetingState !== "incomplete" ? "매칭 완료!" : "매칭 실패"}
      </div>
    </div>
  );
};

export default MeetingDetailView;
