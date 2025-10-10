import styles from "./ScheduleCrudView.module.scss";
import Clock from "@assets/clock.svg?react";
import Pencil from "@assets/pencil.svg?react";
import ScheduleRepetitionRow from "./ScheduleRepetitionRow";
import ScheduleCrudCardExpandable from "./ScheduleCrudCardExpandable";
import ScheduleCrudCard from "./ScheduleCrudCard";
import { useScheduleCreateFormContext } from "./hooks/useScheduleCreateForm";
import { useUiContext } from "./ScheduleCrudPage";
import { Slide } from "../weekly_schedule/WeeklyCalendar";

const ScheduleCrudView = () => {
  const form = useScheduleCreateFormContext();
  const uiContext = useUiContext();

  return (
    <div className={styles.scheduleCrudView}>
      <input
        className={styles.scheduleCrudView__inputTag}
        type="text"
        placeholder={uiContext.slideType === Slide.Create ? "일정 제목" : form.getFormValue("title")}
        value={form.getFormValue("title")}
        onChange={(e) => {
          form.setFormValue("title", e.target.value);
        }}
      />
      <div className={styles.scheduleCrudView__scheduleOptionContainer}>
        <ScheduleCrudCardExpandable clickedSpan={uiContext.clickedSpan} />
        <ScheduleCrudCard icon={<Pencil />} content={<ScheduleRepetitionRow />} type={"recurrence"} />
      </div>
    </div>
  );
};

export default ScheduleCrudView;
