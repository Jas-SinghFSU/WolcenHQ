import React from "react";
import ReactTooltip from "react-tooltip";

import { Row, Col, Avatar } from "antd";

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
            src={require(`../../Data/SpellImages/${imageName.toLowerCase()}.png`)}
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

export default SpellToolTip;
