import React from "react";
import { Row, Col } from "antd";

import "./style.css";
const ListHeader = () => {
  return (
    <Row>
      <Col className="buildsListHeader" span={7} offset={0}>
        <span className="headerTitle tBuildName">Build Name</span>
      </Col>
      <Col className="buildsListHeader" span={4} offset={0}>
        <span className="headerTitle">Type</span>
      </Col>
      <Col className="buildsListHeader" span={8} offset={0}>
        <span className="headerTitle">Spells</span>
      </Col>
      <Col className="buildsListHeader" span={2} offset={0}>
        <span className="headerTitle">Likes</span>
      </Col>
      <Col className="buildsListHeader" span={3} offset={0}>
        <span className="headerTitle">Last Updated</span>
      </Col>
    </Row>
  );
};

export default ListHeader;
