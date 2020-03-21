import React, { Fragment } from "react";
import { Avatar, Icon, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import SpellToolTip from "../../../../Shared/SpellTooltip";
import ReactTooltip from "react-tooltip";

const maxModifierLimit = 10;

const SkillSlot = props => {
  const {
    slotData,
    slotNumber,
    handleModalData,
    handleModModalData,
    getTotalModPoints,
    removeSkillFromSlot
  } = props;

  return (
    <Col span={4} offset={0}>
      {!slotData ? (
        <Icon
          className="addSpellIcon"
          type="plus-square"
          onClick={() => handleModalData(true, slotNumber)}
        />
      ) : (
        <Fragment>
          <Col span={24} offset={0}>
            <Avatar
              className="slotSpellIcon"
              size={55}
              shape="square"
              src={require(`../../../../../Data/SpellImages/${slotData.imageName.toLowerCase()}.png`)}
              data-tip
              data-for={slotData.imageName}
              onClick={() => removeSkillFromSlot(slotNumber)}
            />
            <SpellToolTip
              skillName={slotData.skillData.name}
              imageName={slotData.imageName}
              skillDescription={slotData.skillData.description}
              skillType={slotData.skillData.type}
              skillUsableWith={slotData.skillData.usableWith}
              skillTags={slotData.skillData.skillTags}
              direction={"top"}
            />
          </Col>
          <Col span={24} offset={0} className="slotSpellNameCol">
            <span className="slotSpellTitle">{slotData.skillData.name}</span>
            <div className="slotSpellNameBorder"></div>
          </Col>
          <Col span={24} offset={0} className="slotSpellModCountCol">
            <span className="slotSpellModCount">
              {`Skill Modifiers: ${
                slotData.activeModifiers.length > 0
                  ? getTotalModPoints(slotData.activeModifiers)
                  : "0"
              }/${maxModifierLimit}`}
            </span>
          </Col>
          <Col
            span={22}
            offset={1}
            className="addModContainer"
            onClick={() => {
              handleModModalData(
                true,
                slotNumber,
                slotData.skillData.modifiers
              );
            }}
          >
            {slotData.activeModifiers.length > 0 ? (
              <Icon type="edit" />
            ) : (
              <Icon type="plus" />
            )}
          </Col>
          {slotData.activeModifiers.map((mod, index) => {
            return (
              <Col key={index} span={22} offset={1} className="selectedModsCol">
                <span className="selectedModSpan">{mod.name}</span>
              </Col>
            );
          })}
        </Fragment>
      )}
    </Col>
  );
};

export default SkillSlot;
