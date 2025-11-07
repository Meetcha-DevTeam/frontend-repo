import { useEffect, useState, useRef } from "react";
import styles from "./MeetingDetailPage.module.scss";
import Header from "@/components/Header";
import MeetingDetailView from "./MeetingDetailView";
import Button from "@/components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import type { MeetingDetail } from "@/apis/meeting/meetingTypes";
import { fetchMeetingDetail } from "@/apis/meeting/meetingAPI";
import { toast } from "react-toastify";
import { copyToClipboard } from "@/utils/copyToClipBoard";
import { isBefore } from "date-fns";
import trashCan from "@assets/trashCan.svg";

import { createPortal } from "react-dom";
interface Anchor {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const MeetingDetailPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRectRef = useRef<Anchor | null>(null);

  const location = useLocation();
  const { meetingId } = location.state;
  const navigate = useNavigate();
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(null);

  const handleToggle = (next: boolean, rect?: DOMRect) => {
    setOpen(next);
    if (rect) {
      const a = { top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom };
      setAnchor(a);
      buttonRectRef.current = a;
    }
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;

      // 메뉴 영역 밖?
      const menuOutside = menuRef.current && !menuRef.current.contains(target);

      // 트리거(햄버거) 영역 밖? — rect로 판별(Portal이라 contains 사용 못함)
      const r = buttonRectRef.current;
      let btnOutside = true;
      if (r && e.clientX != null && e.clientY != null) {
        const x = e.clientX,
          y = e.clientY;
        btnOutside = !(x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
      }

      if (menuOutside && btnOutside) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const onClickShare = async () => {
    const ok = await copyToClipboard(meetingDetail.meetingCode);

    if (ok) {
      toast.success("링크를 복사했습니다", { containerId: "timerClose" });
    } else {
      toast.error("복사에 실패했어요. 직접 복사해주세요.", { containerId: "timerClose" });
    }
  };

  const onClickAlternative = () => {
    navigate(`/alternative/${meetingId}`);
  };

  const onClickEditParticipate = () => {
    navigate(`/timetable?meetingId=${meetingDetail?.meetingId}&pagenum=3`);
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchMeetingDetail(meetingId);
      setMeetingDetail(data);
    };
    load();
  }, []);

  return (
    <div className={styles.meetingDetailPage}>
      <Header
        prevButton={true}
        hamburger={meetingDetail?.meetingStatus === "MATCHING"}
        open={open}
        onToggle={handleToggle}
      />
      <div className={styles.meetingDetailPage__contents}>
        <div className={styles.meetingDetailPage__contents__view}>
          {meetingDetail && <MeetingDetailView data={meetingDetail} />}
        </div>
        <div className={styles.meetingDetailPage__contents__button}>
          {meetingDetail?.meetingStatus === "MATCHING" &&
            isBefore(Date.now(), meetingDetail?.deadline) && (
              <>
                <Button
                  label={"링크 공유하기"}
                  className={styles.shareButton}
                  clickHandler={onClickShare}
                />
                <Button
                  label={"나의 미팅 시간 수정하기"}
                  className={styles.editButton}
                  clickHandler={onClickEditParticipate}
                />
              </>
            )}
          {meetingDetail?.meetingStatus === "MATCHING" &&
            isBefore(meetingDetail?.deadline, Date.now()) && (
              <Button
                label={"대안시간 투표하기"}
                className={styles.editButton}
                clickHandler={onClickAlternative}
              />
            )}
        </div>
      </div>
      {/* 🔹 메뉴는 body 밑에 Portal로 렌더링 */}
      {open &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.dropdown} // 아래 SCSS 참고
            role="menu"
          >
            <button
              className={styles.dropdown__deleteBtn}
              onClick={() => {
                setOpen(false);
                // 삭제 로직 실행
              }}
            >
              <img src={trashCan} alt="trashCah"></img>
              <p>삭제하기</p>
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default MeetingDetailPage;
