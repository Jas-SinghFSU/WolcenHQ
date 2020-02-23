import React, { useState, useEffect } from "react";
import { Row, Col, Icon } from "antd";

import "./style.css";

const spellData = require("../../../../../Data/Skills.json");

const SkillsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="statPointsTitle">Skills</span>
      </Col>
    </Row>
  );
};

const SkillsSelectorLabels = () => {
  return (
    <div>
      <Row className="skillsRow">
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 1 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 2 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 3 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 4 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 5 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Right Click </span>
        </Col>
      </Row>
    </div>
  );
};

const skillListModal = () => {
  return (
    <div>
      <span></span>
    </div>
  );
};
const SkillsSelectors = () => {
  const [slotOneSelected, setSlotOneSelected] = useState(null);
  const [slotTwoSelected, setSlotTwoSelected] = useState(null);
  const [slotThreeSelected, setSlotThreeSelected] = useState(null);
  const [slotFourSelected, setSlotFourSelected] = useState(null);
  const [slotFiveSelected, setSlotFiveSelected] = useState(null);
  const [slotSixSelected, setSlotSixSelected] = useState(null);
  return (
    <div>
      <Row className="skillsSelectorRow">
        <Col span={4} offset={0}>
          {!slotOneSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotTwoSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotThreeSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotFourSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotFiveSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotSixSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
      </Row>
    </div>
  );
};

const SkillsContainer = () => {
  return (
    <div>
      <SkillsSectionHeader />
      <SkillsSelectorLabels />
      <SkillsSelectors />
    </div>
  );
};

export default SkillsContainer;
