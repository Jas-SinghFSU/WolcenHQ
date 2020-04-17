import React, { useState, Fragment } from "react";
import { Row, Col, Icon } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import "./style.css";

const StatPointsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Stat Points</span>
      </Col>
    </Row>
  );
};

const StatPointsSection = ({ stats, statPoints }) => {
  return (
    <div>
      <Row className="statPointsSectionRow">
        <Col className="statPointsSectionCol" span={7} offset={8}>
          <span className="statPointsSectionTitle">
            Points Available: {statPoints}{" "}
            {statPoints === 0 && <CheckOutlined className="statPointsCheck" />}
          </span>
        </Col>
      </Row>
      <Row className="statsRow">
        <Col className="statCol" span={5} offset={2}>
          <span className="statTitle ferocity">
            Ferocity: {<span className="statCount">{stats.ferocity}</span>}
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle toughness">
            Toughness: {<span className="statCount">{stats.toughness}</span>}
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle agility">
            Agility: {<span className="statCount">{stats.agility}</span>}
          </span>
        </Col>
        <Col className="statCol" span={5} offset={0}>
          <span className="statTitle wisdom">
            Wisdom: {<span className="statCount">{stats.wisdom}</span>}
          </span>
        </Col>
      </Row>
    </div>
  );
};

const StatPointsContainer = props => {
  return (
    <Fragment>
      <StatPointsSectionHeader />
      <StatPointsSection {...props} />
    </Fragment>
  );
};

export default React.memo(StatPointsContainer);
