import { useEffect, useState } from "react";
import styles from "./MeetingAvailabilities.module.scss";
import { fetchMeetingAvailabilities } from "@/apis/meeting/meetingAPI";
import type { MeetingAvailabilities } from "@/apis/meeting/meetingTypes";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
export const MeetingAvailabilitiesContainer = ({ meetingId }: { meetingId: string }) => {
  const [availabilities, setAvailabilities] = useState<MeetingAvailabilities | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchMeetingAvailabilities(meetingId)
      .then((res) => {
        if (res.code === 200) {
          setAvailabilities(res.data);
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [meetingId]);
  // TODO: 각 케이스 디자인 시안 요구
  if (loading) return null;
  if (error) return null;
  if (!availabilities) return null;
  if (availabilities.count === 0) return null;

  return <MeetingAvailabilitiesContent availabilities={availabilities} />;
};

const MeetingAvailabilitiesContent = ({
  availabilities,
}: {
  availabilities: MeetingAvailabilities;
}) => {
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const isUpperBound = selectedCount >= availabilities.count;
  const isLowerBound = selectedCount <= 1;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <p className={styles.title__main}>참가 내역</p>
          <p className={styles.title__sub}>참여 가능 인원을 확인해 보세요</p>
        </div>
        <div className={styles.title__inputContainer}>
          <input
            type="number"
            name="count"
            className={styles.title__inputContainer__input}
            min={1}
            max={availabilities.count}
            value={selectedCount}
            onChange={(e) => {
              const numValue = parseInt(e.target.value);
              if (numValue > availabilities.count) {
                return;
              }
              setSelectedCount(numValue);
            }}
          />
          <div className={styles.title__inputContainer__iconContainer}>
            <button
              name="up"
              disabled={isUpperBound}
              className={styles.title__inputContainer__iconContainer__iconButton}
              onClick={() => {
                if (!isUpperBound) {
                  setSelectedCount(selectedCount + 1);
                }
              }}
            >
              <BiChevronUp className={styles.title__inputContainer__iconContainer__icon} />
            </button>
            <button
              name="down"
              disabled={isLowerBound}
              className={styles.title__inputContainer__iconContainer__iconButton}
              onClick={() => {
                if (!isLowerBound) {
                  setSelectedCount(selectedCount - 1);
                }
              }}
            >
              <BiChevronDown className={styles.title__inputContainer__iconContainer__icon} />
            </button>
          </div>
          <p>/ {availabilities.count}</p>
        </div>
      </div>
    </div>
  );
};
