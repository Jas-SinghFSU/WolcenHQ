import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Input, Select, Button } from "antd";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import { buildDescription } from "../../../../Constants/constants";
import validator from "validator";

import "react-quill/dist/quill.snow.css";
import "./style.css";

const { Option } = Select;
const InputGroup = Input.Group;

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
  // const [inputText, setInputText] = useState(buildDescription.default);

  const {
    buildTitle,
    setTitle,
    buildVideo,
    setVid,
    combatType,
    setComb,
    playstyle,
    setPs,
    inputText,
    setDesc
  } = props;

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

  const validateURL = () => {
    const isURLValid = validator.isURL(buildVideo);

    return isURLValid;
  };

  return (
    <Row className="buildDescriptionContainer">
      <Col span={24} offset={0}>
        <div className="buildInputBoxContainer">
          <div className="buildTitleContainer">
            <div className="buildDescriptionSectionLabel">Title</div>
            <Input
              className="buildTitleInput"
              placeholder="How about a cool name?"
              value={buildTitle}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="buildYTLinkContainer">
            <div className="buildDescriptionSectionLabel">Youtube Link</div>
            <Input
              className="ytLinkInput"
              placeholder="Got a video? Show it off!"
              value={buildVideo}
              onChange={e => setVid(e.target.value)}
            />
          </div>
          <div className="playstyleContainer">
            <div className="buildDescriptionSectionLabel">Playstyle</div>
            <InputGroup className="playstyleInput">
              <Select
                style={{ width: "100%" }}
                defaultValue="Solo"
                onChange={val => setPs(val)}
              >
                <Option value="Solo">Solo</Option>
                <Option value="Group">Group</Option>
                <Option value="Solo + Group">Solo + Group</Option>
              </Select>
            </InputGroup>
          </div>
          <div className="combatTypeContainer">
            <div className="buildDescriptionSectionLabel">Combat Type</div>
            <InputGroup className="combatTypeInput">
              <Select
                style={{ width: "100%" }}
                defaultValue="Melee"
                onChange={val => setComb(val)}
              >
                <Option value="Melee">Melee</Option>
                <Option value="Caster">Caster</Option>
                <Option value="Ranged">Ranged</Option>
                <Option value="Tank">Tank</Option>
              </Select>
            </InputGroup>
          </div>
        </div>
        <div className="buildGuideContainer">
          <div className="buildDescriptionSectionLabel">Description</div>
          <ReactQuill
            className="quillComponent"
            value={inputText}
            onChange={setDesc}
            theme="snow"
            modules={quillBoxModules}
          />
        </div>
      </Col>
      <Col span={2} offset={11}>
        <Button className="submitBuildButton" type="primary">
          Submit
        </Button>
      </Col>
    </Row>
  );
};

const BuildDescriptionContainer = props => {
  return (
    <Fragment>
      <BuildDescriptionHeader />
      <BuildDescriptionContent {...props} />
    </Fragment>
  );
};

export default React.memo(BuildDescriptionContainer);
