const modifierJSON = require("../Raw Data/modifierData.json");
const modifierRow = modifierJSON.Table.Row;
const fs = require("fs");

let cleanedModifiers;

const removeLoreElements = () => {
  const filteredModifiers = modifierRow.filter((rowObj) => {
    const { Cell } = rowObj;
    if (!Cell[0].Data.text.toLowerCase().includes("_lore")) {
      return true;
    }
    return false;
  });

  return (cleanedModifiers = filteredModifiers);
};

const makeModTuples = () => {
  let elemContainer = null;
  let invalidElems = [];

  const isIndexEven = (index) => {
    if (index === 0) {
      return true;
    }
    return index % 2 === 0;
  };

  let modTuples = [];

  cleanedModifiers.forEach((cellObj, index) => {
    console.log(index);
    const cellElem = cellObj.Cell;
    if (isIndexEven(index) && elemContainer === null) {
      console.log(`in for ${index}`);
      elemContainer = cellElem;
    } else if (
      !isIndexEven(index) &&
      `${elemContainer[0].Data.text}_desc` == cellObj.Cell[0].Data.text
    ) {
      const tupleObj = {
        modName: elemContainer[1].Data.text,
        modDesc: cellObj.Cell[1].Data.text,
      };
      modTuples.push(tupleObj);
      elemContainer = null;
    } else {
      invalidElems.push(cellElem);
      invalidElems.push(cellObj.Cell);
      elemContainer = null;
    }
  });

  console.log(modTuples);
  cleanedModifiers = modTuples;
};

removeLoreElements();
// console.log(cleanedModifiers);
makeModTuples();

if (!fs.existsSync("../Clean Data")) {
  fs.mkdirSync("../Clean Data");
}

fs.writeFileSync(
  "../Clean Data/cleanModifiers.json",
  JSON.stringify(cleanedModifiers, null, 2)
);
