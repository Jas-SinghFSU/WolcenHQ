import React from "react";
import { Row, Col } from "antd";

import "./style.css";
const ListHeader = () => {
  return (
    <Row>
      <Col className="buildsListHeader" span={7} offset={0}>
        <span className="headerTitle">Build Name</span>
      </Col>
      <Col className="buildsListHeader" span={4} offset={0}>
        <span className="headerTitle">Type</span>
      </Col>
      <Col className="buildsListHeader" span={9} offset={0}>
        <span className="headerTitle">Spells</span>
      </Col>
      <Col className="buildsListHeader" span={2} offset={0}>
        <span className="headerTitle">Likes</span>
      </Col>
      <Col className="buildsListHeader" span={2} offset={0}>
        <span className="headerTitle">Views</span>
      </Col>
    </Row>
  );
};

export default ListHeader;
