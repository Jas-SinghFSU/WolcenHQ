import React, { useState } from "react";
import { Row } from "antd";
import SkillSlot from "./SkillSlot";
import modDescriptions from "../../../../../Data/Modifiers/modDescriptions.json";

const SkillsSelector = ({ slotData, setSlotDataCB }) => {
  const getTotalModPoints = (modifierData) => {
    const totalModPoints = modifierData.reduce((modTotal, currentSkill) => {
      return currentSkill.cost + modTotal;
    }, 0);
    return totalModPoints;
  };

  let modifierMap = new Map();

  modDescriptions.forEach((mod) => {
    modifierMap.set(mod.modName.toLowerCase(), mod.modDesc);
  });

  return (
    <div>
      <Row className="skillsSelectorRow">
        <SkillSlot
          slotData={slotData["slot1"]}
          slotNumber={1}
          getTotalModPoints={getTotalModPoints}
          modDescriptions={modifierMap}
        />
        <SkillSlot
          slotData={slotData["slot2"]}
          slotNumber={2}
          getTotalModPoints={getTotalModPoints}
          modDescriptions={modifierMap}
        />
        <SkillSlot
          slotData={slotData["slot3"]}
          slotNumber={3}
          getTotalModPoints={getTotalModPoints}
          modDescriptions={modifierMap}
        />
        <SkillSlot
          slotData={slotData["slot4"]}
          slotNumber={4}
          getTotalModPoints={getTotalModPoints}
          modDescriptions={modifierMap}
        />
        <SkillSlot
          slotData={slotData["slot5"]}
          slotNumber={5}
          getTotalModPoints={getTotalModPoints}
          modDescriptions={modifierMap}
        />
        <SkillSlot
          slotData={slotData["slot6"]}
          slotNumber={6}
          getTotalModPoints={getTotalModPoints}
          modDescriptions={modifierMap}
        />
      </Row>
    </div>
  );
};

export default SkillsSelector;
