import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";

import SearchContainer from "./SearchContainer/SearchContainer";
import BuildsList from "./BuildsList/BuildsList";

import "./style.css";

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="homePageLayout">
      <Content className="searchBuilds">
        <Row>
          <Col span={12} offset={6} style={{ textAlign: "center" }}>
            <SearchContainer />
          </Col>
        </Row>
      </Content>
      <Content className="topBuildsList">
        <Row>
          <Col span={22} offset={1} style={{ textAlign: "center" }}>
            <BuildsList />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
