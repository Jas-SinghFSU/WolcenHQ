const passiveSkills = require("../client/src/Data/GoF/datamined.json");
const fs = require("fs");

let aggregatedData = [];

passiveSkills.forEach(passive => {
  if (!passive.section) {
    return;
  }
  passive.section.forEach(section => {
    const { id, category, skills } = section;
    const sectionName = section.name;
    const sectionCategory = category;
    skills.forEach(skill => {
      const { category, name, description, lore, eims } = skill;

      aggregatedData.push({
        name,
        category,
        description,
        lore,
        sectionName,
        sectionCategory,
        sectionID: id,
        modifiers: eims
      });
    });
  });
});

fs.writeFileSync("./PassiveSkills.json", JSON.stringify(aggregatedData));
