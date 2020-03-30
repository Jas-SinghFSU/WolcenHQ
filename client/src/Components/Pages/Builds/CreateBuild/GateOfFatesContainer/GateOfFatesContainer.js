import React, { useRef, useEffect, Fragment, useState } from "react";
import { ReactSVGPanZoom, INITIAL_VALUE, TOOL_AUTO } from "react-svg-pan-zoom";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faShare } from "@fortawesome/free-solid-svg-icons";
import Fireflies from "./Fireflies";
import "./style.css";

const svgData = require("../../../../../Data/GoF/output.json");
const linkElems = require("../../../../../Data/GoF/nodeLinks.json");
const rcLinks = require("../../../../../Data/GoF/ringConnectorLinks.json");
const orcLinks = require("../../../../../Data/GoF/ringConnectorLinksOuter.json");
const passiveSkills = require("../../../../../Data/GoF/built_passive_skills.json");

const outerRingImg = require("../../../../../images/Outer_Ring.png");
const innerRingImg = require("../../../../../images/Inner_Ring.png");
const middleRingImg = require("../../../../../images/Middle_Ring.png");
const outerRingSelectedImg = require("../../../../../images/Outer_Ring_Selected.png");
const innerRingSelectedImg = require("../../../../../images/Inner_Ring_Selected.png");
const middleRingSelectedImg = require("../../../../../images/Middle_Ring_Selected.png");

const GOFSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Gate of Fates</span>
      </Col>
    </Row>
  );
};

const SkillTooltip = ({ tooltipOptions }) => {
  const [ttipOptions, setTTipOptions] = useState(tooltipOptions);

  // const tooltipRef = elem => {
  //   const ttElem = elem;
  //   let newTop;
  //   let newLeft;

  //   if (ttElem && ttipOptions !== "" && ttElem.style.top !== ttipOptions.top) {
  //     newTop = parseInt(ttElem.style.top, 10);
  //     newLeft = parseInt(ttElem.style.left, 10);
  //     console.log(newTop);
  //     console.log(ttElem.clientHeight);
  //     if (newTop + ttElem.clientHeight > window.innerHeight) {
  //       newTop = newTop - ttElem.clientHeight;
  //     }

  //     if (newLeft + ttElem.clientWidth > window.innerWidth) {
  //       newLeft = newLeft - 300;
  //     }

  //     ttElem.style.top = newTop + "px";
  //     ttElem.style.left = newLeft + "px";
  //   }
  // };

  useEffect(() => {
    setTTipOptions(tooltipOptions);
  }, [tooltipOptions]);

  return (
    <div
      id="nodeTooltip"
      style={{
        display: `${ttipOptions.display}`,
        left: `${ttipOptions.left}px`,
        top: `${ttipOptions.top}px`,
        position: "fixed",
        background: "white",
        zIndex: "1",
        pointerEvents: "none"
      }}
      // ref={tooltipRef}
    >
      <Row className="spellTooltipRow">
        <Col className="tooltipSpellNameCol" span={24} offset={0}>
          <span className="tooltipSpellName">
            {ttipOptions && ttipOptions.text.name}
          </span>
        </Col>
        {ttipOptions && ttipOptions.text.description && (
          <Col className="tooltipSkillDescriptionCol" span={24} offset={0}>
            <span className="tooltipSpellName">
              {ttipOptions && ttipOptions.text.description}
            </span>
          </Col>
        )}
        <Col className="tooltipSkillDescriptionCol" span={24} offset={0}>
          <div className="tooltipSkillModsList">
            {ttipOptions &&
              ttipOptions.text !== "" &&
              ttipOptions.text.magicEffects.modifiers.map((mod, modIndex) => {
                const descArr = mod.HUDDesc;
                return (
                  <div key={modIndex} className="tooltipSkillMod">
                    {descArr.map((descWord, index, arr) => {
                      if (descWord.match(/[^{}]*(?=\})/g)) {
                        let thisWord = descWord.replace(/[{}]/g, "");
                        return (
                          <span key={`${index}`} className="skillModValue">
                            {thisWord + " "}
                          </span>
                        );
                      }
                      let spaceOrNewline = " ";
                      if (index === arr.length - 1) {
                        spaceOrNewline = "\n";
                      }
                      return descWord + spaceOrNewline;
                    })}
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const RenderRings = React.memo(
  ({ scope, ringOuter, ringInner, ringMiddle, selectedRing }) => {
    console.log("renderrings");
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
      scope === "outerRing" && selectedRing === "outer"
        ? outerRingSelectedImg
        : scope === "innerRing" && selectedRing === "inner"
        ? innerRingSelectedImg
        : scope === "middleRing" && selectedRing === "middle"
        ? middleRingSelectedImg
        : scope === "outerRing"
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
  }
);

const RenderLines = React.memo(
  ({ scope, nodePairsScoped, allNodes, activePairs, activeNodes }) => {
    /**  Only render links for nodes that belong in the current scope (group)
     * This is so links aren't duplicated 3 times since we run this each time
     * for each group (3 times total)
     */
    console.log("renderlines");
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
  }
);

const RenderNodes = React.memo(
  ({
    scope,
    passiveSkillsList,
    setTooltipOptions,
    svgDom,
    activeNodes,
    handleNodeClick
  }) => {
    console.log("renderNodes");
    const displayTooltip = e => {
      let left = e.clientX;
      let top = e.clientY - 40;

      if (top + 150 > window.innerHeight) {
        top = top - 50;
      }
      if (top - 30 < window.innerHeight) {
        top = top + 30;
      }
      if (left + 300 > window.innerWidth) {
        left = left - 300;
      }

      left = left;
      top = top;

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
        text: skillData ? skillData : ""
      });
    };

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

      const strokeWidth = isActive ? 1.5 : 1;
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
            setTooltipOptions({ display: "none", text: "" });
          }}
          onClick={() => {
            handleNodeClick(circle);
          }}
        />
      );
    });
  }
);

