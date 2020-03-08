import * as d3 from "d3";

const svgData = require("../../../../../Data/GoF/output.json");
const MARGIN = {
  TOP: 10,
  BOTTOM: 50,
  LEFT: 70,
  RIGHT: 10
};

export default class GoF {
  constructor(element) {
    const init = async () => {
      /* Create the SVG canvas */
      const svg = d3
        .select(element.current)
        .append("svg")
        .attr("width", 1044)
        .attr("height", 1044)
        .attr("viewBox", "0 0 1044 1044");

      const getDataFromUrl = async () => {
        try {
          const returnData = await d3.json(
            "../../../../../Data/GoF/output.json"
          );
          return returnData;
        } catch (error) {
          console.log(error);
          return {};
        }
      };
      console.log(JSON.stringify(svgData, null, 2));

      const gElem = svg
        .selectAll("g")
        .data(svgData.svg.g)
        .join(
          enter => enter.append("g").attr("id", data => data.id),
          // .selectAll("path")
          // .data(data => data.path)
          // .enter()
          // .append("path")
          // .attr("class", dataPath => dataPath.class)
          // .attr("d", dataPath => dataPath.d)
          // .attr("transform", dataPath => dataPath.transform)
          // .data(data => data.line)
          // .enter()
          // .append("line")
          // .attr("class", dataLine => {
          //   console.log(dataLine);
          //   return dataLine.class;
          // })
          // .attr("x1", dataLine => dataLine.x1)
          // .attr("y1", dataLine => dataLine.y1)
          // .attr("x2", dataLine => dataLine.x2)
          // .attr("y2", dataLine => dataLine.y2),
          update => update.attr("class", "updated"),
          exist => exist.remove()
        );

      const pathElem = gElem
        .selectAll("path")
        .data(data => data.path)
        .enter()
        .append("path")
        .attr("class", dataPath => dataPath.class)
        .attr("d", dataPath => dataPath.d)
        .attr("transform", dataPath => dataPath.transform)
        .data(data => data.line);

      const lineElem = gElem
        .selectAll("line")
        .data(data => data.line)
        .enter()
        .append("line")
        .attr("class", dataLine => dataLine.class)
        .attr("x1", dataLine => dataLine.x1)
        .attr("y1", dataLine => dataLine.y1)
        .attr("x2", dataLine => dataLine.x2)
        .attr("y2", dataLine => dataLine.y2);

      const nodeElem = gElem
        .selectAll("circle")
        .data(data => data.circle)
        .enter()
        .append("circle")
        .attr("class", dataNode => dataNode.class)
        .attr("id", dataNode => dataNode.id)
        .attr("cx", dataNode => dataNode.cx)
        .attr("cy", dataNode => dataNode.cy)
        .attr("r", dataNode => dataNode.r)
        .attr("transform", dataNode => dataNode.transform || "none")
        .style("fill", dataNode => {
          if (dataNode.id && dataNode.id.includes("-r")) {
            return "rgb(57, 0, 0)";
          } else if (dataNode.id && dataNode.id.includes("-g")) {
            return "#350035";
          } else if (dataNode.id && dataNode.id.includes("-p")) {
            return "#030";
          }
        });
      console.log(pathElem);
    };

    init();
  }
}
