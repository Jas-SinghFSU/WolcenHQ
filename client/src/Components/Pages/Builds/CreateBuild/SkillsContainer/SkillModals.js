import React, { useState, useEffect, Fragment } from "react";
import { Modal, Col, Row, Avatar } from "antd";

import SpellToolTip from "../../../../Shared/SpellTooltip";

const spellData = require("../../../../../Data/Skills.json");

const SkillListModal = props => {
  const {
    modalVisible,
    handleCloseModal,
    handleSkillSelected,
    skillSlot,
    takenSkills
  } = props;

  const [skillList] = useState(spellData.skills);
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
                    if (!takenSkills.includes(skill.name)) {
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
                        takenSkills.includes(skill.name)
                          ? "skillBlockTaken"
                          : imageName === skillSelected
                          ? "skillBlockSelected"
                          : ""
                      }`}
                    >
                      <Avatar
                        className={`spellIconAvatar ${
                          takenSkills.includes(skill.name)
                            ? "spellIconAvatarTaken"
                            : ""
                        }`}
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

const SkillModModal = props => {
  const {
    modalVisible,
    handleCloseModal,
    handleModSelected,
    skillSlot,
    modsList
  } = props;

  const [modList, setModList] = useState(modsList);
  const [modSelected, setModSelected] = useState(null);
  const [modData, setModData] = useState(null);

  useEffect(() => {
    setModSelected(null);
    setModData(null);
  }, [modalVisible]);

  useEffect(() => {
    setModList(modsList);
  }, [modsList]);

  return (
    <div>
      <Modal
        title="Choose a modifier"
        visible={modalVisible}
        onOk={() => handleModSelected(modData, skillSlot)}
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
                      setModSelected(mod.name);
                      setModData(mod);
                    }}
                    data-tip
                    data-for={mod.name}
                  >
                    <Fragment>
                      <div
                        className={`modBlock ${
                          mod.name === modSelected ? "modBlockSelected" : ""
                        }`}
                      >
                        <span className="modNameSpan">{mod.name}</span>
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
