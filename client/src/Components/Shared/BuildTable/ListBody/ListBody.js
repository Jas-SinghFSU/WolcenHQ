import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Tag } from "antd";

import "./style.css";
import Moment from "react-moment";
import { get } from "mongoose";

const ListBody = (props) => {
  const {
    _id,
    buildTitle,
    combatType,
    playstyle,
    slotData,
    likes,
    dislikes,
    lastUpdated,
  } = props.build;

  const combatTagColors = {
    caster: "rgb(102, 84, 153)",
    ranged: "rgb(93, 132, 82)",
    melee: "rgb(153, 87, 87)",
    tank: "rgb(34, 94, 130)",
  };

  const history = useHistory();

  const handleBuildClick = (buildID) => {
    history.push(`/builds/build/${buildID}`);
  };

  const getLikes = () => {
    const voteSum = likes.length - dislikes.length;
    return voteSum;
  };

  return (
    <div>
      <Row
        className="buildsListBody"
        onClick={() => {
          handleBuildClick(_id);
        }}
      >
        <Col span={7} offset={0}>
          <span className="tbodyText tBuildTitle">{buildTitle}</span>
        </Col>
        <Col span={4} offset={0}>
          <span className="tbodyText">
            <Tag color="rgb(61, 127, 142)">{playstyle}</Tag>
            <Tag color={combatTagColors[combatType.toLowerCase()]}>
              {combatType}
            </Tag>
          </span>
        </Col>
        <Col span={8} offset={0}>
          <span className="tbodyText">Spells</span>
        </Col>
        <Col span={2} offset={0}>
          <span
            className="tbodyText likes"
            style={{
              color: `${
                getLikes() > 0
                  ? "rgb(111, 219, 132)"
                  : getLikes() < 0
                  ? "rgb(232, 100, 100)"
                  : ""
              }`,
              marginLeft: `${getLikes() === 0 ? "5px" : ""}`,
            }}
          >
            {`${getLikes() > 0 ? `+${getLikes()}` : getLikes()}`}
          </span>
        </Col>
        <Col span={3} offset={0}>
          <span className="tbodyText lastUpdated">
            {<Moment format="MMM DD[,] YYYY">{lastUpdated}</Moment>}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default ListBody;
