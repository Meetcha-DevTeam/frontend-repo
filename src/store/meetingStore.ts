import { fetchMeetingList } from "@/apis/meeting/meetingfetcher";
import type { MeetingDataType } from "@/types/meeting-data-type";
import { create } from "zustand";

interface MeetingState {
  meetingList: MeetingDataType[];
  fetchMeetings: () => void;
}

export const useMeetingStore = create<MeetingState>()((set) => ({
  meetingList: [],
  fetchMeetings: async () => {
    const data = await fetchMeetingList();
    console.log(data);
    set({ meetingList: data });
  },
}));
