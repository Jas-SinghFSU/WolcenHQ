import React, { useState } from "react";
import { Row } from "antd";
import SkillSlot from "./SkillSlot";
import { SkillListModal, SkillModModal } from "./SkillModals";
import { maxModifierLimit } from "../../../../Constants/constants";

const SkillsSelector = ({ slotData, setSlotDataCB }) => {
  const getTotalModPoints = modifierData => {
    const totalModPoints = modifierData.reduce((modTotal, currentSkill) => {
      return currentSkill.cost + modTotal;
    }, 0);
    return totalModPoints;
  };

  return (
    <div>
      <Row className="skillsSelectorRow">
        <SkillSlot
          slotData={slotData["slot1"]}
          slotNumber={1}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotData["slot2"]}
          slotNumber={2}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotData["slot3"]}
          slotNumber={3}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotData["slot4"]}
          slotNumber={4}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotData["slot5"]}
          slotNumber={5}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotData["slot6"]}
          slotNumber={6}
          getTotalModPoints={getTotalModPoints}
        />
      </Row>
    </div>
  );
};

export default SkillsSelector;
