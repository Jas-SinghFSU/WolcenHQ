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

      /* --------------------------------------*/
      /* ------- Create the SVG canvas ------- */
      /* --------------------------------------*/
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

      /* ---------------------------------------*/
      /* Create the hover tooltip for node info */
      /* ---------------------------------------*/
      let tooltip = d3
        .select(element.current)
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "yellow")
        .style("color", "black")
        .text("a simple tooltip");

      /* -----------------------------------------*/
      /* --- Construct a map of all the nodes --- */
      /* -----------------------------------------*/
      const getAllNodes = () => {
        let nodeMap = new Map();

        svgData.svg.g.forEach(group => {
          group.circle.forEach(circle => {
            const { cx, cy, r } = circle;
            nodeMap.set(circle.id, {
              name: circle.id,
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

      /* ------------------------------------------*/
      /* -- Create a svg group for the 3 layers -- */
      /* ------------------------------------------*/

      const gElem = svg
        .selectAll("g")
        .data(svgData.svg.g)
        .join(
          enter =>
            enter
              .append("g")
              .attr("id", data => data.id)
              .attr(
                "style",
                "transition: all 1s ease 0s; transform-origin: 522px 522px 0px; transform: rotate(0deg);"
              ),
          update => update.attr("class", "updated"),
          exist => exist.remove()
        );

      /* -----------------------------------------*/
      /* Append a background rings for each layer */
      /* -----------------------------------------*/
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

      /* ---------------------------------------------*/
      /* -------- Divide node dataset by ring ------- */
      /* ---------------------------------------------*/

      const innerNodes = new Map();
      const outerNodes = new Map();
      const middleNodes = new Map();

      allNodes.forEach((node, key) => {
        if (node.name.includes("-o")) {
          outerNodes.set(key, node);
        } else if (node.name.includes("-m")) {
          middleNodes.set(key, node);
        } else {
          innerNodes.set(key, node);
        }
      });

      /* -------------------------------------------*/
      /* --- Create link elements for each nodes -- */
      /* -------------------------------------------*/
      const filteredLinks = filterElem => {
        if (filterElem === "") {
          return linkElems.filter(elem => {
            if (
              !elem.source.includes("-o") &&
              !elem.source.includes("-m") &&
              elem.source !== ""
            ) {
              return true;
            }
          });
        } else if (filterElem !== null) {
          return linkElems.filter(elem => {
            if (elem.source.includes(filterElem)) {
              return true;
            }
          });
        } else {
          return null;
        }
      };
      // const appendLinesToAppropriateScope = (d3Elem, ring) => {
      //   const nodeMap =
      //     ring == "outerRing"
      //       ? outerNodes
      //       : ring == "innerRing"
      //       ? innerNodes
      //       : ring == "middleRing"
      //       ? middleNodes
      //       : [];
      //   if (d3Elem.__data__.current == ring) {
      //     d3.select(d3Elem)
      //       .selectAll(null)
      //       .data(d => {
      //         console.log(d);
      //       })
      //       .enter()
      //       .append("line")
      //       .attr("x1", d => {
      //         if (nodeMap.get(d.source)) {
      //           return nodeMap.get(d.source).cx || null;
      //         }
      //       })
      //       .attr("y1", d => {
      //         if (nodeMap.get(d.source))
      //           return nodeMap.get(d.source).cy || null;
      //       })
      //       .attr("x2", d => {
      //         if (nodeMap.get(d.destination))
      //           return nodeMap.get(d.destination).cx || null;
      //       })
      //       .attr("y2", d => {
      //         if (nodeMap.get(d.destination))
      //           return nodeMap.get(d.destination).cy || null;
      //       })
      //       .attr("id", d => {
      //         const link1 = `${d.destination}-${d.source}`;
      //         const link2 = `${d.source}-${d.destination}`;
      //         return `${link1} ${link2}`;
      //       })
      //       .style("stroke", "grey");
      //   }
      // };

      const linkElem = gElem
        .selectAll(null)
        .data(data => data.scope)
        .enter()
        .each(function(d, i) {
          d3.select(this)
            .selectAll(null)
            .data(d => {
              console.log(d);
              const elemFilter =
                d.current == "outerRing"
                  ? "-o"
                  : d.current == "innerRing"
                  ? ""
                  : d.current == "middleRing"
                  ? "-m"
                  : null;
              const filteredData = filteredLinks(elemFilter);
              console.log(filteredData);
              return filteredData;
            })
            .enter()
            .append("line")
            .attr("x1", d => {
              if (allNodes.get(d.source)) {
                return allNodes.get(d.source).cx || null;
              }
            })
            .attr("y1", d => {
              if (allNodes.get(d.source))
                return allNodes.get(d.source).cy || null;
            })
            .attr("x2", d => {
              if (allNodes.get(d.destination))
                return allNodes.get(d.destination).cx || null;
            })
            .attr("y2", d => {
              if (allNodes.get(d.destination))
                return allNodes.get(d.destination).cy || null;
            })
            .attr("id", d => {
              const link1 = `${d.destination}-${d.source}`;
              const link2 = `${d.source}-${d.destination}`;
              return `${link1} ${link2}`;
            })
            .style("stroke", "grey");
        });

      /* ------------------------------------------*/
      /* - Define the radial gradients for nodes - */
      /* ------------------------------------------*/

      const radialGradientRed = svg
        .append("defs")
        .append("radialGradient")
        .attr("id", "radial-gradient-red");

      radialGradientRed
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#7a0000");

      radialGradientRed
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "black");

      const radialGradientGreen = svg
        .append("defs")
        .append("radialGradient")
        .attr("id", "radial-gradient-green");

      radialGradientGreen
        .append("stop")
        .attr("offset", "1%")
        .attr("stop-color", "#00540b");

      radialGradientGreen
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "black");

      const radialGradientPurple = svg
        .append("defs")
        .append("radialGradient")
        .attr("id", "radial-gradient-purple");

      radialGradientPurple
        .append("stop")
        .attr("offset", "1%")
        .attr("stop-color", "#520082");

      radialGradientPurple
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "black");

      /* -----------------------------------------*/
      /* ----------- Create the nodes ----------- */
      /* -----------------------------------------*/
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
            return "url(#radial-gradient-red)";
          } else if (dataNode.id && dataNode.id.includes("-g")) {
            return "url(#radial-gradient-green)";
          } else if (dataNode.id && dataNode.id.includes("-p")) {
            return "url(#radial-gradient-purple)";
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
