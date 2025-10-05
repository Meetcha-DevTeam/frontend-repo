import { scheduleCreationSchema, type ScheduleCreationSchema } from "../schemas/scheduleCreationSchema";
import { createContext, useContext, useState } from "react";

export type SetError = (field: keyof ScheduleCreationSchema, reason: string) => void;

export interface FormBase<Schema> {
  /**
   * 폼 필드 하나의 값을 세팅
   */
  setFormValue: <K extends keyof Schema>(field: K, value: Schema[K]) => void;
  /**
   * 전체 폼 값
   */
  values: Schema;
  /**
   * 필드 하나의 폼 데이터 가져옴
   */
  getFormValue: <K extends keyof Schema>(field: K) => Schema[K];
  /**
   * 필드별 폼 에러와 에러 메시지, 서버 에러는 관여안함, 일단 필드당 에러는 하나만 설정
   */
  errors?: Partial<Record<keyof Schema, string>>;
  /**
   * 에러 트리거
   */
  setError: SetError;
  /**
   * 에러뜨면 폼 제출 안함
   */
  onSubmit: (callback: () => void) => void;
  /**
   * 폼 데이터랑 에러 다 없앰
   */
  clearForm: () => void;
}

export interface FormSetter<Schema> {
  /**
   * 기본값, 일단 지금은 필요없음
   */
  defaultValue?: Schema;
}

export const useScheduleCreateForm = (
  setter?: FormSetter<ScheduleCreationSchema>
): FormBase<ScheduleCreationSchema> => {
  const [formData, setFormData] = useState<ScheduleCreationSchema>(
    setter?.defaultValue ?? {
      title: "",
      startAt: "",
      endAt: "",
      recurrence: "NONE",
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof ScheduleCreationSchema, string>> | null>(null);

  const formDataSetter = (
    key: keyof ScheduleCreationSchema,
    value: ScheduleCreationSchema[keyof ScheduleCreationSchema]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFormValue = <K extends keyof ScheduleCreationSchema>(key: K) => {
    return formData[key];
  };

  const setError = (key: keyof ScheduleCreationSchema, reason: string) => {
    if (errors) {
      setErrors((prev) => ({
        ...prev,
        [key]: reason,
      }));
    } else {
      setErrors({
        [key]: reason,
      });
    }
  };

  const clearForm = () => {
    setFormData(setter?.defaultValue);
    setErrors(null);
  };

  return {
    values: formData,
    setFormValue: formDataSetter,
    setError,
    errors,
    onSubmit: (callback) => {
      const result = scheduleCreationSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          result.error.issues.reduce((acc, issue) => {
            acc[issue.path[0] as keyof ScheduleCreationSchema] = issue.message;
            return acc;
          }, {} as Partial<Record<keyof ScheduleCreationSchema, string>>)
        );
        return;
      }
      callback();
    },
    getFormValue,
    clearForm,
  };
};

export const ScheduleCreateFormContext = createContext<FormBase<ScheduleCreationSchema>>(null);

export const useScheduleCreateFormContext = () => {
  return useContext(ScheduleCreateFormContext);
};
