import type { MeetingDataType } from "@/types/meeting-data-type";
import {create} from "zustand";
//미팅 목록들을 전역 상태로 관리하겠다....

export const API_BASE=import.meta.env.VITE_API_BASE_URL;

interface MeetingState{
    meetingList:MeetingDataType[];
    fetchMeetings:(id:number)=>Promise<void>; 
}

export const useMeetingStore=create<MeetingState>()
((set)=>({
    meetingList: [],
    fetchMeetings: async(id)=>{
        const res=await fetch(`${API_BASE}/meeting_list?
            id=${id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
        });
        const data=await res.json();
        set({meetingList:data.data});
    },
}));
