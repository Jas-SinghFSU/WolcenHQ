import React, { useState } from "react";
import { Row } from "antd";
import SkillSlot from "./SkillSlot";
import { SkillListModal, SkillModModal } from "./SkillModals";

const maxModifierLimit = 10;

const SkillsSelector = () => {
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
    setModalData({ show: false, slot: null });
    if (!skillData) {
      return;
    }
    switch (slot) {
      case 1:
        setSlotOneData({ skillData, imageName, activeModifiers: [] });
        break;
      case 2:
        setSlotTwoData({ skillData, imageName, activeModifiers: [] });
        break;
      case 3:
        setSlotThreeData({ skillData, imageName, activeModifiers: [] });
        break;
      case 4:
        setSlotFourData({ skillData, imageName, activeModifiers: [] });
        break;
      case 5:
        setSlotFiveData({ skillData, imageName, activeModifiers: [] });
        break;
      case 6:
        setSlotSixData({ skillData, imageName, activeModifiers: [] });
        break;

      default:
        break;
    }
  };

  const handleModSelected = (modData, slot) => {
    setModModalData({ show: false, slot: null });
    let newModTotal;
    if (!modData) {
      return;
    }
    switch (slot) {
      case 1:
        newModTotal =
          modData.cost + getTotalModPoints(slotOneData.activeModifiers);
        if (newModTotal > maxModifierLimit) {
          return;
        }
        setSlotOneData({
          ...slotOneData,
          activeModifiers: [...slotOneData.activeModifiers, modData]
        });
        break;
      case 2:
        newModTotal =
          modData.count + getTotalModPoints(slotTwoData.activeModifiers);
        if (newModTotal > maxModifierLimit) {
          return;
        }
        setSlotTwoData({
          ...slotTwoData,
          activeModifiers: [...slotTwoData.activeModifiers, modData]
        });
        break;
      case 3:
        newModTotal =
          modData.count + getTotalModPoints(slotThreeData.activeModifiers);
        if (newModTotal > maxModifierLimit) {
          return;
        }
        setSlotThreeData({
          ...slotThreeData,
          activeModifiers: [...slotThreeData.activeModifiers, modData]
        });
        break;
      case 4:
        newModTotal =
          modData.count + getTotalModPoints(slotFourData.activeModifiers);
        if (newModTotal > maxModifierLimit) {
          return;
        }
        setSlotFourData({
          ...slotFourData,
          activeModifiers: [...slotFourData.activeModifiers, modData]
        });
        break;
      case 5:
        newModTotal =
          modData.count + getTotalModPoints(slotFiveData.activeModifiers);
        if (newModTotal > maxModifierLimit) {
          return;
        }
        setSlotFiveData({
          ...slotFiveData,
          activeModifiers: [...slotFiveData.activeModifiers, modData]
        });
        break;
      case 6:
        newModTotal =
          modData.count + getTotalModPoints(slotSixData.activeModifiers);
        if (newModTotal > maxModifierLimit) {
          return;
        }
        setSlotSixData({
          ...slotSixData,
          activeModifiers: [...slotSixData.activeModifiers, modData]
        });
        break;

      default:
        break;
    }
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

  return (
    <div>
      <Row className="skillsSelectorRow">
        <SkillSlot
          slotData={slotOneData}
          slotNumber={1}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotTwoData}
          slotNumber={2}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotThreeData}
          slotNumber={3}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotFourData}
          slotNumber={4}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotFiveData}
          slotNumber={5}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
        />
        <SkillSlot
          slotData={slotSixData}
          slotNumber={6}
          handleModalData={handleModalData}
          handleModModalData={handleModModalData}
          getTotalModPoints={getTotalModPoints}
        />
      </Row>

      <SkillListModal
        modalVisible={modalData.show}
        skillSlot={modalData.slot}
        handleCloseModal={handleCloseModal}
        handleSkillSelected={handleSkillSelected}
      />
      <SkillModModal
        modalVisible={modModalData.show}
        skillSlot={modModalData.slot}
        handleCloseModal={handleCloseModal}
        handleModSelected={handleModSelected}
        modsList={modModalData.modData}
      />
    </div>
  );
};

export default SkillsSelector;
