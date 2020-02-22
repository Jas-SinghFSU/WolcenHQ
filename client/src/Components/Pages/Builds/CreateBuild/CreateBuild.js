import React from "react";
import { Layout, Row, Col } from "antd";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";

import "./style.css";

const { Header, Content } = Layout;

const CreateBuild = () => {
  return (
    <Layout className="createBuildPageLayout">
      <Content className="statsAndSkills">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}>
            <StatPointsContainer />
          </Col>
        </Row>
      </Content>
      <Content className="topBuildsList">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}></Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateBuild;
