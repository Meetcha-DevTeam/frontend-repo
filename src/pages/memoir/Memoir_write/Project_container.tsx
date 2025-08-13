import React, { useState, useEffect } from "react";

import "./Memoir_write.scss";

import LowChevron from "@/assets/LowChevron.svg";

import Plus from "@/assets/plus.svg";

import { useAPIs2 } from "@/apis/useAPIs2";

import { getProjectTheme } from "@/utils/theme";

const Project_container = ({
  projectsAll,
  projectId,
  setProjectId,
  chosenProjectBgColor,
  chosenProjectTextColor,
  setChosenProjectBgColor,
  setChosenProjectTextColor,
  meeting,
  chosenProject,
  setChosenProject,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<string>("");

  const [projectList, setProjectList] = useState(projectsAll || []);
  useEffect(() => {
    setProjectList(projectsAll || []);
  }, [projectsAll]);
  //여기서 새로 생성된 프로젝트는 id또한 가져야함
  //id는 랜덤의 값으로 하나 부여 data()함수 사용

  const newProjectName = {
    name: newProject,
  };

  const {
    response: postNewMeeting,
    loading,
    error,
    fire,
  } = useAPIs2(`/projects/create`, "POST", newProjectName, true, true);

  const updateProjectsAll = () => {
    fire();
    console.log(postNewMeeting);
    const trimmedName = newProject.trim();
    if (!trimmedName) return;

    if (projectList.some((p) => p.projectName === trimmedName)) {
      alert("같은 이름의 프로젝트가 이미 존재합니다.");
      return;
    }

    setProjectList([
      ...projectList,
      {
        projectId: postNewMeeting.data.projectId,
        projectName: postNewMeeting.data.name,
      },
    ]);
    setNewProject("");
  };

  const toggleBannerBox = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!projectId) {
      setChosenProject("");
      setChosenProjectBgColor(undefined as any);
      setChosenProjectTextColor(undefined as any);
      return;
    }
    const p = projectList.find((x) => x.projectId === projectId);
    if (p) {
      const t = getProjectTheme(p.projectId);
      setChosenProject(p.projectName);
      setChosenProjectBgColor(t.bg);
      setChosenProjectTextColor(t.text);
    }
  }, [
    projectId,
    projectList,
    setChosenProject,
    setChosenProjectBgColor,
    setChosenProjectTextColor,
  ]);

  return (
    <div className="ctn_in_common to_write_meeting">
      <p className="write_title">프로젝트</p>
      <div className="project_banner_ctn">
        <div className="in-common banner" onClick={toggleBannerBox}>
          <div
            style={{
              background: chosenProjectBgColor,
            }}
            className="banner_name_ctn"
          >
            <p
              className="banner_name"
              style={{
                color: chosenProjectTextColor,
              }}
            >
              {chosenProject || "선택된 프로젝트 없음"}
            </p>
          </div>
          <img
            src={LowChevron}
            alt="LowChevron"
            className={`chevron_icon ${isOpen ? "rotate" : ""}`}
          ></img>
        </div>
        <div className={`in-common banner_box ${isOpen ? "open" : "closed"}`}>
          <div className="banner_box_input_ctn">
            <input
              type="text"
              className="project_banner_input"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            ></input>
            <img src={Plus} alt="plus" onClick={updateProjectsAll}></img>
          </div>
          {projectList.map((project, index) => {
            const t = getProjectTheme(project.projectId);
            return (
              <div key={project.projectId} className="checkbox_ctn">
                <input
                  className="study_checkbox"
                  type="radio"
                  name="project"
                  checked={projectId == project.projectId}
                  onChange={() => setProjectId(project.projectId)}
                ></input>
                <div
                  className="banner_name_ctn"
                  style={{ backgroundColor: t.bg }}
                >
                  <p className="banner_name" style={{ color: t.text }}>
                    {project.projectName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project_container;
