const skillData = require("../client/src/Data/GoF/built_passive_skills.json");
const fs = require("fs");

let newSkillData = [];

skillData.map(skill => {
  let modifierArr = [];

  skill.magicEffects.modifiers.forEach(mod => {
    let modValuesArr = Object.values(mod.Semantics);
    let modKeysArr = Object.keys(mod.Semantics);

    let descriptionArray = mod.HUDDesc.split(" ");

    descriptionArray = descriptionArray.map(word => {
      if (word.includes("%")) {
        let wordToArr = [...word];
        wordToArr.shift();

        let modValIndex = wordToArr[0];
        modValIndex = parseInt(modValIndex, 10);

        let valReplacement;

        if (modValIndex <= modValuesArr.length) {
          valReplacement = modValuesArr[modValIndex - 1];
        } else {
          valReplacement = "Unknown";
        }

        if (
          modValIndex <= modKeysArr.length &&
          modKeysArr[modValIndex - 1]
            .toString()
            .toLowerCase()
            .includes("percent")
        ) {
          valReplacement = `${valReplacement}%`;
        }

        if (modValIndex <= modKeysArr.length && !valReplacement.includes("-")) {
          valReplacement = `+${valReplacement}`;
        }

        wordToArr.shift();
        wordToArr.unshift(valReplacement);

        return `{${wordToArr.join("")}}`;
      } else {
        return word;
      }
    });

    let newDescription = descriptionArray.join(" ");

    modifierArr.push({
      ...mod,
      HUDDesc: newDescription
    });
  });

  newSkillData.push({
    ...skill,
    magicEffects: {
      modifiers: modifierArr
    }
  });
});

fs.writeFileSync(
  "../client/src/Data/GoF/built_passive_skills.json",
  JSON.stringify(newSkillData, null, 2)
);
