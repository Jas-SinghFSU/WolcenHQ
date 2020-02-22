import React, { useEffect, useState } from "react";
import { Row, Col, Icon } from "antd";

import "./style.css";

const CreateBuildTitle = props => {
  return (
    <Row>
      <Col className="buildTitleCol" span={24} offset={0}>
        <span className="createBuildTitle">CREATE A BUILD</span>
      </Col>
    </Row>
  );
};

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

  return (
    <div>
      <Row className="statPointsSectionRow">
        <Col className="statPointsSectionCol" span={6} offset={9}>
          <span className="statPointsSectionTitle">
            Points Available: {statPoints}
          </span>
        </Col>
      </Row>
      <Row className="statsRow">
        <Col className="statCol" span={5} offset={2}>
          <span className="statTitle ferocity">
            Ferocity: <span className="statCount">{ferocity}</span>
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle toughness">
            Toughness: <span className="statCount">{toughness}</span>
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle agility">
            Agility: <span className="statCount">{agility}</span>
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle wisdom">
            Wisdom: <span className="statCount">{wisdom}</span>
          </span>
        </Col>
      </Row>

      <Row className="statsControllerRow">
        <Col className="statsControllerCol" span={5} offset={1}>
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
      <CreateBuildTitle />
      <StatPointsSectionHeader />
      <StatPointsSection />
    </div>
  );
};

export default StatPointsContainer;
