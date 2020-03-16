import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "antd";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const BuildDescriptionHeader = props => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Build Guide</span>
      </Col>
    </Row>
  );
};

const BuildDescriptionContent = props => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = val => {
    setInputText(val);
  };
  return (
    <Row>
      <Col span={24} offset={0}>
        <ReactQuill
          className="quillComponent"
          value={inputText}
          onChange={handleInputChange}
          theme="snow"
        />
      </Col>
    </Row>
  );
};

const BuildDescriptionContainer = () => {
  return (
    <Fragment>
      <BuildDescriptionHeader />
      <BuildDescriptionContent />
    </Fragment>
  );
};

export default BuildDescriptionContainer;
