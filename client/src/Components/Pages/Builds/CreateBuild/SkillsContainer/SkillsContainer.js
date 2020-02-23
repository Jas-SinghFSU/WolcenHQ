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

const SpellToolTip = props => {
  const {
    skillName,
    imageName,
    skillDescription,
    skillType,
    skillUsableWith,
    skillTags,
    direction
  } = props;
  return (
    <ReactTooltip
      className="spellTooltip"
      id={imageName}
      effect="float"
      place={direction || "right"}
    >
      <Row className="spellTooltipRow">
        <Col className="tooltipSpellNameCol" span={24} offset={0}>
          <span className="tooltipSpellName">{skillName}</span>
        </Col>
        <Col className="tooltipSpellIconCol" span={24} offset={0}>
          <Avatar
            className="spellIconAvatar"
            size={50}
            shape="square"
            src={require(`../../../../../Data/SpellImages/${imageName}.png`)}
          />
        </Col>
        <Col className="tooltipSpellDescriptionCol" span={24} offset={0}>
          <span className="tooltipSpellName">{skillDescription}</span>
        </Col>
        <Col className="tooltipSpellAttackCol" span={24} offset={0}>
          <span
            className="tooltipAttackLabel"
            style={
              skillType.includes("staff")
                ? { color: "rgb(166, 118, 255)" }
                : { color: "rgb(207, 134, 51)" }
            }
          >
            {skillType.includes("staff") ? "Spell: " : "Attack: "}
          </span>
          {skillUsableWith.includes("melee") ? (
            <span>Only usable with melee weapons.</span>
          ) : (
            <span>{`Only usable with ${skillUsableWith.join(", ")}.`}</span>
          )}
        </Col>
        <Col className="tooltipSpellTagsCol" span={24} offset={0}>
          <span
            style={{ color: "rgb(110, 156, 255)" }}
            className="tooltipSpellTags"
          >
            {"Skill Tags: "}
          </span>
          <span>{skillTags.join(", ")}</span>
        </Col>
      </Row>
    </ReactTooltip>
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
                <SpellToolTip
                  skillName={skill.name}
                  imageName={imageName}
                  skillDescription={skill.description}
                  skillType={skill.type}
                  skillUsableWith={skill.usableWith}
                  skillTags={skill.skillTags}
                />
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
                  data-tip
                  data-for={slotOneData.imageName}
                />
                <SpellToolTip
                  skillName={slotOneData.skillData.name}
                  imageName={slotOneData.imageName}
                  skillDescription={slotOneData.skillData.description}
                  skillType={slotOneData.skillData.type}
                  skillUsableWith={slotOneData.skillData.usableWith}
                  skillTags={slotOneData.skillData.skillTags}
                  direction={"top"}
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
                  data-tip
                  data-for={slotTwoData.imageName}
                />
                <SpellToolTip
                  skillName={slotTwoData.skillData.name}
                  imageName={slotTwoData.imageName}
                  skillDescription={slotTwoData.skillData.description}
                  skillType={slotTwoData.skillData.type}
                  skillUsableWith={slotTwoData.skillData.usableWith}
                  skillTags={slotTwoData.skillData.skillTags}
                  direction={"top"}
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
                  data-tip
                  data-for={slotThreeData.imageName}
                />
                <SpellToolTip
                  skillName={slotThreeData.skillData.name}
                  imageName={slotThreeData.imageName}
                  skillDescription={slotThreeData.skillData.description}
                  skillType={slotThreeData.skillData.type}
                  skillUsableWith={slotThreeData.skillData.usableWith}
                  skillTags={slotThreeData.skillData.skillTags}
                  direction={"top"}
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
                  data-tip
                  data-for={slotFourData.imageName}
                />
                <SpellToolTip
                  skillName={slotFourData.skillData.name}
                  imageName={slotFourData.imageName}
                  skillDescription={slotFourData.skillData.description}
                  skillType={slotFourData.skillData.type}
                  skillUsableWith={slotFourData.skillData.usableWith}
                  skillTags={slotFourData.skillData.skillTags}
                  direction={"top"}
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
                  data-tip
                  data-for={slotFiveData.imageName}
                />
                <SpellToolTip
                  skillName={slotFiveData.skillData.name}
                  imageName={slotFiveData.imageName}
                  skillDescription={slotFiveData.skillData.description}
                  skillType={slotFiveData.skillData.type}
                  skillUsableWith={slotFiveData.skillData.usableWith}
                  skillTags={slotFiveData.skillData.skillTags}
                  direction={"top"}
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
                    data-tip
                    data-for={slotSixData.imageName}
                  />
                  <SpellToolTip
                    skillName={slotSixData.skillData.name}
                    imageName={slotSixData.imageName}
                    skillDescription={slotSixData.skillData.description}
                    skillType={slotSixData.skillData.type}
                    skillUsableWith={slotSixData.skillData.usableWith}
                    skillTags={slotSixData.skillData.skillTags}
                    direction={"top"}
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
