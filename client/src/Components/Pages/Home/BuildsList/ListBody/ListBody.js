import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";

import "./style.css";

const ListBody = () => {
  const history = useHistory();

  const handleBuildClick = buildID => {
    history.push(`/buids/build/${buildID}`);
  };
  return (
    <div>
      <Row
        className="buildsListBody"
        onClick={() => {
          handleBuildClick("23124321");
        }}
      >
        <Col span={7} offset={0}>
          <span className="headerTitle">Ailment damage burst</span>
        </Col>
        <Col span={4} offset={0}>
          <span className="headerTitle">AOE/Caster</span>
        </Col>
        <Col span={9} offset={0}>
          <span className="headerTitle">Spells</span>
        </Col>
        <Col span={2} offset={0}>
          <span className="headerTitle">+154</span>
        </Col>
        <Col span={2} offset={0}>
          <span className="headerTitle">2672</span>
        </Col>
      </Row>
      <Row className="buildsListBody">
        <Col span={7} offset={0}>
          <span className="headerTitle">Smack em in the face. HARD</span>
        </Col>
        <Col span={4} offset={0}>
          <span className="headerTitle">Melee</span>
        </Col>
        <Col span={9} offset={0}>
          <span className="headerTitle">Spells</span>
        </Col>
        <Col span={2} offset={0}>
          <span className="headerTitle">+78</span>
        </Col>
        <Col span={2} offset={0}>
          <span className="headerTitle">1325</span>
        </Col>
      </Row>
    </div>
  );
};

export default ListBody;
