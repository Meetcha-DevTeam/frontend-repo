import React from "react";
import { useEffect, useRef } from "react";
import trashCan from "@assets/trashCan.svg";
import { createPortal } from "react-dom";

import styles from "./DropDown.module.scss";

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown:React.FC<props> = ({open,setOpen}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div ref={menuRef} className={styles.dropdownCtn}>
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
              <img src={trashCan} alt="trashCan"></img>
              <p>삭제하기</p>
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DropDown;
