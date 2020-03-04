import React from "react";
import { Layout, Row, Col } from "antd";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";
import SkillsContainer from "./SkillsContainer/SkillsContainer";
import GateOfFatesContainer from "./GateOfFatesContainer/GateOfFatesContainer";

import "./style.css";

const { Content } = Layout;

const CreateBuildTitle = props => {
  return (
    <Row>
      <Col className="buildTitleCol" span={24} offset={0}>
        <span className="createBuildTitle">CREATE A BUILD</span>
      </Col>
    </Row>
  );
};

const CreateBuild = () => {
  return (
    <Layout className="createBuildPageLayout">
      <Content className="statsAndSkills">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}>
            <CreateBuildTitle />
            <StatPointsContainer />
            <SkillsContainer />
            <GateOfFatesContainer />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateBuild;
