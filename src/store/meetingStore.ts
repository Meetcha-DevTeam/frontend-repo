import type { MeetingDataType } from "@/types/meeting-data-type";
<<<<<<< HEAD
import { create } from "zustand";

export const API_BASE = import.meta.env.VITE_API_BASE_URL;
const access_token = sessionStorage.getItem("access-token");

interface MeetingState {
  meetingList: MeetingDataType[];
  fetchMeetings: (id: number) => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  meetingList: [],
  fetchMeetings: async (id) => {
    const res = await fetch(`/meeting-lists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    // console.log(data.data);
    set({ meetingList: data.data });
  },
=======
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
>>>>>>> e4709493e5e1d8f5d255b41b67c4bcae8e6854d1
}));
