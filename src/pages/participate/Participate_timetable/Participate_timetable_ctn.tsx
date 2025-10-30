import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Timetable from "./Timetable";
import CountDown from "@/components/CountDown/CountDown";

import LeftChevron from "@/assets/LeftChevron.svg";

import {
  getUserMeetingData,
  getPreviousAvailTime,
  getUserScheduleData,
  submitAvailability,
  updateAvailability,
} from "@/apis/participate/participateAPI";
import type {
  ParticipateResponse,
  UserScheduleData,
  MeetingInfoData,
} from "@/apis/participate/participateTypes";

import "./Participate_timetabe.scss";

import type {
  SubmitAvailabilityBody,
  ParticipateObject,
} from "@/apis/participate/participateTypes";

import { snap30, toDate } from "@/utils/dateUtil";
import { parseISO, isAfter, addMinutes, format, getTime } from "date-fns";

const Participate_timetable_ctn = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const meetingId = params.get("meetingId") || "";
  const pageNum = params.get("pagenum");

  const [nickname, setNickname] = useState("");

  const [meetingData, setMeetingData] = useState<MeetingInfoData>(null); //참가페이지에 해당하는 미팅 데이터
  const [scheduleData, setScheduleData] = useState<UserScheduleData[]>([]); //사용자의 캘린더 데이터
  const [previousAvailTime, setPreviousAvailTime] =
    useState<ParticipateResponse>(null); //이전에 선택했던 시간 데이터 대안 시간 투표를 위한 데이터

  //이 친구는 선택된 시간 데이터들(startAt,endAt)데이터들의 배열임
  const [selectedTimes, setSelectedTimes] = useState<ParticipateObject[]>([]); //  수정됨: 선택된 시간 저장용 state

  const backtoLink = () => {
    navigate("/schedule");
  };

  const finalPostData: SubmitAvailabilityBody = useMemo(() => {
    const times = selectedTimes
      .map((t: ParticipateObject) => {
        const sRaw = t.startAt;
        const eRaw = t.endAt;


        let s = snap30(toDate(sRaw));
        let e = snap30(toDate(eRaw));

        if (!isAfter(e, s)) {
          e = addMinutes(s, 30); // 0길이/역전 방지

        }

        // 서버 스펙: 'YYYY-MM-DDTHH:mm:ss' (로컬 기준)
        return {
          startAt: format(s, "yyyy-MM-dd'T'HH:mm:ss"),
          endAt: format(e, "yyyy-MM-dd'T'HH:mm:ss"),
        };
      })
      .sort(
        (a, b) => getTime(parseISO(a.startAt)) - getTime(parseISO(b.startAt))
      );

    const nick = nickname.trim();
    return {
      nickname: nick.length > 0 ? nick : undefined,
      selectedTimes: times,
    };
  }, [selectedTimes, nickname]);

  useEffect(() => {
    if (!meetingId) return;

    const fetchfunc = async () => {
      try {
        const userMeetingData = await getUserMeetingData(meetingId);
        setMeetingData(userMeetingData);

        if (pageNum === "3") {
          const previousTime = await getPreviousAvailTime(meetingId);
          setPreviousAvailTime(previousTime);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchfunc();
  }, [meetingId, pageNum]); // ← pageNum도 의존성에 추가

  useEffect(() => {
    if (!meetingData) return;
    //순서를 정한거임.. 미팅데이터를 먼저 불러와야함(candidate때문)

    const getSchedule = async () => {
      try {
        const sortedDates = [...meetingData.candidateDates].sort(); //해당 구간 사이의 데이터만 불러오기위함
        const first = sortedDates[0];
        const last = sortedDates[sortedDates.length - 1];
        const scheduleData = await getUserScheduleData(first, last);
        setScheduleData(scheduleData);
      } catch (e) {
        console.error(e);
      }
    };
    getSchedule();
  }, [meetingData]);

  const handleSetNickname = (e) => {
    setNickname(e.target.value);
  }; //나중에 backend에 post로 보낼예정..

  const handleSubmit = async () => {
    //오류처리
    if (!meetingId) {
      alert("유효하지 않은 미팅입니다.");
      return;
    }
    if (finalPostData.selectedTimes.length === 0) {
      alert("참여 가능 시간을 최소 1개 이상 선택해주세요.");
      return;
    }

    const isModify = pageNum === "3"; //미팅 참여페이지 수정ver

    try {
      const result = isModify
        ? await updateAvailability(meetingId, {
            selectedTimes: finalPostData.selectedTimes,
          })
        : await submitAvailability(meetingId, finalPostData); // SubmitAvailabilityBody
      console.log(result);
      isModify
        ? navigate("/meeting/detail", {
            state: {
              meetingId: meetingId,
            },
          })
        : navigate("/schedule");
    } catch (e) {
      console.error(e);
    }
  };

  if (!meetingData) {
    return (
      <>
        <div className="top_ctn">
          <img src={LeftChevron} alt="LeftChevron" onClick={backtoLink} />
          <p>미팅 참여</p>
        </div>
        <div className="participate_ctn">
          <div className="text_container1">
            <div className="meeting_info_ctn">
              <div className="dividend" />
              <div className="meeting_info">
                <p>불러오는 중…</p>
                <p />
              </div>
            </div>
            <input
              type="text"
              value={nickname}
              onChange={handleSetNickname}
              placeholder="닉네임"
            />
          </div>
        </div>
      </>
    );
  }

  // meetingData가 확보된 뒤에만 본문 렌더
  return (
    <>
      <div className="top_ctn">
        <img src={LeftChevron} alt="LeftChevron" onClick={backtoLink} />
        <p>미팅 참가</p>
      </div>

      <div className="participate_ctn">
        <CountDown
          label={"참가 마감 시간"}
          finishTime={parseISO(meetingData.deadline)}
        />
        <div className="text_container1">
          <div className="meeting_info_ctn">
            <div className="dividend"></div>
            <div className="meeting_info">
              <p>{meetingData.title}</p>
              <p>{meetingData.description}</p>
            </div>
          </div>

          <input
            type="text"
            value={nickname}
            onChange={handleSetNickname}
            placeholder="닉네임"
          />
        </div>

        <div className="timetable">
          <p>
            참여 가능 시간<span>*</span>
          </p>
          <div
            className="timetable_ctn"
            tabIndex={-1}
            onPointerDownCapture={() => {
              const a = document.activeElement as HTMLElement | null;
              if (
                a &&
                (a.tagName === "INPUT" ||
                  a.tagName === "TEXTAREA" ||
                  a.isContentEditable)
              )
                a.blur();
            }}
          >
            <Timetable
              candidateDates={

                Array.isArray(meetingData?.candidateDates)
                  ? meetingData.candidateDates
                  : []
              } //이거는 내가 선택하는 후보날짜
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
              previousAvailTime={
                Array.isArray(previousAvailTime) ? previousAvailTime : []
              }
              scheduleData={scheduleData /* []로 보장됨 */}
            />
          </div>
        </div>
      </div>

      <div className="button_ctn">
        <button className="button" onClick={handleSubmit}>
          <div className="button_p_ctn">
            <p>참여하기</p>
          </div>
        </button>
      </div>
    </>
  );
};
export default Participate_timetable_ctn;
