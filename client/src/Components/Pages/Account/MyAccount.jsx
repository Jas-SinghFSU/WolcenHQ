import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Row, Col, Avatar, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CenteredLoader from "../../Shared/CenteredLoader/CenteredLoader";
import LikedBuilds from "./LikedBuilds/LikedBuilds";
import CreatedBuilds from "./CreatedBuilds/CreatedBuilds";
import axios from "axios";

import "./style.css";

const UserBanner = (props) => {
  if (!props.userData) {
    return <></>;
  }
  return (
    <div className="userBannerContainer">
      <Row>
        <Col span={20} offset={2}>
          <div className="bannerBackdrop">
            <div className="avatarContainer">
              <Avatar
                className="userBannerAvatar"
                size={128}
                shape="square"
                icon={<UserOutlined />}
                src={props.userData.image.value}
              />
              <span className="avatarUserName">
                {props.userData.displayName}
              </span>
              <div className="userStatisticsContent">
                <div className="userStatisticsContainer">
                  <span className="statisticLabel">Created</span>
                  <span className="statisticValue">
                    <Moment format="MMM DD[,] YYYY">
                      {props.userData.created}
                    </Moment>
                  </span>
                </div>
                <div className="userStatisticsContainer">
                  <span className="statisticLabel">Builds Created</span>
                  <span className="statisticValue">{props.created}</span>
                </div>
                <div className="userStatisticsContainer">
                  <span className="statisticLabel">Builds Liked</span>
                  <span className="statisticValue">{props.liked}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const MyAccount = (props) => {
  const [userData, setUserData] = useState(null);
  const [viewTable, setViewTable] = useState("created");

  const fetchUserData = async () => {
    try {
      const userDataRes = await axios.get("/api/users/self/totals");

      setUserData(userDataRes.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="myAccountContainer">
      <UserBanner {...userData} />
      <Row>
        <Col span={20} offset={2}>
          <Radio.Group
            className="tableTypeButtonContainer"
            value={viewTable}
            onChange={(e) => {
              setViewTable(e.target.value);
            }}
          >
            <Radio.Button className="customRadioButton" value="created">
              Created
            </Radio.Button>
            <Radio.Button className="customRadioButton" value="liked">
              Liked
            </Radio.Button>
          </Radio.Group>
          {viewTable === "created" ? <CreatedBuilds /> : <LikedBuilds />}
        </Col>
      </Row>
    </div>
  );
};

export default MyAccount;
