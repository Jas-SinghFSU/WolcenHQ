import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Icon, Modal, Button, Avatar } from "antd";
import ReactTooltip from "react-tooltip";

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
  const {
    modalVisible,
    handleCloseModal,
    handleSkillSelected,
    skillSlot
  } = props;

  const [skillList, setSkillsList] = useState(spellData.skills);
  const [skillSelected, setSkillSelected] = useState(null);
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    setSkillSelected(null);
    setSkillData(null);
  }, [modalVisible]);

  return (
    <div>
      <Modal
        title="Choose a skill"
        visible={modalVisible}
        onOk={() => handleSkillSelected(skillData, skillSlot, skillSelected)}
        onCancel={handleCloseModal}
      >
        <Row className="modalSkillsRow">
          {skillList.map((skill, index) => {
            let imageName = skill.name.replace(/(\s)/g, "_");
            imageName = imageName.replace(/["']/g, "");
            return (
              <Fragment>
                <Col
                  className="modalSkillsCol"
                  key={index}
                  onClick={() => {
                    setSkillSelected(imageName);
                    setSkillData(skill);
                  }}
                  data-tip
                  data-for={imageName}
                >
                  <Fragment>
                    <div
                      className={`skillBlock ${
                        imageName === skillSelected ? "skillBlockSelected" : ""
                      }`}
                    >
                      <Avatar
                        className="spellIconAvatar"
                        size={40}
                        shape="square"
                        src={require(`../../../../../Data/SpellImages/${imageName}.png`)}
                      />
                      <span className="skillNameSpan">{skill.name}</span>
                    </div>
                  </Fragment>
                </Col>
                <ReactTooltip
                  className="spellTooltip"
                  id={imageName}
                  effect="float"
                  place="right"
                >
                  <Row className="spellTooltipRow">
                    <Col className="tooltipSpellNameCol" span={24} offset={0}>
                      <span className="tooltipSpellName">{skill.name}</span>
                    </Col>
                    <Col className="tooltipSpellIconCol" span={24} offset={0}>
                      <Avatar
                        className="spellIconAvatar"
                        size={50}
                        shape="square"
                        src={require(`../../../../../Data/SpellImages/${imageName}.png`)}
                      />
                    </Col>
                    <Col
                      className="tooltipSpellDescriptionCol"
                      span={24}
                      offset={0}
                    >
                      <span className="tooltipSpellName">
                        {skill.description}
                      </span>
                    </Col>
                    <Col className="tooltipSpellAttackCol" span={24} offset={0}>
                      <span
                        className="tooltipAttackLabel"
                        style={
                          skill.type.includes("staff")
                            ? { color: "rgb(166, 118, 255)" }
                            : { color: "rgb(207, 134, 51)" }
                        }
                      >
                        {skill.type.includes("staff") ? "Spell: " : "Attack: "}
                      </span>
                      {skill.usableWith.includes("melee") ? (
                        <span>Only usable with melee weapons.</span>
                      ) : (
                        <span>
                          {`Only usable with ${skill.usableWith.join(", ")}.`}
                        </span>
                      )}
                    </Col>
                    <Col className="tooltipSpellTagsCol" span={24} offset={0}>
                      <span
                        style={{ color: "rgb(110, 156, 255)" }}
                        className="tooltipSpellTags"
                      >
                        {"Skill Tags: "}
                      </span>
                      <span>{skill.skillTags.join(", ")}</span>
                    </Col>
                  </Row>
                </ReactTooltip>
              </Fragment>
            );
          })}
        </Row>
      </Modal>
    </div>
  );
};
const SkillsSelectors = () => {
  const [slotOneData, setSlotOneData] = useState(null);
  const [slotTwoData, setSlotTwoData] = useState(null);
  const [slotThreeData, setSlotThreeData] = useState(null);
  const [slotFourData, setSlotFourData] = useState(null);
  const [slotFiveData, setSlotFiveData] = useState(null);
  const [slotSixData, setSlotSixData] = useState(null);
  const [modalData, setModalData] = useState({
    show: false,
    slot: null
  });

  const handleCloseModal = () => {
    setModalData({ show: false, slot: null });
  };

  const handleSkillSelected = (skillData, slot, imageName) => {
    setModalData({ show: false, slot: null });
    if (!skillData) {
      return;
    }
    switch (slot) {
      case 1:
        setSlotOneData({ skillData, imageName });
        break;
      case 2:
        setSlotTwoData({ skillData, imageName });
        break;
      case 3:
        setSlotThreeData({ skillData, imageName });
        break;
      case 4:
        setSlotFourData({ skillData, imageName });
        break;
      case 5:
        setSlotFiveData({ skillData, imageName });
        break;
      case 6:
        setSlotSixData({ skillData, imageName });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Row className="skillsSelectorRow">
        <Col span={4} offset={0}>
          {!slotOneData ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => setModalData({ show: true, slot: 1 })}
            />
          ) : (
            <Fragment>
              <Col span={24} offset={0}>
                <Avatar
                  className="slotSpellIcon"
                  size={55}
                  shape="square"
                  src={require(`../../../../../Data/SpellImages/${slotOneData.imageName}.png`)}
                />
              </Col>
              <Col span={24} offset={0} className="slotSpellNameCol">
                <span className="slotSpellTitle">
                  {slotOneData.skillData.name}
                </span>
                <div className="slotSpellNameBorder"></div>
              </Col>
            </Fragment>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotTwoData ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => setModalData({ show: true, slot: 2 })}
            />
          ) : (
            <Fragment>
              <Col span={24} offset={0}>
                <Avatar
                  className="slotSpellIcon"
                  size={55}
                  shape="square"
                  src={require(`../../../../../Data/SpellImages/${slotTwoData.imageName}.png`)}
                />
              </Col>
              <Col span={24} offset={0} className="slotSpellNameCol">
                <span className="slotSpellTitle">
                  {slotTwoData.skillData.name}
                </span>
                <div className="slotSpellNameBorder"></div>
              </Col>
            </Fragment>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotThreeData ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => setModalData({ show: true, slot: 3 })}
            />
          ) : (
            <Fragment>
              <Col span={24} offset={0}>
                <Avatar
                  className="slotSpellIcon"
                  size={55}
                  shape="square"
                  src={require(`../../../../../Data/SpellImages/${slotThreeData.imageName}.png`)}
                />
              </Col>
              <Col span={24} offset={0} className="slotSpellNameCol">
                <span className="slotSpellTitle">
                  {slotThreeData.skillData.name}
                </span>
                <div className="slotSpellNameBorder"></div>
              </Col>
            </Fragment>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotFourData ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => setModalData({ show: true, slot: 4 })}
            />
          ) : (
            <Fragment>
              <Col span={24} offset={0}>
                <Avatar
                  className="slotSpellIcon"
                  size={55}
                  shape="square"
                  src={require(`../../../../../Data/SpellImages/${slotFourData.imageName}.png`)}
                />
              </Col>
              <Col span={24} offset={0} className="slotSpellNameCol">
                <span className="slotSpellTitle">
                  {slotFourData.skillData.name}
                </span>
                <div className="slotSpellNameBorder"></div>
              </Col>
            </Fragment>
          )}
        </Col>
        <Col span={4} offset={0}>
          {!slotFiveData ? (
            <Icon
              className="addSpellIcon"
              type="plus-square"
              onClick={() => setModalData({ show: true, slot: 5 })}
            />
          ) : (
            <Fragment>
              <Col span={24} offset={0}>
                <Avatar
                  className="slotSpellIcon"
                  size={55}
                  shape="square"
                  src={require(`../../../../../Data/SpellImages/${slotFiveData.imageName}.png`)}
                />
              </Col>
              <Col span={24} offset={0} className="slotSpellNameCol">
                <span className="slotSpellTitle">
                  {slotFiveData.skillData.name}
                </span>
                <div className="slotSpellNameBorder"></div>
              </Col>
            </Fragment>
          )}
        </Col>
        <Col span={4} offset={0}>
          <Col span={24} offset={0}>
            {!slotSixData ? (
              <Icon
                className="addSpellIcon"
                type="plus-square"
                onClick={() => setModalData({ show: true, slot: 6 })}
              />
            ) : (
              <Fragment>
                <Col span={24} offset={0}>
                  <Avatar
                    className="slotSpellIcon"
                    size={55}
                    shape="square"
                    src={require(`../../../../../Data/SpellImages/${slotSixData.imageName}.png`)}
                  />
                </Col>
                <Col span={24} offset={0} className="slotSpellNameCol">
                  <span className="slotSpellTitle">
                    {slotSixData.skillData.name}
                  </span>
                  <div className="slotSpellNameBorder"></div>
                </Col>
              </Fragment>
            )}
          </Col>
        </Col>
      </Row>
      <SkillListModal
        modalVisible={modalData.show}
        skillSlot={modalData.slot}
        handleCloseModal={handleCloseModal}
        handleSkillSelected={handleSkillSelected}
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
