import dayjs from "dayjs";
import { z } from "zod";

/**
 * 미팅 생성 폼 스키마
 * - 검증 트리거
 * ```
 * const result =meetingCreationSchema.safeParse(data);
 * ```
 * - 성공 여부
 * ```
 * result.success; // true if valid, false if invalid
 * ```
 * - 에러 접근
 * ```
 * // success가 false여야함
 * result.error; // zod.ZodError
 * result.error.issues; // zod.ZodIssue[]
 * result.error.issues.map((issue) => issue.message); // string[]
 * ```
 * - 특정 필드에 대해서만 검증 (둘중 아무거나)
 * ```
 * meetingCreationSchema.shape.title.parse(data)
 * meetingCreationSchema.pick({
 *  필드명: boolean
 * }).parse(data)
 * ```
 */
const meetingCreationSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "제목을 입력해주세요" })
      .max(100, { message: "제목은 100자 이하로 입력해주세요" }),
    description: z
      .string()
      .max(200, { message: "설명은 200자 이하로 입력해주세요" })
      .optional(),
    /**
     * YYYY-MM-DD[]
     */
    candidateDates: z
      .array(z.string())
      .min(1, { message: "후보 날짜를 선택해주세요" })
      .max(10, { message: "후보 날짜는 10개 이하로 선택해주세요" }),
    /**
     * H(H):MM
     */
    durationMinutes: z.string(),
    /**
     * YYYY-MM-DDTH(H):MM <- TODO: H하나면 native Date객체 기준 Invalid Date임
     */
    deadline: z.string(),
    projectId: z.string().optional(),
  })
  .superRefine((value, context) => {
    // 후보날짜와 데드라인 관계 검증
    if (
      value.candidateDates.some((date) =>
        dayjs(date).isAfter(dayjs(value.deadline))
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "후보날짜는 데드라인 이후여야 합니다.",
        path: ["candidateDates", "deadline"],
      });
    }
  });

/**
 * 미팅 생성 폼 스키마 타입
 * - 만약 각 필드에 대해 접근 원한다면
 * ```
 * type Deadline = MeetingCreationSchema["deadline"];
 * ```
 */
export type MeetingCreationSchema = z.infer<typeof meetingCreationSchema>;

export { meetingCreationSchema };
