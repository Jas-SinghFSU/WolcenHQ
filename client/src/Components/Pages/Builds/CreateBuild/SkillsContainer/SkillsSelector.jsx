import React, { useState } from "react";
import { Row } from "antd";
import SkillSlot from "./SkillSlot";
import { SkillListModal, SkillModModal } from "./SkillModals";
import { maxModifierLimit } from "../../../../Constants/constants";

const SkillsSelector = ({ slotData, setSlotDataCB }) => {
  const [modalData, setModalData] = useState({
    show: false,
    slot: null
  });
  const [modModalData, setModModalData] = useState({
    show: false,
    slot: null,
    modData: null
  });

  const handleCloseModal = () => {
    setModalData({ show: false, slot: null });
    setModModalData({ show: false, slot: null });
  };

  const getTotalModPoints = modifierData => {
    const totalModPoints = modifierData.reduce((modTotal, currentSkill) => {
      return currentSkill.cost + modTotal;
    }, 0);
    return totalModPoints;
  };

  const handleSkillSelected = (skillData, slot, imageName) => {
    if (![1, 2, 3, 4, 5, 6].includes(slot)) {
      return;
    }

    const slotName = `slot${slot}`;

    setModalData({ show: false, slot: null });
    if (!skillData) {
      return;
    }

    setSlotDataCB({
      ...slotData,
      [slotName]: { skillData, imageName, activeModifiers: [] }
    });
  };

  const handleModSelected = (modData, slot) => {
    if (![1, 2, 3, 4, 5, 6].includes(slot)) {
      return;
    }

    const slotName = `slot${slot}`;
    setModModalData({ show: false, slot: null });

    if (!modData) {
      return;
    }

    const newModTotal =
      modData.cost + getTotalModPoints(slotData[slotName].activeModifiers);

    if (newModTotal > maxModifierLimit) {
      return;
    }

    setSlotDataCB({
      ...slotData,
      [slotName]: {
        ...slotData[slotName],
        activeModifiers: modData
      }
    });
  };

  const handleModalData = (shouldShow, slotNum) => {
    setModalData({ show: shouldShow, slot: slotNum });
  };

  const handleModModalData = (shouldShow, slotNum, slotModifiers) => {
    setModModalData({
      show: shouldShow,
      slot: slotNum,
      modData: slotModifiers
    });
  };

  const removeSkillFromSlot = slotNum => {
    const slotName = `slot${slotNum}`;
    setSlotDataCB({
      ...slotData,
      [slotName]: null
    });
  };
  return (
    <div>
      <Row className="skillsSelectorRow">
        <SkillSlot
          slotData={slotData["slot1"]}
          slotNumber={1}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
          removeSkillFromSlot={removeSkillFromSlot}
        />
        <SkillSlot
          slotData={slotData["slot2"]}
          slotNumber={2}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
          removeSkillFromSlot={removeSkillFromSlot}
        />
        <SkillSlot
          slotData={slotData["slot3"]}
          slotNumber={3}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
          removeSkillFromSlot={removeSkillFromSlot}
        />
        <SkillSlot
          slotData={slotData["slot4"]}
          slotNumber={4}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
          removeSkillFromSlot={removeSkillFromSlot}
        />
        <SkillSlot
          slotData={slotData["slot5"]}
          slotNumber={5}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
          removeSkillFromSlot={removeSkillFromSlot}
        />
        <SkillSlot
          slotData={slotData["slot6"]}
          slotNumber={6}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
          removeSkillFromSlot={removeSkillFromSlot}
        />
      </Row>

      <SkillListModal
        modalVisible={modalData.show}
        skillSlot={modalData.slot}
        handleCloseModal={handleCloseModal}
        handleSkillSelected={handleSkillSelected}
        slotData={slotData}
      />
      <SkillModModal
        modalVisible={modModalData.show}
        skillSlot={modModalData.slot}
        handleCloseModal={handleCloseModal}
        handleModSelected={handleModSelected}
        modsList={modModalData.modData}
        slotData={slotData}
        getTotalModPoints={getTotalModPoints}
      />
    </div>
  );
};

export default SkillsSelector;
