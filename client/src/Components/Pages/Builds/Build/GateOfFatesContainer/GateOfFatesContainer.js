import React, { useRef, useEffect, Fragment, useState } from "react";
import { ReactSVGPanZoom, INITIAL_VALUE, TOOL_AUTO } from "react-svg-pan-zoom";
import { Row, Col, Button } from "antd";
import { LockFilled, UnlockFilled } from "@ant-design/icons";
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
  const [isMounted, setIsMounted] = useState(false);

  setTimeout(() => setIsMounted(true), 5000);

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
        pointerEvents: "none",
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
  ({ nodePairsScoped, allNodes, activePairs, activeNodes, scope }) => {
    /**  Only render links for nodes that belong in the current scope (group)
     * This is so links aren't duplicated 3 times since we run this each time
     * for each group (3 times total)
     */

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
    return filteredDataPairs.map((pair) => {
      const sourceCoords = allNodes && allNodes.get(pair.source);
      const destCoords = allNodes && allNodes.get(pair.destination);
      const sourcePoint = {
        cx: sourceCoords.cx || null,
        cy: sourceCoords.cy || null,
      };
      const destinationPoint = {
        cx: destCoords.cx || null,
        cy: destCoords.cy || null,
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
  ({ scope, svgDom, activeNodes, setTooltipOptions, passiveSkillsList }) => {
    const displayTooltip = (e) => {
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
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      let skillData = passiveSkillsList.filter((skill) => {
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
        text: skillData ? skillData : "",
      });
    };
    const svgGroup = svgDom.svg.g.filter((group) => {
      if (group.id === scope) {
        return true;
      }
    });

    const groupCircleList = svgGroup[0].circle;

    return groupCircleList.map((circle) => {
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
        circle.r > 8 && isActive
          ? "white"
          : circle.r > 8 && !isActive
          ? "#5f4e00"
          : circle.r < 8 && isActive
          ? "white"
          : circle.r < 8 && !isActive
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
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            displayTooltip(e);
          }}
          onMouseLeave={() => {
            setTooltipOptions({ display: "none", text: "" });
          }}
        />
      );
    });
  }
);

const GateOfFates = (props) => {
  const { activeNodes, rotations, setRotationsCB } = props;
  const [allNodes, setAllNodes] = useState(null);
  const [passiveSkillsList] = useState(passiveSkills);
  const [nodePairs] = useState(linkElems);
  const [nodePairsScoped, setNodePairsScoped] = useState(null);
  const [svgDom] = useState(svgData);
  const [selectedRing, setSelectedRing] = useState("");
  const [activePairs, setActivePairs] = useState([]);
  const [tooltipOptions, setTooltipOptions] = useState({
    display: "none",
    top: 0,
    left: 0,
    text: "",
  });

  const [panZoomVal, setPanZoomVal] = useState(INITIAL_VALUE);
  const [panZoomTool, setPanZoomTool] = useState(TOOL_AUTO);
  const [lockGOF, setLockGOF] = useState(true);

  const ringInner = 350;
  const ringMiddle = 700;
  const ringOuter = 1044;

  const getAllNodes = () => {
    let nodeMap = new Map();

    svgData.svg.g.forEach((group) => {
      group.circle.forEach((circle) => {
        const { cx, cy, r } = circle;
        nodeMap.set(circle.id, {
          name: circle.id,
          cx,
          cy,
          r,
          class: circle.class,
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
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");

        let skillData = passiveSkillsList.filter((skill) => {
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

    nodePairs.forEach((pair) => {
      if (
        activeNodes.includes(pair.source) &&
        activeNodes.includes(pair.destination)
      ) {
        foundPairs.set(`${pair.source}-${pair.destination}`, 1);
      }
    });
    return foundPairs;
  };

  const filterNodesByScope = () => {
    const pairScope = {
      inner: [],
      outer: [],
      middle: [],
    };

    nodePairs.forEach((pair) => {
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

  console.log("main");
  if (allNodes && nodePairsScoped) {
    return (
      <Fragment>
        <SkillTooltip tooltipOptions={tooltipOptions} />

        <Row style={{ display: "inline-table" }}>
          <div className="lockButtonContainer">
            <Button
              className="toggleLockButton"
              type="dashed"
              onClick={() => {
                setLockGOF(!lockGOF);
              }}
            >
              {lockGOF ? <LockFilled size={"medium"} /> : <UnlockFilled />}
            </Button>
          </div>
          <div className="gofAndControls">
            <Col>
              <div className={`gofContainer${lockGOF ? "-locked" : ""}`}>
                <Fireflies />
                {lockGOF ? (
                  <svg className="gofSvg" viewBox={"0 0 1044 1044"}>
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
                    {svgData.svg.g.map((group) => {
                      return (
                        <g
                          key={group.id}
                          id={group.id}
                          style={{
                            transition: "transform 1s ease 0s",
                            transformOrigin: "522px 522px 0px",
                            transform: `rotate(${
                              group.id === "outerRing"
                                ? rotations.outer
                                : group.id === "innerRing"
                                ? rotations.inner
                                : group.id === "middleRing"
                                ? rotations.middle
                                : 0
                            }deg)`,
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
                            nodePairsScoped={nodePairsScoped}
                            allNodes={allNodes}
                            activePairs={activePairs}
                            activeNodes={activeNodes}
                            scope={group.id}
                          />
                          <RenderNodes
                            scope={group.id}
                            svgDom={svgDom}
                            activeNodes={activeNodes}
                            setTooltipOptions={setTooltipOptions}
                            passiveSkillsList={passiveSkillsList}
                          />
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  <ReactSVGPanZoom
                    width={1044}
                    height={1044}
                    SVGBackground="transparent"
                    background="transparent"
                    miniatureProps={{ position: "none" }}
                    tool={panZoomTool}
                    onChangeTool={(tool) => {
                      setPanZoomTool(tool);
                    }}
                    value={panZoomVal}
                    onChangeValue={(value) => setPanZoomVal(value)}
                    detectAutoPan={false}
                    toolbarProps={{
                      position: "none",
                    }}
                    disableDoubleClickZoomWithToolAuto={true}
                  >
                    <svg className="gofSvg" viewBox={"0 0 1044 1044"}>
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
                      {svgData.svg.g.map((group) => {
                        return (
                          <g
                            key={group.id}
                            id={group.id}
                            style={{
                              transition: "transform 1s ease 0s",
                              transformOrigin: "522px 522px 0px",
                              transform: `rotate(${
                                group.id === "outerRing"
                                  ? rotations.outer
                                  : group.id === "innerRing"
                                  ? rotations.inner
                                  : group.id === "middleRing"
                                  ? rotations.middle
                                  : 0
                              }deg)`,
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
                              nodePairsScoped={nodePairsScoped}
                              allNodes={allNodes}
                              activePairs={activePairs}
                              activeNodes={activeNodes}
                              scope={group.id}
                            />
                            <RenderNodes
                              scope={group.id}
                              svgDom={svgDom}
                              activeNodes={activeNodes}
                              setTooltipOptions={setTooltipOptions}
                              passiveSkillsList={passiveSkillsList}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </ReactSVGPanZoom>
                )}
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

const GateOfFatesContainer = (props) => {
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
