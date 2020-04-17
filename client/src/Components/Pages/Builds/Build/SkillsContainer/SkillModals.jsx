import React, { useState, useEffect, Fragment } from "react";
import { Modal, Col, Row, Avatar } from "antd";
import { maxModifierLimit } from "../../../../Constants/constants";

import SpellToolTip from "../../../../Shared/SpellTooltip";

const spellData = require("../../../../../Data/Skills.json");

const SkillListModal = props => {
  const {
    modalVisible,
    handleCloseModal,
    handleSkillSelected,
    skillSlot,
    slotData
  } = props;

  const [skillList] = useState(spellData.skills);
  const [skillSelected, setSkillSelected] = useState(null);
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    setSkillSelected(null);
    setSkillData(null);
  }, [modalVisible]);

  const isSkillTaken = skillName => {
    if (skillSlot) {
      let isFound = false;
      for (let i = 1; i <= 6; i += 1) {
        const slotName = `slot${i}`;
        if (
          slotData[slotName] !== null &&
          slotData[slotName].skillData.name === skillName
        ) {
          isFound = true;
        }
      }
      return isFound;
    }
  };
  return (
    <div>
      <Modal
        title="Choose a skill"
        visible={modalVisible}
        onOk={() => handleSkillSelected(skillData, skillSlot, skillSelected)}
        onCancel={handleCloseModal}
        destroyOnClose={true}
        okButtonProps={{ disabled: !skillData ? true : false }}
      >
        <Row className="modalSkillsRow">
          {skillList.map((skill, index) => {
            let imageName = skill.name.replace(/(\s)/g, "_");
            imageName = imageName.replace(/["']/g, "");
            return (
              <Fragment key={index}>
                <Col
                  className={"modalSkillsCol"}
                  onClick={() => {
                    if (!isSkillTaken(skill.name)) {
                      setSkillSelected(imageName);
                      setSkillData(skill);
                    }
                  }}
                  data-tip
                  data-for={imageName}
                >
                  <Fragment>
                    <div
                      className={`skillBlock ${
                        isSkillTaken(skill.name)
                          ? "skillBlockTaken"
                          : imageName === skillSelected
                          ? "skillBlockSelected"
                          : ""
                      }`}
                    >
                      <Avatar
                        className={`spellIconAvatar ${
                          isSkillTaken(skill.name) ? "spellIconAvatarTaken" : ""
                        }`}
                        size={40}
                        shape="square"
                        src={require(`../../../../../Data/SpellImages/${imageName.toLowerCase()}.png`)}
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

const SkillModModal = props => {
  const {
    modalVisible,
    handleCloseModal,
    handleModSelected,
    skillSlot,
    modsList,
    slotData
  } = props;

  const [modList, setModList] = useState(modsList);
  const [modSelected, setModSelected] = useState([]);

  useEffect(() => {
    getModsForSkillSlot();
  }, [modalVisible]);

  useEffect(() => {
    setModList(modsList);
  }, [modsList]);

  const getModsForSkillSlot = () => {
    if (skillSlot) {
      const slotName = `slot${skillSlot}`;

      setModSelected(slotData[slotName].activeModifiers);
    }
  };

  const havePoints = modInfo => {
    if (skillSlot) {
      const curModTotal = modSelected.reduce((modSum, modData) => {
        return modData.cost + modSum;
      }, 0);

      const newModTotal = curModTotal + modInfo.cost;
      if (newModTotal > maxModifierLimit) {
        return false;
      }
      return true;
    }
  };

  const handleModClicked = modInfo => {
    const modsInList = modSelected.map(mod => mod.name);

    if (modsInList.includes(modInfo.name)) {
      const newModList = modSelected.filter(mod => mod.name !== modInfo.name);

      setModSelected(newModList);
      return;
    }
    setModSelected([...modSelected, modInfo]);
    return;
  };

  return (
    <div>
      <Modal
        title="Choose a modifier"
        visible={modalVisible}
        onOk={() => handleModSelected(modSelected, skillSlot)}
        onCancel={handleCloseModal}
        destroyOnClose={true}
      >
        <Row className="modalModsRow">
          {modList &&
            modList.map((mod, index) => {
              return (
                <Fragment key={index}>
                  <Col
                    className="modalModCol"
                    onClick={() => {
                      if (havePoints(mod) || modSelected.includes(mod)) {
                        handleModClicked(mod);
                      }
                    }}
                    data-tip
                    data-for={mod.name}
                  >
                    <Fragment>
                      <div
                        className={`modBlock ${
                          modSelected.includes(mod)
                            ? "modBlockSelected"
                            : !havePoints(mod)
                            ? "modBlockUnavailable"
                            : ""
                        }`}
                      >
                        <span className="modNameSpan">{`${mod.cost} ${mod.name}`}</span>
                      </div>
                    </Fragment>
                  </Col>
                </Fragment>
              );
            })}
        </Row>
      </Modal>
    </div>
  );
};

export { SkillModModal, SkillListModal };
