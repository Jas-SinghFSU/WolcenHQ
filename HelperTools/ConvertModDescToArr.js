const skillData = require("../client/src/Data/GoF/built_passive_skills.json");
const fs = require("fs");

const newSkillsArr = [];

skillData.forEach(skill => {
  let modifierArr = [];

  skill.magicEffects.modifiers.forEach(mod => {
    const modDescArr = mod.HUDDesc.split(" ");

    modifierArr.push({
      ...mod,
      HUDDesc: modDescArr
    });
  });

  newSkillsArr.push({
    ...skill,
    magicEffects: {
      modifiers: modifierArr
    }
  });
});

fs.writeFileSync(
  "../client/src/Data/GoF/built_passive_skills.json",
  JSON.stringify(newSkillsArr, null, 2)
);
