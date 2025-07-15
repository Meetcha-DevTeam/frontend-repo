export type MeetingInfoType={
    id:number;
    title:string;
    datetime:string;
};

export const pendingMeetings:MeetingInfoType[]=[
    {
        id:1,
        title:"전공 기초 프로젝트",
        datetime:"2025-05-21 3:00:00",
    },
    {
        id:2,
        title:"코딩 스터디 회의",
        datetime:"2025-05-21 4:00:00",
    },
];
