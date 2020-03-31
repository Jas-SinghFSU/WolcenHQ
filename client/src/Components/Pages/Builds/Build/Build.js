import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import UserProvider from "../../../../Contexts/UserProvider";
import axios from "axios";
import GetYoutubeId from "get-youtube-id";
import _ from "lodash";
import { Layout, Row, Col } from "antd";
import BuildTitle from "./BuildTitle/BuildTitle";
import StatPointsContainer from "./StatPointsContainer/StatPointsContainer";
import SkillsContainer from "./SkillsContainer/SkillsContainer";
import GateOfFatesContainer from "./GateOfFatesContainer/GateOfFatesContainer";
import BuildGuideContainer from "./BuildGuideContainer/BuildGuideContainer";
import BuildVideoContainer from "./BuildVideoContainer/BuildVideoContainer";
import CommentsContainer from "./CommentsContainer/CommentsContainer";

import "./style.css";

const { Content } = Layout;

const buildsRoute = "/api/builds/build";

const Build = props => {
  const { id } = props.match.params;
  const userContext = useContext(UserProvider.context);

  const [buildData, setBuildData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user]);

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

  const dataLoaded = () => {
    return !_.isEmpty(buildData) && userData !== null && user !== null;
  };

  if (dataLoaded()) {
    return (
      <Layout className="buildPageLayout">
        <Content className="statsAndSkills">
          <Row>
            <Col span={22} offset={1} style={{ textAlign: "center" }}>
              <BuildTitle {...dataProps} author={userData} user={user} />
              <StatPointsContainer {...dataProps} />
              <SkillsContainer {...dataProps} />
              <GateOfFatesContainer {...dataProps} />
              {!_.isEmpty(GetYoutubeId(dataProps.buildVideo)) && (
                <BuildVideoContainer buildVideo={dataProps.buildVideo} />
              )}
              <BuildGuideContainer {...dataProps} />
              <CommentsContainer {...dataProps} />
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
