import React, { useRef } from "react";
import styles from "./MeetingCreationView.module.scss";
import MeetingOptionCard from "./MeetingOptionCard";
import type { MeetingSendData } from "./MeetingCreationPage";
import { cardDataSet } from "./constants/MeetingCreation.constants";
import {
  useMeetingCreateFormContext,
} from "./hooks/useMeetingCreateForm";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Pencil from "@assets/pencil.svg?react";
import DownArrow from "@assets/downArrow.svg?react";
import Calendar from "@assets/calendar.svg?react";
import TextInputComponent from "./input_component/TextInputComponent";
import type { MeetingCreationSchema } from "./schemas/meetingCreationSchema";

interface Props {
  setAllDataReserved: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleteData: React.Dispatch<React.SetStateAction<MeetingSendData>>;
}

const fieldNames: Record<
  keyof MeetingCreationSchema,
  keyof MeetingCreationSchema
> = {
  title: "title",
  description: "description",
  candidateDates: "candidateDates",
  durationMinutes: "durationMinutes",
  deadline: "deadline",
  projectId: "projectId",
};

const TriggerContent = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | string[];
}) => {
  return (
    <>
      {icon}
      <div className={styles.accordion__trigger__content}>
        <p className={styles.accordion__trigger__content__title}>{title}</p>
        <p className={styles.accordion__trigger__content__value}>
          {typeof value === "string" ? value : value.join(", ")}
        </p>
      </div>
      <DownArrow className={styles.accordion__trigger__chevron} />
    </>
  );
};

const MeetingCreationView = ({
  setAllDataReserved,
  setCompleteData,
}: Props) => {
  const form = useMeetingCreateFormContext();

  return (
    <div className={styles.meetingCreationView}>
      <input
        className={styles.meetingCreationView__inputTag}
        type="text"
        placeholder="미팅 제목을 적어주세요"
        onChange={(e) => {
          form.setFormValue("title", e.target.value);
        }}
      />
      <Accordion
        type="single"
        collapsible
        className={styles.accordion}
      >
        <AccordionItem
          value={fieldNames.description}
          className={styles.accordion__item}
        >
          <AccordionHeader>
            <AccordionTrigger className={styles.accordion__trigger}>
              <TriggerContent
                icon={<Pencil className={styles.accordion__trigger__icon} />}
                title="미팅 설명"
                value={form.getFormValue("description") || "-"}
              />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className={styles.accordion__content}>
            <textarea
              style={{
                width: "100%",
                height: "4rem",
                padding: "5px",
                border: "none",
                outline: "none",
                fontFamily: "Pretendard",
                resize: "none",
              }}
              value={form.getFormValue("description") || ""}
              onChange={(e) => {
                form.setFormValue("description", e.target.value);
              }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value={fieldNames.candidateDates}
          className={styles.accordion__item}
        >
          <AccordionHeader>
            <AccordionTrigger className={styles.accordion__trigger}>
              <TriggerContent icon={<Calendar className={styles.accordion__trigger__icon} />} title="미팅 후보 날짜" value={form.getFormValue("candidateDates")} />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className={styles.accordion__content}>
            미구현
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MeetingCreationView;
