import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Layout, Row, Col } from "antd";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";
import SkillsContainer from "./SkillsContainer/SkillsContainer";
import GateOfFatesContainer from "./GateOfFatesContainer/GateOfFatesContainer";
import BuildDescriptionContainer from "./BuildDescriptionContainer/BuildDescriptionContainer";
import { buildDescription } from "../../../Constants/constants";

import "./style.css";

const { Content } = Layout;

const buildsRoute = "/api/builds/build/create";

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
  const [statPoints, setStatPoints] = useState(890);
  const [stats, setStats] = useState({
    ferocity: 0,
    toughness: 0,
    agility: 0,
    wisdom: 0
  });
  const [slotData, setSlotData] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null,
    slot5: null,
    slot6: null
  });
  const [buildTitle, setBuildTitle] = useState("");
  const [buildVideo, setBuildVideo] = useState("");
  const [combatType, setCombatType] = useState("Melee");
  const [playstyle, setPlaystyle] = useState("Solo");
  const [inputText, setInputText] = useState(buildDescription.default);
  const [activeNodes, setNodes] = useState(["root"]);
  const [rotations, setRotations] = useState({
    inner: 0,
    outer: 0,
    middle: 0
  });

  const history = useHistory();
  /* ALL THE DATA CONTROLLERS EXIST HERE */
  const setStatPointsCB = useCallback(
    value => {
      setStatPoints(value);
    },
    [setStatPoints]
  );

  const setStatsCB = useCallback(
    (statName, value) => {
      setStats({
        ...stats,
        [statName]: value
      });
    },
    [setStats, stats]
  );

  const setSlotDataCB = useCallback(
    data => {
      setSlotData(data);
    },
    [setSlotData]
  );

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

  const setRotationsCB = useCallback(
    (scope, rotation) => {
      if (scope === "all") {
        setRotations({
          inner: rotation,
          outer: rotation,
          middle: rotation
        });
      } else {
        setRotations({
          ...rotations,
          [scope]: rotation
        });
      }
    },
    [rotations, setRotations]
  );
  /* ALL THE DATA CONTROLLERS END HERE */

  const submitData = useCallback(async () => {
    const buildPayload = {
      buildTitle,
      buildDescription: inputText,
      buildVideo,
      playstyle,
      combatType,
      activeNodes,
      rotations,
      slotData,
      stats,
      statPoints
    };
    try {
      const postRes = await axios.post(buildsRoute, buildPayload);
      if (postRes.data.status === "success") {
        history.push(`/builds/builds/${postRes.data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const statPointsProps = {
    setStatsCB,
    setStatPointsCB,
    stats,
    statPoints
  };

  const skillContainerProps = {
    slotData,
    setSlotDataCB
  };

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
    setDesc,
    submitData
  };

  const gateOfFatesProps = {
    setActiveNodes,
    activeNodes,
    rotations,
    setRotationsCB
  };

  return (
    <Layout className="createBuildPageLayout">
      <Content className="statsAndSkills">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}>
            <CreateBuildTitle />
            <StatPointsContainer {...statPointsProps} />
            <SkillsContainer {...skillContainerProps} />
            <GateOfFatesContainer {...gateOfFatesProps} />
            <BuildDescriptionContainer {...buildDescriptionProps} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateBuild;
