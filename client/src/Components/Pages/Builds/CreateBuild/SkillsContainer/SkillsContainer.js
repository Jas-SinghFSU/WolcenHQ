import React from "react";
import { Row, Col } from "antd";

import "./style.css";

const SkillsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="statPointsTitle">Skills</span>
      </Col>
    </Row>
  );
};

const SkillsSelector = () => {
  return (
    <div>
      <Row className="skillsRow">
        <Col className="statCol" span={4} offset={0}>
          <span className="skillTitle">Slot 1 </span>
        </Col>
        <Col className="statCol" span={4} offset={0}>
          <span className="skillTitle">Slot 2 </span>
        </Col>
        <Col className="statCol" span={4} offset={0}>
          <span className="skillTitle">Slot 3 </span>
        </Col>
        <Col className="statCol" span={4} offset={0}>
          <span className="skillTitle">Slot 4 </span>
        </Col>
        <Col className="statCol" span={4} offset={0}>
          <span className="skillTitle">Slot 5 </span>
        </Col>
        <Col className="statCol" span={4} offset={0}>
          <span className="skillTitle">Right Click </span>
        </Col>
      </Row>
    </div>
  );
};

const SkillsContainer = () => {
  return (
    <div>
      <SkillsSectionHeader />
      <SkillsSelector />
    </div>
  );
};

export default SkillsContainer;
