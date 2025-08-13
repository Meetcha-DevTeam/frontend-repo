export interface Meeting {
  meetingId: string;
  title: string;
  description: string | null;
  durationMinutes: number | null;
  deadline: string | null;
  createdAt: string;
  meetingStatus: "매칭 중" | "진행 중" | "완료" | "매칭 실패"; // ENUM 타입 지정
  confirmedTime: string | null;
}

export interface MeetingDetail {
  meetingId: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  durationMinutes: number;
  participants: Participant[];
  finalSchedule: FinalSchedule;
}

export interface Participant {
  participantId: string;
  nickname: string;
  profileImageUrl: string;
}

interface FinalSchedule {
  type: "success" | "fail";
  startAt: string;
  endAt: string;
}

export interface AlternativeSchedule {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  availableNum: number;
  includedUserNames: string[];
  excludedUserNames: string[];
  adjustedDurationMinutes: number;
  checked: boolean;
}

export interface AlternativeObj {
  alternativeTimes: AlternativeSchedule[];
}
