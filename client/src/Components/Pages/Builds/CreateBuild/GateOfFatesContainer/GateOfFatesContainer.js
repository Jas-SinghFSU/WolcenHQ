import React, { useRef, useEffect, Fragment, useState } from "react";
import { Row, Col, Button } from "antd";
import ReactTooltip from "react-tooltip";
import GoF from "./GoF";

import "./style.css";
import "./gos.css";

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

  const d3Ref = useRef();

  useEffect(() => {
    new GoF(d3Ref);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col>
          <div ref={d3Ref}></div>
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
