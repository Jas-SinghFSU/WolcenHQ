import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";

import "./style.css";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout className="homePageLayout">
      <Content className="searchBuilds">
        <Row>
          <Col className="searchBuildContainer" span={12} offset={6}>
            <span className="searchBuildLabel">Search for builds</span>
          </Col>
        </Row>
      </Content>
      <Content className="topBuildsList">Top builds.</Content>
    </Layout>
  );
};

export default Home;
