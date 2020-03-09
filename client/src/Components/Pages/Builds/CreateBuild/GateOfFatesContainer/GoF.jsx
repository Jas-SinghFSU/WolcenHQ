import * as d3 from "d3";

const svgData = require("../../../../../Data/GoF/output.json");
const MARGIN = {
  TOP: 10,
  BOTTOM: 50,
  LEFT: 70,
  RIGHT: 10
};

const ringInner = 350;
const ringMiddle = 700;
const ringOuter = 1044;
let linkElems = require("../../../../../Data/GoF/nodeLinks.json");

// rotation
// style="transition: all 1s ease 0s; transform-origin: 522px 522px 0px; transform: rotate(120deg);"

export default class GoF {
  constructor(element) {
    const init = async () => {
      console.log("init");
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

      let tooltip = d3
        .select(element.current)
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "yellow")
        .style("color", "black")
        .text("a simple tooltip");

      const getAllNodes = () => {
        let nodeMap = new Map();

        svgData.svg.g.forEach(group => {
          group.circle.forEach(circle => {
            const { cx, cy, r } = circle;
            nodeMap.set(circle.id, {
              cx,
              cy,
              r,
              class: circle.class
            });
          });
        });

        return nodeMap;
      };

      const allNodes = getAllNodes();

      const gElem = svg
        .selectAll("g")
        .data(svgData.svg.g)
        .join(
          enter => enter.append("g").attr("id", data => data.id),
          update => update.attr("class", "updated"),
          exist => exist.remove()
        );

      const wheelBG = gElem
        .selectAll("image")
        .data(data => data.scope)
        .enter()
        .append("svg:image")
        .attr("xlink:href", data => {
          if (data.current == "outerRing") {
            return require("../../../../../images/Outer_Ring.png");
          }
          if (data.current == "innerRing") {
            return require("../../../../../images/Inner_Ring.png");
          }
          if (data.current == "middleRing") {
            return require("../../../../../images/Middle_Ring.png");
          }
        })
        .attr("height", data => {
          if (data.current == "outerRing") {
            return ringOuter;
          }
          if (data.current == "innerRing") {
            return ringInner;
          }
          if (data.current == "middleRing") {
            return ringMiddle;
          }
        })
        .attr("width", data => {
          if (data.current == "outerRing") {
            return ringOuter;
          }
          if (data.current == "innerRing") {
            return ringInner;
          }
          if (data.current == "middleRing") {
            return ringMiddle;
          }
        })
        .attr("x", data => {
          if (data.current == "outerRing") {
            return (1044 - ringOuter) / 2;
          }
          if (data.current == "innerRing") {
            return (1044 - ringInner) / 2;
          }
          if (data.current == "middleRing") {
            return (1044 - ringMiddle) / 2;
          }
        })
        .attr("y", data => {
          if (data.current == "outerRing") {
            return (1044 - ringOuter) / 2;
          }
          if (data.current == "innerRing") {
            return (1044 - ringInner) / 2;
          }
          if (data.current == "middleRing") {
            return (1044 - ringMiddle) / 2;
          }
        });

      // const lineElem = gElem
      //   .selectAll("line")
      //   .data(data => data.line)
      //   .enter()
      //   .append("line")
      //   .attr("class", dataLine => dataLine.class)
      //   .attr("x1", dataLine => dataLine.x1)
      //   .attr("y1", dataLine => dataLine.y1)
      //   .attr("x2", dataLine => dataLine.x2)
      //   .attr("y2", dataLine => dataLine.y2);

      const linkElem = gElem
        .selectAll(null)
        .data(linkElems)
        .enter()
        .append("line")
        .attr("class", dataLine => dataLine.isActive)
        .attr("x1", dataLine => {
          if (allNodes.get(dataLine.source))
            return allNodes.get(dataLine.source).cx;
        })
        .attr("y1", dataLine => {
          if (allNodes.get(dataLine.source))
            return allNodes.get(dataLine.source).cy;
        })
        .attr("x2", dataLine => {
          if (allNodes.get(dataLine.destination))
            return allNodes.get(dataLine.destination).cx;
        })
        .attr("y2", dataLine => {
          if (allNodes.get(dataLine.destination))
            return allNodes.get(dataLine.destination).cy;
        })
        .style("stroke", "grey");

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
            return "#030";
          } else if (dataNode.id && dataNode.id.includes("-p")) {
            return "#350035";
          }
        })
        .on("mouseover", function(data) {
          tooltip.text(data.id);
          return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
          return tooltip
            .style("top", d3.event.pageY - 700 + "px")
            .style("left", d3.event.pageX - 400 + "px");
        })
        .on("mouseout", function() {
          return tooltip.style("visibility", "hidden");
        });
    };

    init();
  }
}
