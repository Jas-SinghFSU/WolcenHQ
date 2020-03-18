import React, { useState } from "react";
import { Row, Col, Icon, Input } from "antd";

import "./style.css";

const StatPointsSectionHeader = props => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Stat Points</span>
      </Col>
    </Row>
  );
};

const StatPointsSection = props => {
  const [statPoints, setStatPoints] = useState(890);
  const [stats, setStats] = useState({
    ferocity: 0,
    toughness: 0,
    agility: 0,
    wisdom: 0
  });

  const setFerocity = val => {
    setStats({
      ...stats,
      ferocity: val
    });
  };

  const setWisdom = val => {
    setStats({
      ...stats,
      wisdom: val
    });
  };

  const setAgility = val => {
    setStats({
      ...stats,
      agility: val
    });
  };

  const setToughness = val => {
    setStats({
      ...stats,
      toughness: val
    });
  };

  const handleStatIncrease = statName => {
    switch (statName) {
      case "ferocity":
        if (statPoints > 0) {
          setFerocity(stats.ferocity + 1);
          setStatPoints(statPoints - 1);
        }
        break;
      case "toughness":
        if (statPoints > 0) {
          setToughness(stats.toughness + 1);
          setStatPoints(statPoints - 1);
        }
        break;
      case "agility":
        if (statPoints > 0) {
          setAgility(stats.agility + 1);
          setStatPoints(statPoints - 1);
        }
        break;
      case "wisdom":
        if (statPoints > 0) {
          setWisdom(stats.wisdom + 1);
          setStatPoints(statPoints - 1);
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
          setStatPoints(statPoints + 1);
        }
        break;
      case "toughness":
        if (stats.toughness > 0) {
          setToughness(stats.toughness - 1);
          setStatPoints(statPoints + 1);
        }
        break;
      case "agility":
        if (stats.agility > 0) {
          setAgility(stats.agility - 1);
          setStatPoints(statPoints + 1);
        }
        break;
      case "wisdom":
        if (stats.wisdom > 0) {
          setWisdom(stats.wisdom - 1);
          setStatPoints(statPoints + 1);
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
          setStatPoints(890 - (newTargetValue + allButFerocity));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButFerocity) &&
          stats.ferocity > newTargetValue
        ) {
          setStatPoints(statPointsValue + (stats.ferocity - newTargetValue));
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
          setStatPoints(890 - (newTargetValue + allButToughness));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButToughness) &&
          stats.toughness > newTargetValue
        ) {
          setStatPoints(statPointsValue + (stats.toughness - newTargetValue));
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
          setStatPoints(890 - (newTargetValue + allButAgility));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButAgility) &&
          stats.agility > newTargetValue
        ) {
          setStatPoints(statPointsValue + (stats.agility - newTargetValue));
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
          setStatPoints(890 - (newTargetValue + allButWisdom));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButWisdom) &&
          stats.wisdom > newTargetValue
        ) {
          setStatPoints(statPointsValue + (stats.wisdom - newTargetValue));
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
            {statPoints === 0 && (
              <Icon className="statPointsCheck" type="check" />
            )}
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
            <Icon
              className="statsControllerButton left noSelectText"
              type="arrow-left"
              onClick={() => handleStatDecrease("ferocity")}
            />
            <Icon
              className="statsControllerButton right noSelectText"
              type="arrow-right"
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
            <Icon
              className="statsControllerButton left noSelectText"
              type="arrow-left"
              onClick={() => handleStatDecrease("toughness")}
            />
            <Icon
              className="statsControllerButton right noSelectText"
              type="arrow-right"
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
            <Icon
              className="statsControllerButton left noSelectText"
              type="arrow-left"
              onClick={() => handleStatDecrease("agility")}
            />
            <Icon
              className="statsControllerButton right noSelectText"
              type="arrow-right"
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
            <Icon
              className="statsControllerButton left noSelectText"
              type="arrow-left"
              onClick={() => handleStatDecrease("wisdom")}
            />
            <Icon
              className="statsControllerButton right noSelectText"
              type="arrow-right"
              onClick={() => handleStatIncrease("wisdom")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const StatPointsContainer = () => {
  return (
    <div>
      <StatPointsSectionHeader />
      <StatPointsSection />
    </div>
  );
};

export default React.memo(StatPointsContainer);
