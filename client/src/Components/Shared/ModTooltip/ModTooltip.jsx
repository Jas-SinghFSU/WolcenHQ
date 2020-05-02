import React from "react";
import ReactTooltip from "react-tooltip";

import "./style.css";

const ModTooltip = ({
  modDescriptions,
  modName,
  modCost,
  className = "",
  place = "top",
  backgroundColor = "rgb(0, 0, 0)",
  showBorder = true,
  borderColor = "rgb(77, 69, 36)",
}) => {
  return (
    <ReactTooltip
      id={modName.toLowerCase()}
      className={`modTooltip ${className}`}
      effect="float"
      place={place}
      backgroundColor={backgroundColor}
      border={showBorder}
      borderColor={borderColor}
    >
      <span>{modDescriptions.get(modName.toLowerCase())}</span>
      <span style={{ marginTop: 5 }}>
        Cost:
        <span style={{ color: "#7adbe6" }}> {modCost}</span>
      </span>
    </ReactTooltip>
  );
};

export default ModTooltip;
