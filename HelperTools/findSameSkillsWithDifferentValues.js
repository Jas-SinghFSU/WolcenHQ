const passiveSkills = require("../client/src/Data/GoF/built_passive_skills.json");

passiveSkills.forEach((skill, index1) => {
  let isFound = false;
  passiveSkills.forEach((skill2, index2) => {
    if (
      skill.name === skill2.name &&
      skill.magicEffects.modifiers[0].HUDDesc !==
        skill2.magicEffects.modifiers[0].HUDDesc
    ) {
      // console.log(skill.name);
    }

    if (skill.name === skill2.name && index1 !== index2) {
      isFound = true;
    }
  });

  if (isFound) {
    console.log(skill.name);
  }
});
