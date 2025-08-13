import React, { useEffect, useMemo, useRef } from "react";
import Memoir_meeting_ctn from "./Memoir_meeting_ctn";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import { useAPIs2 } from "@/apis/useAPIs2";
import { useLocation, useNavigate } from "react-router-dom";

import { getProjectTheme } from "@/utils/theme";

const Memoir_meeting_All = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const didInit = useRef(false);
  const didRefetch = useRef(false);

  const userId = 3;
  const {
    response: meetingLists,
    loading: meetingLoading,
    error: meetingError,
    fire: execMeetingAll,
  } = useAPIs2(`/meeting-lists/need-reflection`, "GET", undefined, true, false);

  const {
    response: memoirLists,
    loading: memoirLoading,
    error: memoirError,
    fire: execMemoirAll,
  } = useAPIs2(`/meeting/reflections`, "GET", undefined, true, false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    execMeetingAll();
    execMemoirAll();
  }, [execMeetingAll, execMemoirAll]);
  
  useEffect(() => {
    const s: any = location.state;
    if (!s?.refetchMemoirs || didRefetch.current) return;

    didRefetch.current = true;
    execMeetingAll();
    execMemoirAll();
    navigate(location.pathname, { replace: true, state: undefined });
  }, [
    location.state,
    location.pathname,
    execMeetingAll,
    execMemoirAll,
    navigate,
  ]);

  //여기서 meetingLists중 meeting_status가 "종료인것만 남긴다."

  const memoir = Array.isArray(memoirLists?.data) ? memoirLists.data : [];

  const memoirWithTheme = useMemo(
    () =>
      memoir.map((m: any) => ({
        ...m,
        // memoir 항목에 projectId가 없을 수도 있으니 fallback 더 넓게
        theme: getProjectTheme(
          m?.projectId ??
            m?.projectName ??
            m?.meetingId ??
            m?.title ??
            m?.confirmedTime ??
            m?.completedWork ??
            m?.plannedWork ??
            "default"
        ),
      })),
    [memoir]
  );

  if (meetingLoading || memoirLoading) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>⌛ 로딩 중…</p>
      </>
    );
  }

  /* ===== 2) 에러 화면 ===== */
  if (meetingError || memoirError) {
    return (
      <>
        <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
          ❌ 에러 발생: {meetingError || memoirError}
        </p>
      </>
    );
  }
  console.log(meetingLists);
  console.log(memoirLists);

  return (
    <>
      <Memoir_meeting_ctn
        /* meetingLists가 배열인지 한 번 더 방어 */
        meetingLists={Array.isArray(meetingLists.data) ? meetingLists.data : []}
        memoirLists={memoirWithTheme}
      />
    </>
  );
};

export default Memoir_meeting_All;
