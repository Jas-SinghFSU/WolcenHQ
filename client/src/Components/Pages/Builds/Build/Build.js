import React, { useState, useCallback, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { Layout, Row, Col, Avatar } from "antd";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";
import SkillsContainer from "./SkillsContainer/SkillsContainer";
import GateOfFatesContainer from "./GateOfFatesContainer/GateOfFatesContainer";

import "./style.css";

const { Content } = Layout;

const buildsRoute = "/api/builds/build";

const BuildTitle = props => {
  const userExists = () => {
    return !_.isEmpty(props.user);
  };

  const getUserImage = () => {
    if (userExists() && !_.isEmpty(props.user.image.value)) {
      return props.user.image.value;
    }
    return "";
  };

  const getUserName = () => {
    if (userExists()) {
      return props.user.displayName;
    }
  };

  const getUserID = () => {
    if (userExists()) {
      return props.user._id;
    }
  };

  return (
    <Row>
      <Col className="buildTitleCol" span={24} offset={0}>
        <div className="buildInfoContainer">
          <div className="buildInfoLeft">
            <div className="buildInfoPicture">
              <Avatar
                size="large"
                icon="user"
                shape="square"
                src={getUserImage()}
              />
            </div>
            <div className="buildInfoDetails">
              <span className="buildInfoTitle">{props.buildTitle}</span>
              <span className="buildInfoDescription">
                by{" "}
                {userExists() ? (
                  <Link to={`/users/user/${getUserID()}`}>{getUserName()}</Link>
                ) : (
                  "Anonymous"
                )}
                . Last updated 10 days ago.
              </span>
            </div>
          </div>
          <div className="buildInfoRight"></div>
        </div>
      </Col>
    </Row>
  );
};

const Build = props => {
  const { id } = props.match.params;

  const [buildData, setBuildData] = useState(null);
  const [userData, setUserData] = useState(null);

  const history = useHistory();

  const getBuildData = async () => {
    try {
      const buildData = await axios.get(`${buildsRoute}/${id}`);
      setBuildData({ ...buildData.data });
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    if (buildData.author !== null && buildData.author !== "Anonymous") {
      try {
        const userData = await axios.get(`/api/users/user/${buildData.author}`);
        setUserData({ ...userData.data });
      } catch (error) {
        console.error(error);
      }
    } else {
      setUserData({});
    }
  };

  useEffect(() => {
    getBuildData();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(buildData)) {
      getUserData();
    }
  }, [buildData]);

  const dataProps = {
    ...buildData
  };

  if (!_.isEmpty(buildData) && userData !== null) {
    return (
      <Layout className="buildPageLayout">
        <Content className="statsAndSkills">
          <Row>
            <Col span={22} offset={1} style={{ textAlign: "center" }}>
              <BuildTitle {...dataProps} user={userData} />
              <StatPointsContainer {...dataProps} />
              <SkillsContainer {...dataProps} />
              <GateOfFatesContainer {...dataProps} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Build;
