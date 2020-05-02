const cleanedModifiers = require("../Clean Data/cleanModifiers.json");
const cleanSkills = require("../Clean Data/cleanSkills.json");

let combinedSkillMods = [];

cleanSkills.skills.forEach((skill) => {
  combinedSkillMods.push(...skill.modifiers);
});

let mapCombinedMods = new Map();

combinedSkillMods.forEach((mod) => {
  mapCombinedMods.set(mod.name.toLowerCase(), mod.name);
});

let modifierMap = new Map();

cleanedModifiers.forEach((mod) => {
  modifierMap.set(mod.modName.toLowerCase(), mod.modName);
});

modifierMap.forEach((value, key) => {
  if (!mapCombinedMods.get(key)) {
    console.log(`Couldn't find ${value}`);
  }
});
