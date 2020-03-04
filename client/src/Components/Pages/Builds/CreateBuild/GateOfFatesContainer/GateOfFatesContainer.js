import React, { useRef, useEffect, Fragment, useState } from "react";
import { Row, Col, Button } from "antd";
import ReactTooltip from "react-tooltip";

import "./style.css";

const GOFSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="statPointsTitle">Gate of Fates</span>
      </Col>
    </Row>
  );
};

const D3Test = () => {
  const [data, setData] = useState([10, 20, 30, 40, 10]);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Row>
        <Col>
          <svg className="d3svg"></svg>
        </Col>
      </Row>
    </Fragment>
  );
};

const GateOfFatesContainer = () => {
  return (
    <div>
      <GOFSectionHeader />
      <D3Test />
    </div>
  );
};

export default GateOfFatesContainer;
