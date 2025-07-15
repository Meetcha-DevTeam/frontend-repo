import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Memoir_write.scss";

const Memoir_write_main = () => {
  const location = useLocation();
  const { title, meetingDate } = location.state || {};

  const [contribution, setContribution] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [feeling, setFeeling] = useState<string>("");
  const [done, setDone] = useState<string>("");
  const [todo, setTodo] = useState<string>("");

  return (
    <div className="main_ctn">
      <div className="to_write_meeting">
        <div className="write_title_ctn">
          <p className="write_title">작성할 회의</p>
          <div className="write_content">
            <div className="empty_space"></div>
            <div className="p_container">
              <p>{title}</p>
              <p>{meetingDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contribution_role">
        <div className="ctn_common contribution">
          <p className="write_title">
            기여도<span className="star">*</span>
          </p>
          <input
            type="text"
            className="in-common contribution_input"
            value={contribution}
            placeholder="0%"
            onChange={(e) => setContribution(e.target.value)}
          />
        </div>
        <div className="ctn_common role">
          <p className="write_title">
            맡은 역할<span className="star">*</span>
          </p>
          <input
            type="text"
            className="in-common"
            value={role}
            placeholder="맡은 역할: 백수"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>
      <div className="ctn_common what_you_feel">
        <p className="write_title">
          느낀 점<span className="star">*</span>
        </p>
        <textarea
          className="in-common feel_ctn"
          value={feeling}
          placeholder="미팅에서 만족한 부분, 문제점 그리고 시도해볼 것이 있나욥?"
          onChange={(e) => setFeeling(e.target.value)}
        ></textarea>
      </div>
      <div className="ctn_common to_write_meeting">
        <p className="write_title">한 일</p>
        <input
          type="text"
          className="in-common"
          value={done}
          placeholder="이번 시간에 한 일을 작성해 주세욧"
          onChange={(e) => setDone(e.target.value)}
        />
      </div>
      <div className="ctn_common to_write_meeting">
        <p className="write_title">할 일</p>
        <input
          type="text"
          className="in-common"
          value={todo}
          placeholder="다음 시간까지 할 일을 작성해주세욯"
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <div className="ctn_common to_write_meeting">
        <p className="write_title">프로젝트</p>
      </div>
    </div>
  );
};

export default Memoir_write_main;
