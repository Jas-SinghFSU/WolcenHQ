import React, { useState } from "react";
import { Row, Col, Icon, Input } from "antd";

import "./style.css";

const StatPointsSectionHeader = props => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="statPointsTitle">Stat Points</span>
      </Col>
    </Row>
  );
};

const StatPointsSection = props => {
  const [statPoints, setStatPoints] = useState(890);
  const [ferocity, setFerocity] = useState(0);
  const [toughness, setToughness] = useState(0);
  const [agility, setAgility] = useState(0);
  const [wisdom, setWisdom] = useState(0);

  const handleStatIncrease = statName => {
    switch (statName) {
      case "ferocity":
        if (statPoints > 0) {
          setFerocity(ferocity + 1);
          setStatPoints(statPoints - 1);
        }
        break;
      case "toughness":
        if (statPoints > 0) {
          setToughness(toughness + 1);
          setStatPoints(statPoints - 1);
        }
        break;
      case "agility":
        if (statPoints > 0) {
          setAgility(agility + 1);
          setStatPoints(statPoints - 1);
        }
        break;
      case "wisdom":
        if (statPoints > 0) {
          setWisdom(wisdom + 1);
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
        if (ferocity > 0) {
          setFerocity(ferocity - 1);
          setStatPoints(statPoints + 1);
        }
        break;
      case "toughness":
        if (toughness > 0) {
          setToughness(toughness - 1);
          setStatPoints(statPoints + 1);
        }
        break;
      case "agility":
        if (agility > 0) {
          setAgility(agility - 1);
          setStatPoints(statPoints + 1);
        }
        break;
      case "wisdom":
        if (wisdom > 0) {
          setWisdom(wisdom - 1);
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
    console.log(newTargetValue);
    const maxPoints = 890;

    // Check if the new values falls within range
    const isWithinRange = (val, currentTotal, operation) => {
      const sumOfAllStats = parseInt(val || 0) + parseInt(currentTotal || 0);
      console.log(`sum: ${sumOfAllStats}`);
      if (sumOfAllStats >= 0 && sumOfAllStats <= maxPoints) {
        return true;
      }
      return false;
    };

    // Handle which stat is being changed
    switch (e.target.name) {
      case "ferocity":
        const allButFerocity =
          parseInt(wisdom || 0) +
          parseInt(toughness || 0) +
          parseInt(agility || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButFerocity) &&
          ferocity < newTargetValue
        ) {
          setFerocity(
            ferocity === 0 ? e.target.value.replace(/^0+/, "") : newTargetValue
          );
          setStatPoints(890 - (newTargetValue + allButFerocity));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButFerocity) &&
          ferocity > newTargetValue
        ) {
          console.log(ferocity - newTargetValue);
          setStatPoints(statPointsValue + (ferocity - newTargetValue));
          setFerocity(newTargetValue || 0);
        }
        break;
      case "toughness":
        const allButToughness =
          parseInt(wisdom || 0) +
          parseInt(ferocity || 0) +
          parseInt(agility || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButToughness) &&
          toughness < newTargetValue
        ) {
          setToughness(
            toughness === 0 ? e.target.value.replace(/^0+/, "") : newTargetValue
          );
          setStatPoints(890 - (newTargetValue + allButToughness));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButToughness) &&
          toughness > newTargetValue
        ) {
          console.log(toughness - newTargetValue);
          setStatPoints(statPointsValue + (toughness - newTargetValue));
          setToughness(newTargetValue || 0);
        }
        break;
      case "agility":
        const allButAgility =
          parseInt(wisdom || 0) +
          parseInt(toughness || 0) +
          parseInt(ferocity || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButAgility) &&
          agility < newTargetValue
        ) {
          setAgility(
            agility === 0 ? e.target.value.replace(/^0+/, "") : newTargetValue
          );
          setStatPoints(890 - (newTargetValue + allButAgility));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButAgility) &&
          agility > newTargetValue
        ) {
          console.log(agility - newTargetValue);
          setStatPoints(statPointsValue + (agility - newTargetValue));
          setAgility(newTargetValue || 0);
        }
        break;
      case "wisdom":
        const allButWisdom =
          parseInt(ferocity || 0) +
          parseInt(toughness || 0) +
          parseInt(agility || 0);
        if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButWisdom) &&
          wisdom < newTargetValue
        ) {
          setWisdom(
            wisdom === 0 ? e.target.value.replace(/^0+/, "") : newTargetValue
          );
          setStatPoints(890 - (newTargetValue + allButWisdom));
        } else if (
          statPointsValue >= 0 &&
          isWithinRange(newTargetValue, allButWisdom) &&
          wisdom > newTargetValue
        ) {
          console.log(wisdom - newTargetValue);
          setStatPoints(statPointsValue + (wisdom - newTargetValue));
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
              value={ferocity}
              name="ferocity"
              onChange={onStatInputChange}
            />
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle toughness">
            Toughness:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={toughness}
              name="toughness"
              onChange={onStatInputChange}
            />
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle agility">
            Agility:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={agility}
              name="agility"
              onChange={onStatInputChange}
            />
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle wisdom">
            Wisdom:{" "}
            <Input
              className="statCount"
              defaultValue={0}
              value={wisdom}
              name="wisdom"
              onChange={onStatInputChange}
            />
          </span>
        </Col>
      </Row>

      <Row className="statsControllerRow">
        <Col className="statsControllerCol" span={5} offset={2}>
          <Icon
            className="statsControllerButton left"
            type="arrow-left"
            onClick={() => handleStatDecrease("ferocity")}
          />
          <Icon
            className="statsControllerButton right"
            type="arrow-right"
            onClick={() => handleStatIncrease("ferocity")}
          />
        </Col>
        <Col className="statsControllerCol" span={5} offset={0}>
          <Icon
            className="statsControllerButton left"
            type="arrow-left"
            onClick={() => handleStatDecrease("toughness")}
          />
          <Icon
            className="statsControllerButton right"
            type="arrow-right"
            onClick={() => handleStatIncrease("toughness")}
          />
        </Col>
        <Col className="statsControllerCol" span={5} offset={0}>
          <Icon
            className="statsControllerButton left"
            type="arrow-left"
            onClick={() => handleStatDecrease("agility")}
          />
          <Icon
            className="statsControllerButton right"
            type="arrow-right"
            onClick={() => handleStatIncrease("agility")}
          />
        </Col>
        <Col className="statsControllerCol" span={5} offset={0}>
          <Icon
            className="statsControllerButton left"
            type="arrow-left"
            onClick={() => handleStatDecrease("wisdom")}
          />
          <Icon
            className="statsControllerButton right"
            type="arrow-right"
            onClick={() => handleStatIncrease("wisdom")}
          />
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

export default StatPointsContainer;
