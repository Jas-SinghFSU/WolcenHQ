const modifierData = require("../Clean Data/clean_skill_bonus_info.json");
const skillInfo = require("../Clean Data/clean_skill_id_to_info.json");
const skillTemplate = require("../Raw Data/skill_templates.json");

let unifiedSkills = [];

skillTemplate.MetaData.Spell.forEach(skill => {
  let skillObject = {
    id: skill.id,
    name: "",
    lore: "",
    description: "",
    magicEffects: skill.MagicEffects
  };

  const { magicEffects } = skillObject;

  /* Get the name for the skill */
  let skillName = "";
  if (skill.name !== "") {
    let filteredSkill = skillInfo.filter(kvp => {
      if (kvp.key === skill.name) {
        return true;
      }
    });

    if (filteredSkill.length <= 0) {
      console.log(`Couldn't find ${skill.name}`);
    }
    skillName = filteredSkill[0].value;

    skillObject.name = skillName;
  }

  /* Get the description for the skill */
  let skillDescription = "";
  if (skill.description !== "") {
    let filteredDescription = skillInfo.filter(kvp => {
      if (kvp.key === skill.description) {
        return true;
      }
    });

    if (filteredDescription.length <= 0) {
      console.log(`Couldn't find description for ${skill.name}`);
    }
    skillDescription = filteredDescription[0].value;
    skillObject.description = skillDescription;
  }

  /* Get the modifier data for the skill */

  // If only one modifier
  let modifiersObject;
  if (!Array.isArray(magicEffects.modifiers)) {
    let modifierDescription = modifierData.filter(modifier => {
      if (modifier.key === magicEffects.modifiers.HUDDesc) {
        return true;
      }
    });

    if (modifierDescription.length <= 0) {
      console.log(`Couldn't find description for ${skill.name}'s modifiers.`);
    }

    modifiersObject = {
      ...magicEffects.modifiers,
      HUDDesc: modifierDescription[0].value
    };
    skillObject.magicEffects.modifiers = [modifiersObject];
  }

  // If multiple modifiers
  else if (Array.isArray(magicEffects.modifiers)) {
    let modifiersData = [];

    magicEffects.modifiers.forEach(modifier => {
      let modifierDescription = modifierData.filter(modKvp => {
        if (modKvp.key === modifier.HUDDesc) {
          return true;
        }
      });

      if (modifierDescription.length <= 0) {
        console.log(`Couldn't find description for ${skill.name}'s modifiers.`);
      }

      modifiersData.push({
        ...modifier,
        HUDDesc: modifierDescription[0].value
      });
    });

    skillObject.magicEffects.modifiers = modifiersData;
  }

  unifiedSkills.push(skillObject);
});

console.log(unifiedSkills.length);
