import React, { useState, useCallback } from "react";
import { Layout, Row, Col } from "antd";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";
import SkillsContainer from "./SkillsContainer/SkillsContainer";
import GateOfFatesContainer from "./GateOfFatesContainer/GateOfFatesContainer";
import BuildDescriptionContainer from "./BuildDescriptionContainer/BuildDescriptionContainer";
import { buildDescription } from "../../../Constants/constants";

import "./style.css";

const { Content } = Layout;

const CreateBuildTitle = props => {
  return (
    <Row>
      <Col className="buildTitleCol" span={24} offset={0}>
        <div className="createBuildTitle">CREATE A BUILD</div>
      </Col>
    </Row>
  );
};

const CreateBuild = () => {
  /* States of the data being sent to the database */
  const [buildTitle, setBuildTitle] = useState("");
  const [buildVideo, setBuildVideo] = useState("");
  const [combatType, setCombatType] = useState("Melee");
  const [playstyle, setPlaystyle] = useState("Solo");
  const [inputText, setInputText] = useState(buildDescription.default);
  const [activeNodes, setNodes] = useState(["root"]);

  const setDesc = useCallback(
    data => {
      setInputText(data);
    },
    [setInputText]
  );
  const setVid = useCallback(
    data => {
      setBuildVideo(data);
    },
    [setBuildVideo]
  );
  const setComb = useCallback(
    data => {
      setCombatType(data);
    },
    [setCombatType]
  );
  const setPs = useCallback(
    data => {
      setPlaystyle(data);
    },
    [setPlaystyle]
  );
  const setTitle = useCallback(
    data => {
      setBuildTitle(data);
    },
    [setBuildTitle]
  );

  const setActiveNodes = useCallback(
    data => {
      setNodes(data);
    },
    [setNodes]
  );

  const buildDescriptionProps = {
    buildTitle,
    setTitle,
    buildVideo,
    setVid,
    combatType,
    setComb,
    playstyle,
    setPs,
    inputText,
    setDesc
  };

  return (
    <Layout className="createBuildPageLayout">
      <Content className="statsAndSkills">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}>
            <CreateBuildTitle />
            <StatPointsContainer />
            <SkillsContainer />
            <GateOfFatesContainer
              setActiveNodes={setActiveNodes}
              activeNodes={activeNodes}
            />
            <BuildDescriptionContainer {...buildDescriptionProps} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateBuild;
