import React, { useState, useEffect } from "react";
import { Row, Col, Icon, Modal, Button, Avatar } from "antd";

import "./style.css";

const spellData = require("../../../../../Data/Skills.json");

const SkillsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="statPointsTitle">Skills</span>
      </Col>
    </Row>
  );
};

const SkillsSelectorLabels = () => {
  return (
    <div>
      <Row className="skillsRow">
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 1 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 2 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 3 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 4 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Slot 5 </span>
        </Col>
        <Col span={4} offset={0}>
          <span className="skillTitle">Right Click </span>
        </Col>
      </Row>
    </div>
  );
};

const SkillListModal = props => {
  const { modalVisible, handleCloseModal } = props;

  const [skillList, setSkillsList] = useState(spellData.skills);
  return (
    <div>
      <Modal
        title="Choose a skill"
        visible={modalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <Row className="modalSkillsRow">
          {skillList.map(skill => {
            let imageName = skill.name.replace(/(\s)/g, "_");
            imageName = imageName.replace(/["']/g, "");
            console.log(imageName);
            return (
              <Col className="modalSkillsCol">
                <Avatar
                  className="spellIconAvatar"
                  size={40}
                  shape="square"
                  src={require(`../../../../../Data/SpellImages/${imageName}.png`)}
                />
                <span className="skillNameSpan">{skill.name}</span>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </div>
  );
};
const SkillsSelectors = () => {
  const [slotOneSelected, setSlotOneSelected] = useState(null);
  const [slotTwoSelected, setSlotTwoSelected] = useState(null);
  const [slotThreeSelected, setSlotThreeSelected] = useState(null);
  const [slotFourSelected, setSlotFourSelected] = useState(null);
  const [slotFiveSelected, setSlotFiveSelected] = useState(null);
  const [slotSixSelected, setSlotSixSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Row className="skillsSelectorRow">
        <Col span={4} offset={0}>
          {!slotOneSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotTwoSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotThreeSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotFourSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotFiveSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotSixSelected ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => console.log("clicked")}
            />
          ) : (
            <span></span>
          )}
        </Col>
      </Row>
      <SkillListModal
        modalVisible={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

const SkillsContainer = () => {
  return (
    <div>
      <SkillsSectionHeader />
      <SkillsSelectorLabels />
      <SkillsSelectors />
    </div>
  );
};

export default SkillsContainer;
