import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Input, Icon } from "antd";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

let quilIcons = Quill.import("ui/icons");
quilIcons["bold"] = '<i class="fas fa-bold"></i>';
quilIcons["italic"] = '<i class="fas fa-italic"></i>';
quilIcons["underline"] = '<i class="fas fa-underline"></i>';
quilIcons["strike"] = '<i class="fas fa-strikethrough"></i>';
quilIcons["blockquote"] = '<i class="fas fa-quote-right"></i>';
quilIcons["indent"]["+1"] = '<i class="fas fa-indent"></i>';
quilIcons["indent"]["-1"] = '<i class="fas fa-outdent"></i>';
quilIcons["list"]["ordered"] = '<i class="fas fa-list-ol"></i>';
quilIcons["list"]["bullet"] = '<i class="fas fa-list-ul"></i>';
quilIcons["link"] = '<i class="fas fa-link"></i>';
quilIcons["color"] = '<i class="fas fa-palette" size="2x"></i>';

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
  const [buildTitle, setBuildTitle] = useState("");
  const [inputText, setInputText] = useState("");

  const handleInputChange = val => {
    setInputText(val);
  };

  const quillBoxModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      [{ color: [] }]
    ]
  };

  return (
    <Row className="buildDescriptionContainer">
      <Col span={24} offset={0}>
        <div className="buildTitleContainer">
          <div className="buildDescriptionSectionLabel">Title</div>
          <Input
            className="buildTitleInput"
            placeholder="How about a cool name?"
            value={buildTitle}
            onChange={e => setBuildTitle(e.target.value)}
          />
        </div>
        <div className="buildGuideContainer">
          <div className="buildDescriptionSectionLabel">Description</div>
          <ReactQuill
            className="quillComponent"
            value={inputText}
            onChange={handleInputChange}
            theme="snow"
            modules={quillBoxModules}
          />
        </div>
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
