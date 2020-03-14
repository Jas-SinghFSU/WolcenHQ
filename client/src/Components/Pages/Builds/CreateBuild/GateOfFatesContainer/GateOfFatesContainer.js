import React, { useRef, useEffect, Fragment, useState } from "react";
import { Row, Col, Button, Popover } from "antd";
import Fireflies from "./Fireflies";
import "./style.css";
import "./gof.css";

const svgData = require("../../../../../Data/GoF/output.json");
const linkElems = require("../../../../../Data/GoF/nodeLinks.json");
const rcLinks = require("../../../../../Data/GoF/ringConnectorLinks.json");
const orcLinks = require("../../../../../Data/GoF/ringConnectorLinksOuter.json");
const passiveSkills = require("../../../../../Data/GoF/built_passive_skills.json");

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

const GateOfFates = () => {
  const [allNodes, setAllNodes] = useState(null);
  const [passiveSkillsList] = useState(passiveSkills);
  const [nodePairs] = useState(linkElems);
  const [nodePairsScoped, setNodePairsScoped] = useState(null);
  const [svgDom] = useState(svgData);
  const [rotations, setRotations] = useState({
    inner: 0,
    outer: 0,
    middle: 0
  });
  const [activeNodes, setActiveNodes] = useState(["root"]);
  const [activePairs, setActivePairs] = useState([]);
  const [innerToMiddle] = useState(rcLinks);
  const [middleToOuter] = useState(orcLinks);
  const [tooltipOptions, setTooltipOptions] = useState({
    display: "none",
    top: 0,
    left: 0,
    text: ""
  });

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

  const getUnfoundDataForNodes = () => {
    if (allNodes) {
      allNodes.forEach((nodeData, nodeName) => {
        const skillName = nodeName
          .toString()
          .split("-")
          .shift()
          .replace(/_/g, " ")
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");

        let skillData = passiveSkillsList.filter(skill => {
          if (
            skillName.toLowerCase() ===
            skill.name.toLowerCase().replace(/'/, "")
          ) {
            return true;
          }
        });
      });
    }
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
    if (activeNodes.length > 90) {
      return;
    }
    const baseNodes = [
      "resilient-g",
      "heightened_concentration-p",
      "hardy-p",
      "heavy_blows-r",
      "capable-r",
      "refined_technique-g"
    ];

    const baseInnerNodes = [
      "steadfast-2-p",
      "adept-2-p",
      "chemically_empowered_metabolism-g",
      "precise_strikes-g",
      "pain_resistance_program-r",
      "zealous_might-r"
    ];

    const baseMiddleNodes = [
      "impervious_wall-r-m",
      "dominator-p-m",
      "unstoppable_flurry-g-m",
      "master_of_the_frontline-r-m",
      "clarity_of_mind-p-m",
      "elaborate_flurry-g-m"
    ];
    const baseOuterNodes = [
      "of_squalls_and_fires-p-o",
      "external_discharge-g-o",
      "inexorable_vitality-r-o",
      "bog_bodies-p-o",
      "blindfolded_leaps-g-o",
      "light_for_the_blind-r-o",
      "guttural_dowry-p-o",
      "implacable_tracker-g-o",
      "omnipractice-r-o",
      "waning_before_waxing-p-o",
      "aloof_hunter-g-o",
      "boiling_point-r-o"
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

    /* Handle case for non-transition nodes */
    if (baseNodes.includes(node.id) || checkIfReachable(node.id)) {
      if (!activeNodes.includes(node.id)) {
        setActiveNodes([...activeNodes, node.id]);
      }
    }

    /* Handle case for inner to middle ring transition */
    const currentAngleDiff =
      ((rotations.middle % 360) - (rotations.inner % 360)) % 360;
    let currentAngleDiffOuter =
      ((rotations.outer % 360) - (rotations.middle % 360)) % 360;
    if (currentAngleDiffOuter < 0) {
      currentAngleDiffOuter = 360 + currentAngleDiffOuter;
    }
    const inverseAngle =
      currentAngleDiff > 0 ? currentAngleDiff - 360 : 360 - currentAngleDiff;

    if (baseMiddleNodes.includes(node.id)) {
      const parentForNode = innerToMiddle.filter(link => {
        if (
          link.destination === node.id &&
          (link.angle === currentAngleDiff || link.angle === inverseAngle)
        ) {
          return true;
        }
      });

      if (activeNodes.includes(parentForNode[0].source)) {
        setActiveNodes([...activeNodes, node.id]);
      }
    }

    if (baseInnerNodes.includes(node.id)) {
      const parentForNode = innerToMiddle.filter(link => {
        if (
          link.source === node.id &&
          (link.angle === currentAngleDiff || link.angle === inverseAngle)
        ) {
          return true;
        }
      });

      if (activeNodes.includes(parentForNode[0].destination)) {
        setActiveNodes([...activeNodes, node.id]);
      }
    }

    if (baseOuterNodes.includes(node.id)) {
      const parentForNode = middleToOuter.filter(link => {
        if (
          link.destination === node.id &&
          (link.angle === currentAngleDiffOuter || link.angle === inverseAngle)
        ) {
          return true;
        }
      });

      if (activeNodes.includes(parentForNode[0].source)) {
        setActiveNodes([...activeNodes, node.id]);
      }
    }
  };

  const resetElements = scope => {
    if (scope === "inner") {
      setActiveNodes(["root"]);
    } else if (scope === "middle") {
      let filteredActiveNodes = activeNodes.filter(node => {
        if (!node.includes("-m") && !node.includes("-o")) {
          return true;
        }
      });
      setActiveNodes(filteredActiveNodes);
    } else if (scope === "outer") {
      let filteredActiveNodes = activeNodes.filter(node => {
        if (!node.includes("-o")) {
          return true;
        }
      });
      setActiveNodes(filteredActiveNodes);
    }
  };

  const filterNodesByScope = () => {
    const pairScope = {
      inner: [],
      outer: [],
      middle: []
    };

    nodePairs.forEach(pair => {
      if (pair.source.includes("-o")) {
        pairScope.outer = [...pairScope.outer, pair];
      } else if (pair.source.includes("-m")) {
        pairScope.middle = [...pairScope.middle, pair];
      } else {
        pairScope.inner = [...pairScope.inner, pair];
      }
    });

    setNodePairsScoped(pairScope);
  };

  const displayTooltip = e => {
    let left = e.clientX + "px";
    let top = e.clientY - 40 + "px";

    const rawSkillName = e.currentTarget.id;
    const skillName = rawSkillName
      .split("-")
      .shift()
      .replace(/_/g, " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    let skillData = passiveSkillsList.filter(skill => {
      if (
        skillName.toLowerCase() === skill.name.toLowerCase().replace(/'/, "")
      ) {
        return true;
      }
    });

    if (skillData.length === 0) {
      console.log(`Couldn't find: ${skillName}`);
    }
    skillData = skillData[0] || null;

    setTooltipOptions({
      display: "block",
      left,
      top,
      text: skillData ? skillData.name : ""
    });
  };

  useEffect(() => {
    setAllNodes(getAllNodes());
    filterNodesByScope();
  }, []);

  useEffect(() => {
    getUnfoundDataForNodes();
  }, [allNodes]);

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
    /**  Only render links for nodes that belong in the current scope (group)
     * This is so links aren't duplicated 3 times since we run this each time
     * for each group (3 times total)
     */

    // Not using filteredLinks since we filter them upon loading the component
    const filteredLinks = filterElem => {
      // If there are no filter elems provided (ex: -o) then render links for inner circle
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
      } //otherwise render nodes for inner or middle based on filter (ex -o or -m)
      else if (filterElem !== null) {
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

    const filteredDataPairs =
      elemFilter === "-o"
        ? nodePairsScoped.outer
        : elemFilter === "-m"
        ? nodePairsScoped.middle
        : nodePairsScoped.inner; //filteredLinks(elemFilter);

    /* For each of the nodes that belong in the group, generate link if they're pairs */
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
      let isAccessible = false;

      if (activePairs.get(link1) || activePairs.get(link2)) {
        isActive = true;
      } else if (
        pair.source.includes("-edge") &&
        activeNodes.includes(pair.destination)
      ) {
        isActive = true;
      } else if (
        activeNodes.includes(pair.source) ||
        (activeNodes.includes(pair.destination) && activeNodes.length < 90)
      ) {
        isAccessible = true;
      }

      return (
        <line
          className={
            isActive ? "activeLink" : isAccessible ? "accessibleLink" : ""
          }
          key={`${link1} ${link2}`}
          x1={sourcePoint.cx}
          y1={sourcePoint.cy}
          x2={destinationPoint.cx}
          y2={destinationPoint.cy}
          id={`${link1} ${link2}`}
          style={{ stroke: "grey", transition: "all 0.3s" }}
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

      const strokeWidth = isActive ? 1.5 : 0.75;
      // const strokeColor = circle.r > 6 && isActive ? "#5f4e00" : "#707070";
      const strokeColor =
        circle.r > 6 && isActive
          ? "white"
          : circle.r > 6 && !isActive
          ? "#5f4e00"
          : circle.r < 6 && isActive
          ? "white"
          : circle.r < 6 && !isActive
          ? "#707070"
          : "#707070";
      return (
        <circle
          className={"nodeCircle"}
          key={circle.id}
          id={circle.id}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill={fillGradient}
          style={{
            strokeWidth: strokeWidth,
            stroke: strokeColor,
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={e => {
            displayTooltip(e);
          }}
          onMouseLeave={() => {
            setTooltipOptions({ display: "none" });
          }}
          onClick={() => {
            handleNodeClick(circle);
            navigator.clipboard.writeText(circle.id);
          }}
        />
      );
    });
  };

  if (allNodes && nodePairsScoped) {
    return (
      <Fragment>
        <div
          id="nodeTooltip"
          style={{
            display: `${tooltipOptions.display}`,
            left: `${tooltipOptions.left}`,
            top: `${tooltipOptions.top}`,
            position: "fixed",
            background: "white",
            zIndex: "1",
            pointerEvents: "none"
          }}
        >
          {tooltipOptions.text}
        </div>
        <Row>
          <div style={{ marginBottom: 20 }}>
            <Col>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setRotations({
                    ...rotations,
                    outer: rotations.outer + 30
                  });
                  resetElements("outer");
                }}
              >
                Outer
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setRotations({
                    ...rotations,
                    middle: rotations.middle + 60
                  });
                  resetElements("middle");
                }}
              >
                Middle
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setRotations({
                    ...rotations,
                    inner: rotations.inner + 120
                  });
                  resetElements("middle");
                }}
              >
                Inner
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setRotations({
                    inner: 0,
                    middle: 0,
                    outer: 0
                  });
                  resetElements("inner");
                }}
              >
                Reset
              </Button>
            </Col>
          </div>
          <Col>
            <div className="gofContainer" ref={d3Ref}>
              <Fireflies />
              <svg
                className="gofSvg"
                width={1044}
                height={1044}
                viewBox={"0 0 1044 1044"}
              >
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
                    <stop offset="100%" stopColor="#3d1111" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-green-active">
                    <stop offset="0%" stopColor="#74e872" />
                    <stop offset="100%" stopColor="#264a25" />
                  </radialGradient>
                  <radialGradient id="radial-gradient-purple-active">
                    <stop offset="0%" stopColor="#9376e3" />
                    <stop offset="100%" stopColor="#160054" />
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
      <div style={{ marginTop: 20 }}>
        <GateOfFates />
      </div>
    </div>
  );
};

export default GateOfFatesContainer;
