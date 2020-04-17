import React, { Fragment } from "react";
import { Row, Col } from "antd";
import YouTube from "react-youtube";
import GetYoutubeId from "get-youtube-id";

import "./style.css";

const BuildVideoHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Build Video</span>
      </Col>
    </Row>
  );
};

const BuildVideo = ({ buildVideo }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  const onReady = () => {};

  return (
    <div className="buildVideoContent">
      <YouTube videoId={GetYoutubeId(buildVideo)} opts={opts} />
    </div>
  );
};

const BuildVideoContainer = props => {
  return (
    <Fragment>
      <BuildVideoHeader />
      <BuildVideo {...props} />
    </Fragment>
  );
};

export default BuildVideoContainer;
