import React, { useState } from "react";
import { Row, Col, Icon, Input } from "antd";
import {
  CheckOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import "./style.css";

const StatPointsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Stat Points</span>
      </Col>
    </Row>
  );
};

const StatPointsSection = ({
  setStatPointsCB,
  setStatsCB,
  stats,
  statPoints
}) => {
  const setFerocity = val => {
    setStatsCB("ferocity", val);
  };

  const setWisdom = val => {
    setStatsCB("wisdom", val);
  };

  const setAgility = val => {
    setStatsCB("agility", val);
  };

  const setToughness = val => {
    setStatsCB("toughness", val);
  };

  const handleStatIncrease = statName => {
    switch (statName) {
      case "ferocity":
        if (statPoints > 0) {
          setFerocity(stats.ferocity + 1);
          setStatPointsCB(statPoints - 1);
        }
        break;
      case "toughness":
        if (statPoints > 0) {
          setToughness(stats.toughness + 1);
          setStatPointsCB(statPoints - 1);
        }
        break;
      case "agility":
        if (statPoints > 0) {
          setAgility(stats.agility + 1);
          setStatPointsCB(statPoints - 1);
        }
        break;
      case "wisdom":
        if (statPoints > 0) {
          setWisdom(stats.wisdom + 1);
          setStatPointsCB(statPoints - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleStatDecrease = statName => {
    switch (statName) {
      case "ferocity":
        if (stats.ferocity > 0) {
          setFerocity(stats.ferocity - 1);
          setStatPointsCB(statPoints + 1);
        }
        break;
      case "toughness":
        if (stats.toughness > 0) {
          setToughness(stats.toughness - 1);
          setStatPointsCB(statPoints + 1);
        }
        break;
      case "agility":
        if (stats.agility > 0) {
          setAgility(stats.agility - 1);
          setStatPointsCB(statPoints + 1);
        }
        break;
      case "wisdom":
        if (stats.wisdom > 0) {
          setWisdom(stats.wisdom - 1);
          setStatPointsCB(statPoints + 1);
        }
        break;
      default:
        break;
    }
  };

  // Handle stat changes via text input
  const onStatInputChange = e => {
    const statPointsValue = parseInt(statPoints || 0);
    const newTargetValue = parseInt(e.target.value || 0);
    const maxPoints = 890;

    // Check if the new values falls within range
    const isWithinRange = (val, currentTotal, operation) => {
      const sumOfAllStats = parseInt(val || 0) + parseInt(currentTotal || 0);
      if (sumOfAllStats >= 0 && sumOfAllStats <= maxPoints) {
        return true;
      }
      return false;
    };

    // Handle which stat is being changed
    switch (e.target.name) {
      case "ferocity":
        const allButFerocity =
          parseInt(stats.wisdom || 0) +
          parseInt(stats.toughness || 0) +
          parseInt(stats.agility || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButFerocity) &&
          stats.ferocity < newTargetValue
        ) {
          setFerocity(
            stats.ferocity === 0
              ? e.target.value.replace(/^0+/, "")
              : newTargetValue
          );
          setStatPointsCB(890 - (newTargetValue + allButFerocity));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButFerocity) &&
          stats.ferocity > newTargetValue
        ) {
          setStatPointsCB(statPointsValue + (stats.ferocity - newTargetValue));
          setFerocity(newTargetValue || 0);
        }
        break;
      case "toughness":
        const allButToughness =
          parseInt(stats.wisdom || 0) +
          parseInt(stats.ferocity || 0) +
          parseInt(stats.agility || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButToughness) &&
          stats.toughness < newTargetValue
        ) {
          setToughness(
            stats.toughness === 0
              ? e.target.value.replace(/^0+/, "")
              : newTargetValue
          );
          setStatPointsCB(890 - (newTargetValue + allButToughness));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButToughness) &&
          stats.toughness > newTargetValue
        ) {
          setStatPointsCB(statPointsValue + (stats.toughness - newTargetValue));
          setToughness(newTargetValue || 0);
        }
        break;
      case "agility":
        const allButAgility =
          parseInt(stats.wisdom || 0) +
          parseInt(stats.toughness || 0) +
          parseInt(stats.ferocity || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButAgility) &&
          stats.agility < newTargetValue
        ) {
          setAgility(
            stats.agility === 0
              ? e.target.value.replace(/^0+/, "")
              : newTargetValue
          );
          setStatPointsCB(890 - (newTargetValue + allButAgility));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButAgility) &&
          stats.agility > newTargetValue
        ) {
          setStatPointsCB(statPointsValue + (stats.agility - newTargetValue));
          setAgility(newTargetValue || 0);
        }
        break;
      case "wisdom":
        const allButWisdom =
          parseInt(stats.ferocity || 0) +
          parseInt(stats.toughness || 0) +
          parseInt(stats.agility || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButWisdom) &&
          stats.wisdom < newTargetValue
        ) {
          setWisdom(
            stats.wisdom === 0
              ? e.target.value.replace(/^0+/, "")
              : newTargetValue
          );
          setStatPointsCB(890 - (newTargetValue + allButWisdom));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButWisdom) &&
          stats.wisdom > newTargetValue
        ) {
          setStatPointsCB(statPointsValue + (stats.wisdom - newTargetValue));
          setWisdom(newTargetValue || 0);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Row className="statPointsSectionRow">
        <Col className="statPointsSectionCol" span={7} offset={8}>
          <span className="statPointsSectionTitle">
            Points Available: {statPoints}{" "}
            {statPoints === 0 && <CheckOutlined className="statPointsCheck" />}
          </span>
        </Col>
      </Row>
      <Row className="statsRow">
        <Col className="statCol" span={5} offset={2}>
          <span className="statTitle ferocity">
            Ferocity:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={stats.ferocity}
              name="ferocity"
              onChange={onStatInputChange}
            />
          </span>
          <div className="statsControllerCol">
            <ArrowLeftOutlined
              className="statsControllerButton left noSelectText"
              onClick={() => handleStatDecrease("ferocity")}
            />
            <ArrowRightOutlined
              className="statsControllerButton right noSelectText"
              onClick={() => handleStatIncrease("ferocity")}
            />
          </div>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle toughness">
            Toughness:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={stats.toughness}
              name="toughness"
              onChange={onStatInputChange}
            />
          </span>
          <div className="statsControllerCol">
            <ArrowLeftOutlined
              className="statsControllerButton left noSelectText"
              onClick={() => handleStatDecrease("toughness")}
            />
            <ArrowRightOutlined
              className="statsControllerButton right noSelectText"
              onClick={() => handleStatIncrease("toughness")}
            />
          </div>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle agility">
            Agility:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={stats.agility}
              name="agility"
              onChange={onStatInputChange}
            />
          </span>
          <div className="statsControllerCol">
            <ArrowLeftOutlined
              className="statsControllerButton left noSelectText"
              onClick={() => handleStatDecrease("agility")}
            />
            <ArrowRightOutlined
              className="statsControllerButton right noSelectText"
              onClick={() => handleStatIncrease("agility")}
            />
          </div>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle wisdom">
            Wisdom:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={stats.wisdom}
              name="wisdom"
              onChange={onStatInputChange}
            />
          </span>
          <div className="statsControllerCol">
            <ArrowLeftOutlined
              className="statsControllerButton left noSelectText"
              onClick={() => handleStatDecrease("wisdom")}
            />
            <ArrowRightOutlined
              className="statsControllerButton right noSelectText"
              onClick={() => handleStatIncrease("wisdom")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const StatPointsContainer = props => {
  return (
    <div>
      <StatPointsSectionHeader />
      <StatPointsSection {...props} />
    </div>
  );
};

export default React.memo(StatPointsContainer);
