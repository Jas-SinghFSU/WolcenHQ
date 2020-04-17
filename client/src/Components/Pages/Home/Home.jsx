import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";

import NewFeed from "./NewsFeed/NewsFeed";
import TopBuilds from "./TopBuilds/TopBuilds";

import "./style.css";

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="homePageLayout">
      <Content className="searchBuilds">
        <NewFeed />
        <TopBuilds />
      </Content>
    </Layout>
  );
};

export default Home;
