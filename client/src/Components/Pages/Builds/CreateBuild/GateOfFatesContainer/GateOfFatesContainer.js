import React, { useRef, useEffect, Fragment, useState } from "react";
import { Row, Col, Button } from "antd";
import ReactTooltip from "react-tooltip";
import GoF from "./GoF";

import "./style.css";
import "./gof.css";

const svgData = require("../../../../../Data/GoF/output.json");
const linkElems = require("../../../../../Data/GoF/nodeLinks.json");

const outerRingImg = require("../../../../../images/Outer_Ring.png");
const innerRingImg = require("../../../../../images/Inner_Ring.png");
const middleRingImg = require("../../../../../images/Middle_Ring.png");

const GOFSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="statPointsTitle">Gate of Fates</span>
      </Col>
    </Row>
  );
};

const D3Test = () => {
  const [allNodes, setAllNodes] = useState(null);
  const [nodePairs, setNodePairs] = useState(linkElems);
  const [svgDom, setSvgDom] = useState(svgData);
  const [rotations, setRotations] = useState({
    inner: 0,
    outer: 0,
    middle: 0
  });
  const [activeNodes, setActiveNodes] = useState([]);
  const [activePairs, setActivePairs] = useState([]);
  const d3Ref = useRef();

  const ringInner = 350;
  const ringMiddle = 700;
  const ringOuter = 1044;

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

  const findPotentialPairs = () => {
    const foundPairs = new Map();

    nodePairs.forEach(pair => {
      if (
        activeNodes.includes(pair.source) &&
        activeNodes.includes(pair.destination)
      ) {
        foundPairs.set(`${pair.source}-${pair.destination}`, 1);
      }
    });
    return foundPairs;
  };

  const handleNodeClick = node => {
    let canActivate = false;
    const baseNodes = [
      "resilient-g",
      "heightened_concentration-p",
      "hardy-p",
      "heavy_blows-r",
      "capable-r",
      "refined_technique-g"
    ];

    const checkIfReachable = elem => {
      let isReachable = false;
      nodePairs.forEach(pair => {
        if (pair.source === elem || pair.destination === elem) {
          const itsPair = elem === pair.source ? pair.destination : pair.source;

          if (activeNodes.includes(itsPair)) {
            isReachable = true;
          }
        }
      });

      return isReachable;
    };

    if (
      baseNodes.includes(node.id) ||
      (checkIfReachable(node.id) && activeNodes.length < 90)
    ) {
      if (!activeNodes.includes(node.id)) {
        setActiveNodes([...activeNodes, node.id]);
      }
    }
  };
  useEffect(() => {
    // new GoF(d3Ref);
    setAllNodes(getAllNodes());
  }, []);

  useEffect(() => {
    setActivePairs(findPotentialPairs());
  }, [activeNodes]);

  const renderRings = scope => {
    const curDimensions =
      scope === "outerRing"
        ? ringOuter
        : scope === "innerRing"
        ? ringInner
        : scope === "middleRing"
        ? ringMiddle
        : 0;

    const curPosition =
      scope === "outerRing"
        ? (1044 - ringOuter) / 2
        : scope === "innerRing"
        ? (1044 - ringInner) / 2
        : scope === "middleRing"
        ? (1044 - ringMiddle) / 2
        : 0;

    const imageSrc =
      scope === "outerRing"
        ? outerRingImg
        : scope === "innerRing"
        ? innerRingImg
        : scope === "middleRing"
        ? middleRingImg
        : "";

    return (
      <image
        xlinkHref={imageSrc}
        height={curDimensions}
        width={curDimensions}
        x={curPosition}
        y={curPosition}
        style={{ pointerEvents: "none" }}
      />
    );
  };

  const renderLines = scope => {
    const filteredLinks = filterElem => {
      if (filterElem === "") {
        return nodePairs.filter(elem => {
          if (
            !elem.source.includes("-o") &&
            !elem.source.includes("-m") &&
            elem.source !== ""
          ) {
            return true;
          }
        });
      } else if (filterElem !== null) {
        return nodePairs.filter(elem => {
          if (elem.source.includes(filterElem)) {
            return true;
          }
        });
      } else {
        return null;
      }
    };

    const elemFilter =
      scope == "outerRing"
        ? "-o"
        : scope == "innerRing"
        ? ""
        : scope == "middleRing"
        ? "-m"
        : null;

    const filteredDataPairs = filteredLinks(elemFilter);

    return filteredDataPairs.map(pair => {
      const sourceCoords = allNodes && allNodes.get(pair.source);
      const destCoords = allNodes && allNodes.get(pair.destination);
      const sourcePoint = {
        cx: sourceCoords.cx || null,
        cy: sourceCoords.cy || null
      };
      const destinationPoint = {
        cx: destCoords.cx || null,
        cy: destCoords.cy || null
      };

      const link1 = `${pair.destination}-${pair.source}`;
      const link2 = `${pair.source}-${pair.destination}`;

      let isActive = false;

      if (activePairs.get(link1) || activePairs.get(link2)) {
        isActive = true;
      }

      return (
        <line
          className={isActive && "activeLink"}
          key={`${link1} ${link2}`}
          x1={sourcePoint.cx}
          y1={sourcePoint.cy}
          x2={destinationPoint.cx}
          y2={destinationPoint.cy}
          id={`${link1} ${link2}`}
          style={{ stroke: "grey" }}
        />
      );
    });
  };

  const renderNodes = scope => {
    const svgGroup = svgDom.svg.g.filter(group => {
      if (group.id === scope) {
        return true;
      }
    });

    const groupCircleList = svgGroup[0].circle;

    return groupCircleList.map(circle => {
      let isActive = activeNodes.includes(circle.id);
      const fillGradient = circle.id.includes("-r")
        ? `url(#radial-gradient-red${isActive === true ? "-active" : ""})`
        : circle.id.includes("-g")
        ? `url(#radial-gradient-green${isActive === true ? "-active" : ""})`
        : circle.id.includes("-p")
        ? `url(#radial-gradient-purple${isActive === true ? "-active" : ""})`
        : "";

      const strokeWidth = isActive ? 2 : 0.75;
      // const strokeColor = circle.r > 6 && isActive ? "#5f4e00" : "#707070";
      const strokeColor =
        circle.r > 6 && isActive
          ? "rgb(170, 155, 84)"
          : circle.r > 6 && !isActive
          ? "#5f4e00"
          : circle.r < 6 && isActive
          ? "white"
          : circle.r < 6 && !isActive
          ? "#707070"
          : "#707070";
      return (
        <circle
          key={circle.id}
          id={circle.id}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill={fillGradient}
          style={{ strokeWidth: strokeWidth, stroke: strokeColor }}
          onMouseEnter={() => {}}
          onClick={() => {
            handleNodeClick(circle);
          }}
        />
      );
    });
  };

  if (allNodes) {
    return (
      <Fragment>
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setRotations({
                  ...rotations,
                  outer: rotations.outer + 30
                });
              }}
            >
              Outer
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setRotations({
                  ...rotations,
                  middle: rotations.middle + 60
                });
              }}
            >
              Middle
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setRotations({
                  ...rotations,
                  inner: rotations.inner + 120
                });
              }}
            >
              Inner
            </Button>
          </Col>
          <Col>
            <div ref={d3Ref}>
              <svg width={1044} height={1044} viewBox={"0 0 1044 1044"}>
                <defs>
                  <radialGradient id="radial-gradient-red">
                    <stop offset="0%" stopColor="#7a0000" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-green">
                    <stop offset="0%" stopColor="#00540b" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-purple">
                    <stop offset="0%" stopColor="#520082" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-red-active">
                    <stop offset="0%" stopColor="#ff4d4d" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-green-active">
                    <stop offset="0%" stopColor="#74e872" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-purple-active">
                    <stop offset="0%" stopColor="#967be8" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                </defs>
                {svgData.svg.g.map(group => {
                  return (
                    <g
                      key={group.id}
                      id={group.id}
                      style={{
                        transition: "all 1s ease 0s",
                        transformOrigin: "522px 522px 0px",
                        transform: `rotate(${
                          group.id === "outerRing"
                            ? rotations.outer
                            : group.id === "innerRing"
                            ? rotations.inner
                            : group.id === "middleRing"
                            ? rotations.middle
                            : 0
                        }deg)`
                      }}
                    >
                      {renderRings(group.id)}
                      {renderLines(group.id)}
                      {renderNodes(group.id)}
                    </g>
                  );
                })}
              </svg>
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                console.log(nodePairs);
              }}
            >
              Export
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  } else {
    return <></>;
  }
};

const GateOfFatesContainer = () => {
  return (
    <div>
      <GOFSectionHeader />
      <D3Test />
    </div>
  );
};

export default GateOfFatesContainer;
