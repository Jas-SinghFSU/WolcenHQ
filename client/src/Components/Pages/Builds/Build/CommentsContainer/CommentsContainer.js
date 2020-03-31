import React, { Fragment } from "react";
import { Row, Col } from "antd";

import "./style.css";

const CommentsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Comments</span>
      </Col>
    </Row>
  );
};

const CommentsContainer = () => {
  return (
    <Fragment>
      <CommentsSectionHeader />
    </Fragment>
  );
};

export default CommentsContainer;
