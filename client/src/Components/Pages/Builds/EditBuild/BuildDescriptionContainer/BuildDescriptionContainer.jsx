import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Input, Select, Button } from "antd";
import CustomQuill from "../../../../Shared/CustomQuill/CustomQuill";
import validator from "validator";

import "./style.css";

const { Option } = Select;
const InputGroup = Input.Group;

const BuildDescriptionHeader = (props) => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Build Guide</span>
      </Col>
    </Row>
  );
};

const BuildDescriptionContent = (props) => {
  const {
    buildTitle,
    setTitle,
    buildVideo,
    setVid,
    setComb,
    setPs,
    inputText,
    setDesc,
    submitData,
  } = props;

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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="buildYTLinkContainer">
            <div className="buildDescriptionSectionLabel">Youtube Link</div>
            <Input
              className="ytLinkInput"
              placeholder="Got a video? Show it off!"
              value={buildVideo}
              onChange={(e) => setVid(e.target.value)}
            />
          </div>
          <div className="playstyleContainer">
            <div className="buildDescriptionSectionLabel">Playstyle</div>
            <InputGroup className="playstyleInput">
              <Select
                style={{ width: "100%" }}
                defaultValue="Solo"
                onChange={(val) => setPs(val)}
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
                onChange={(val) => setComb(val)}
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
          <CustomQuill
            className="quillComponent"
            value={inputText}
            onChange={setDesc}
            theme="snow"
          />
        </div>
      </Col>
      <Col span={2} offset={11}>
        <Button
          className="submitBuildButton customPrimary"
          type="primary"
          onClick={submitData}
        >
          Submit
        </Button>
      </Col>
    </Row>
  );
};

const BuildDescriptionContainer = (props) => {
  return (
    <Fragment>
      <BuildDescriptionHeader />
      <BuildDescriptionContent {...props} />
    </Fragment>
  );
};

export default React.memo(BuildDescriptionContainer);
