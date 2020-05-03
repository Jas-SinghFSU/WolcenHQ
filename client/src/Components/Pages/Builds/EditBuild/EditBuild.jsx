import React, { useState, useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserProvider from "../../../../Contexts/UserProvider";
import axios from "axios";
import { Layout, Row, Col } from "antd";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";
import SkillsContainer from "./SkillsContainer/SkillsContainer";
import GateOfFatesContainer from "./GateOfFatesContainer/GateOfFatesContainer";
import BuildDescriptionContainer from "./BuildDescriptionContainer/BuildDescriptionContainer";
import { buildDescription } from "../../../Constants/constants";

import "./style.css";

const { Content } = Layout;

const submitRoute = "/api/builds/edit";
const getRoute = "/api/builds/build";

const EditBuildTitle = (props) => {
  return (
    <Row>
      <Col className="buildTitleCol" span={24} offset={0}>
        <div className="createBuildTitle titleOrange">EDIT BUILD</div>
      </Col>
    </Row>
  );
};

const EditBuild = (props) => {
  const history = useHistory();
  const buildID = props.match.params.id;
  const userData = useContext(UserProvider.context);

  /* States of the data being sent to/from the database */
  const [statPoints, setStatPoints] = useState(890);
  const [stats, setStats] = useState({
    ferocity: 0,
    toughness: 0,
    agility: 0,
    wisdom: 0,
  });
  const [slotData, setSlotData] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null,
    slot5: null,
    slot6: null,
  });
  const [buildTitle, setBuildTitle] = useState("");
  const [buildVideo, setBuildVideo] = useState("");
  const [combatType, setCombatType] = useState("Melee");
  const [playstyle, setPlaystyle] = useState("Solo");
  const [inputText, setInputText] = useState("");
  const [activeNodes, setNodes] = useState(["root"]);
  const [rotations, setRotations] = useState({
    inner: 0,
    outer: 0,
    middle: 0,
  });

  const fetchBuildData = async () => {
    try {
      const buildRes = await axios.get(`${getRoute}/${buildID}`);
      const buildData = buildRes.data;
      console.log(buildData);
      if (buildData.author !== userData.user._id) {
        history.push("/");
      }
      setStatPoints(buildData.statPoints);
      setStats(buildData.stats);
      setSlotData(buildData.slotData);
      setBuildTitle(buildData.buildTitle);
      setBuildVideo(buildData.buildVideo);
      setCombatType(buildData.combatType);
      setPlaystyle(buildData.playstyle);
      setInputText(buildData.buildDescription);
      setActiveNodes(buildData.activeNodes);
      setRotations(buildData.rotations);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBuildData();
  }, []);

  /* ALL THE DATA CONTROLLERS EXIST HERE */
  const setStatPointsCB = useCallback(
    (value) => {
      setStatPoints(value);
    },
    [setStatPoints]
  );

  const setStatsCB = useCallback(
    (statName, value) => {
      setStats({
        ...stats,
        [statName]: value,
      });
    },
    [setStats, stats]
  );

  const setSlotDataCB = useCallback(
    (data) => {
      setSlotData(data);
    },
    [setSlotData]
  );

  const setDesc = useCallback(
    (data) => {
      setInputText(data);
    },
    [setInputText]
  );
  const setVid = useCallback(
    (data) => {
      setBuildVideo(data);
    },
    [setBuildVideo]
  );
  const setComb = useCallback(
    (data) => {
      setCombatType(data);
    },
    [setCombatType]
  );
  const setPs = useCallback(
    (data) => {
      setPlaystyle(data);
    },
    [setPlaystyle]
  );
  const setTitle = useCallback(
    (data) => {
      setBuildTitle(data);
    },
    [setBuildTitle]
  );

  const setActiveNodes = useCallback(
    (data) => {
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
          middle: rotation,
        });
      } else {
        setRotations({
          ...rotations,
          [scope]: rotation,
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
      statPoints,
    };
    try {
      const putRes = await axios.put(`${submitRoute}/${buildID}`, buildPayload);
      if (putRes.data.status === "success") {
        history.push(`/builds/build/${putRes.data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const statPointsProps = {
    setStatsCB,
    setStatPointsCB,
    stats,
    statPoints,
  };

  const skillContainerProps = {
    slotData,
    setSlotDataCB,
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
    submitData,
  };

  const gateOfFatesProps = {
    setActiveNodes,
    activeNodes,
    rotations,
    setRotationsCB,
  };

  return (
    <Layout className="createBuildPageLayout">
      <Content className="statsAndSkills">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}>
            <EditBuildTitle />
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

export default EditBuild;