const GateOfFates = props => {
  const { setActiveNodes, activeNodes, rotations, setRotationsCB } = props;
  const [allNodes, setAllNodes] = useState(null);
  const [passiveSkillsList] = useState(passiveSkills);
  const [nodePairs] = useState(linkElems);
  const [nodePairsScoped, setNodePairsScoped] = useState(null);
  const [svgDom] = useState(svgData);
  const [selectedRing, setSelectedRing] = useState("");
  const [activePairs, setActivePairs] = useState([]);
  const [innerToMiddle] = useState(rcLinks);
  const [middleToOuter] = useState(orcLinks);
  const [tooltipOptions, setTooltipOptions] = useState({
    display: "none",
    top: 0,
    left: 0,
    text: ""
  });

  const [panZoomVal, setPanZoomVal] = useState(INITIAL_VALUE);
  const [panZoomTool, setPanZoomTool] = useState(TOOL_AUTO);

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

  const handleWheelSpin = direction => {
    let rotationValue;
    if (selectedRing === "outer") {
      resetElements("outer");
      rotationValue =
        direction === "left" ? rotations.outer + 30 : rotations.outer - 30;
      setRotationsCB("outer", rotationValue);
    }

    if (selectedRing === "inner") {
      resetElements("middle");
      rotationValue =
        direction === "left" ? rotations.inner + 120 : rotations.inner - 120;
      setRotationsCB("inner", rotationValue);
    }

    if (selectedRing === "middle") {
      resetElements("middle");
      rotationValue =
        direction === "left" ? rotations.middle + 60 : rotations.middle - 60;
      setRotationsCB("middle", rotationValue);
    }
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

  if (allNodes && nodePairsScoped) {
    return (
      <Fragment>
        <SkillTooltip tooltipOptions={tooltipOptions} />

        <Row style={{ display: "inline-table" }}>
          <div className="gofAndControls">
            <Col>
              <div className="gofButtons" style={{ marginBottom: 20 }}>
                <span className="gofSkillPointsLabel">{`Points: ${activeNodes.length -
                  1}/90`}</span>
                <span className="gofButtonsLabel">Rotate Rings</span>
                <div className="ringNamesContainer">
                  <div
                    onClick={() => {
                      selectedRing === "outer"
                        ? setSelectedRing("")
                        : setSelectedRing("outer");
                    }}
                    className={`ringName ${
                      selectedRing === "outer" ? "selected" : ""
                    }`}
                  >
                    <span>Outer</span>
                  </div>

                  <div
                    onClick={() => {
                      selectedRing === "middle"
                        ? setSelectedRing("")
                        : setSelectedRing("middle");
                    }}
                    className={`ringName ${
                      selectedRing === "middle" ? "selected" : ""
                    }`}
                  >
                    <span>Middle</span>
                  </div>

                  <div
                    onClick={() => {
                      selectedRing === "inner"
                        ? setSelectedRing("")
                        : setSelectedRing("inner");
                    }}
                    className={`ringName ${
                      selectedRing === "inner" ? "selected" : ""
                    }`}
                  >
                    <span>Inner</span>
                  </div>
                </div>

                <div className="rotateButtonContainer">
                  <Button
                    className="rotateButtonLeft"
                    type="primary"
                    style={{ marginBottom: 10 }}
                    onClick={() => {
                      handleWheelSpin("right");
                    }}
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </Button>
                  <Button
                    className="rotateButtonRight"
                    type="primary"
                    style={{ marginBottom: 10 }}
                    onClick={() => {
                      handleWheelSpin("left");
                    }}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </Button>
                </div>
                <Button
                  className="rotateButtonReset zoom"
                  type="primary"
                  style={{ marginBottom: 10 }}
                  onClick={() => {
                    setPanZoomVal(INITIAL_VALUE);
                  }}
                >
                  Reset Zoom
                </Button>
                <Button
                  className="rotateButtonReset"
                  type="primary"
                  style={{ marginBottom: 10 }}
                  onClick={() => {
                    setRotationsCB("all", 0);
                    resetElements("inner");
                  }}
                >
                  Reset Wheel
                </Button>
              </div>
            </Col>
            <Col>
              <div className="gofContainer">
                <Fireflies />
                <ReactSVGPanZoom
                  width={1044}
                  height={1044}
                  SVGBackground="transparent"
                  background="#000c"
                  miniatureProps={{ position: "none" }}
                  tool={panZoomTool}
                  onChangeTool={tool => {
                    setPanZoomTool(tool);
                  }}
                  value={panZoomVal}
                  onChangeValue={value => setPanZoomVal(value)}
                  detectAutoPan={false}
                  toolbarProps={{
                    position: "none"
                  }}
                  disableDoubleClickZoomWithToolAuto={true}
                >
                  <svg className="gofSvg" viewBox={"0 0 1044 1044"} ref={d3Ref}>
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
                          <RenderRings
                            scope={group.id}
                            ringOuter={ringOuter}
                            ringInner={ringInner}
                            ringMiddle={ringMiddle}
                            selectedRing={selectedRing}
                          />
                          <RenderLines
                            scope={group.id}
                            nodePairsScoped={nodePairsScoped}
                            allNodes={allNodes}
                            activePairs={activePairs}
                            activeNodes={activeNodes}
                          />
                          <RenderNodes
                            scope={group.id}
                            passiveSkillsList={passiveSkillsList}
                            setTooltipOptions={setTooltipOptions}
                            svgDom={svgDom}
                            activeNodes={activeNodes}
                            handleNodeClick={handleNodeClick}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </ReactSVGPanZoom>
              </div>
            </Col>
          </div>
        </Row>
      </Fragment>
    );
  } else {
    return <></>;
  }
};

const GateOfFatesContainer = props => {
  return (
    <div>
      <GOFSectionHeader />
      <div style={{ marginTop: 20 }}>
        <GateOfFates {...props} />
      </div>
    </div>
  );
};

export default React.memo(GateOfFatesContainer);
