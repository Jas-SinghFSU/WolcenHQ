import React, { Fragment } from "react";
import { Col, Avatar } from "antd";
import {
  MinusSquareOutlined,
  MinusSquareFilled,
  CloseSquareFilled,
} from "@ant-design/icons";

import SpellToolTip from "../SpellTooltip";

import "./style.css";

const SkillItem = (props) => {
  const { slotData, avatarSize, thin } = props;

  return (
    <div className="skillItemContainer">
      {!slotData ? (
        <CloseSquareFilled
          className="emptySpellIcon"
          style={{
            fontSize: `${avatarSize ? `${avatarSize}px` : "65px"}`,
            fontWeight: `${thin ? "300" : "regular"}`,
          }}
        />
      ) : (
        <Fragment>
          <Col span={24} offset={0}>
            <Avatar
              className="slotSpellIcon viewOnly"
              size={avatarSize ? avatarSize : 55}
              shape="square"
              src={require(`../../../Data/SpellImages/${slotData.imageName.toLowerCase()}.png`)}
              data-tip
              data-for={slotData.imageName}
            />
            <SpellToolTip
              skillName={slotData.skillData.name}
              imageName={slotData.imageName}
              skillDescription={slotData.skillData.description}
              skillType={slotData.skillData.type}
              skillUsableWith={slotData.skillData.usableWith}
              skillTags={slotData.skillData.skillTags}
              direction={"left"}
            />
          </Col>
        </Fragment>
      )}
    </div>
  );
};

const SkillContainer = (props) => {
  return (
    <div className="skillContainer">
      <SkillItem {...props} />
    </div>
  );
};

export default SkillContainer;
