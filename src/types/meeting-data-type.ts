export interface MeetingDataType{
    meeting_id:string;
    title:string;
    description: string|null;
    duration_minutes:number|null;
    deadline:string|null;
    created_at:string;
    meeting_status:"생성중"|"진행중"|"종료"|"실패";
    confirmed_time: string|null;
    meeting_code:string;
    created_by:string;
    project_id:string;

}

export interface AlternativeScheduleDateType{
    date:string;
    startTime:string;
    endTime: string;
    availableNum: number;
    totalNum:number;
    failMembers:string[];
    adjustedTime: string;
}