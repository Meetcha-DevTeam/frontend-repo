import React, { useState } from "react";

import Memoir_write_intro from "./Memoir_write_intro";
import Memoir_write_main from "./Memoir_write_main";
import Memoir_bottom_fixed from "../Memoir_common/Memoir_bottom_fixed";

import "./Memoir_write.scss";
import { useAPIs } from "@/apis/useAPIs";

const Memoir_write_ctn = () => {
  const [contribution, setContribution] = useState("");
  const [role, setRole] = useState("");
  const [feeling, setFeeling] = useState("");

  const { response: projectsAll, loading, error } = useAPIs("/user/projects");
  console.log(projectsAll);
  if (loading) return <p>⌛ 프로젝트 목록 불러오는 중...</p>;
  if (error) return <p>❌ 프로젝트 목록 불러오기 실패: {error}</p>;
  return (
    <div className="Memoir_write_ctn">
      <div className="Memoir_content_ctn">
        <Memoir_write_intro />
        <Memoir_write_main
          projectsAll={projectsAll}
          contribution={contribution}
          setContribution={setContribution}
          role={role}
          setRole={setRole}
          feeling={feeling}
          setFeeling={setFeeling}
        />
      </div>
      <Memoir_bottom_fixed
        isReadyToSubmit={!!(contribution && role && feeling)}
      />
    </div>
  );
};

export default Memoir_write_ctn;
