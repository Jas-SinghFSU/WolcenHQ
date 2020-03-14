/* This takes the data from skill_id_to_info.json and converts it to a nice key value pair array */
let skillIDInfo = require("../Raw Data/skill_id_to_info.json");
let skillModInfo = require("../Raw Data/skill_bonus_info.json");
const fs = require("fs");

skillIDInfo = skillIDInfo.Row;
skillModInfo = skillModInfo.Row;

let cleanSkillData = [];
let cleanSkillModInfo = [];

skillIDInfo.forEach(skill => {
  if (
    Array.isArray(skill.Cell) &&
    skill.Cell.length >= 2 &&
    Object.prototype.hasOwnProperty.call(skill.Cell[1], "Data") &&
    Object.prototype.hasOwnProperty.call(skill.Cell[0], "Data") &&
    Object.prototype.hasOwnProperty.call(skill.Cell[1].Data, "skill") &&
    Object.prototype.hasOwnProperty.call(skill.Cell[0].Data, "skill") &&
    !skill.Cell[0].Data.skill.includes("_lore")
  ) {
    const kvpObject = {
      key: skill.Cell[0].Data.skill,
      value: skill.Cell[1].Data.skill
    };
    cleanSkillData.push(kvpObject);
  }
});

skillModInfo.forEach(skill => {
  if (
    Array.isArray(skill.Cell) &&
    skill.Cell.length >= 2 &&
    Object.prototype.hasOwnProperty.call(skill.Cell[1], "Data") &&
    Object.prototype.hasOwnProperty.call(skill.Cell[0], "Data") &&
    Object.prototype.hasOwnProperty.call(skill.Cell[1].Data, "skill") &&
    Object.prototype.hasOwnProperty.call(skill.Cell[0].Data, "skill")
  ) {
    const kvpObject = {
      key: skill.Cell[0].Data.skill,
      value: skill.Cell[1].Data.skill
    };
    cleanSkillModInfo.push(kvpObject);
  }
});

if (!fs.existsSync("../Clean Data")) {
  fs.mkdirSync("../Clean Data");
}

fs.writeFileSync(
  "../Clean Data/clean_skill_id_to_info.json",
  JSON.stringify(cleanSkillData, null, 2)
);

fs.writeFileSync(
  "../Clean Data/clean_skill_bonus_info.json",
  JSON.stringify(cleanSkillModInfo, null, 2)
);
