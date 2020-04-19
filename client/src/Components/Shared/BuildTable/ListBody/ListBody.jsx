import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Tag } from "antd";
import Moment from "react-moment";
import _ from "lodash";
import axios from "axios";

import SkillContainer from "../../../Shared/SkillContainer/SkillContainer";

import "./style.css";

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
    author,
  } = props.build;

  const [userData, setUserData] = useState("");

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

  const getUserData = async (userInfo) => {
    if (userInfo !== null && userInfo !== "Anonymous") {
      try {
        const userData = await axios.get(`/api/users/user/${userInfo}`);
        return userData.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      return {};
    }
  };

  useEffect(() => {
    const castUser = async () => {
      if (author === "Anonymous") {
        setUserData({ displayName: "Anonymous" });
      } else {
        const userInfo = await getUserData(author);
        setUserData({ ...userInfo });
      }
    };
    castUser();
  }, []);

  return (
    <div>
      <Row className="buildsListBody">
        <Col span={7} offset={0}>
          <div className="tBuildTitleContainer">
            <span
              className="tbodyText tBuildTitle"
              onClick={() => {
                handleBuildClick(_id);
              }}
            >
              {buildTitle}
            </span>
            <span className="tbodyText tBuildAuthor">
              by{" "}
              <span
                className="tAuthorName"
                onClick={() => {
                  if (author !== "Anonymous") {
                    history.push(`/users/user/${author}`);
                  }
                }}
              >
                {userData.displayName}
              </span>
            </span>
          </div>
        </Col>
        <Col span={4} offset={0}>
          <span className="tbodyText">
            <Tag color="rgb(61, 127, 142)">{playstyle}</Tag>
            <Tag color={combatTagColors[combatType.toLowerCase()]}>
              {combatType}
            </Tag>
          </span>
        </Col>
        <Col span={8} offset={0} className="skillContainerBody">
          {Object.keys(slotData).map((key) => {
            return (
              <SkillContainer
                key={`${_id}${key}`}
                slotData={slotData[key]}
                avatarSize={45}
                thin
              />
            );
          })}
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
                  : "#f4f0e7a3"
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
