import React, { useState } from "react";
import { Row, Col, Avatar } from "antd";
import { useHistory, Link } from "react-router-dom";
import _ from "lodash";

import "./style.css";

const BuildTitle = props => {
  const [upVoteStatus, setUpVoteStatus] = useState({
    hovered: false,
    selected: false
  });

  const [downVoteStatus, setDownVoteStatus] = useState({
    hovered: false,
    selected: false
  });

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

  const setUpvote = () => {
    setUpVoteStatus({
      ...upVoteStatus,
      selected: !upVoteStatus.selected
    });
    setDownVoteStatus({
      ...downVoteStatus,
      selected: false
    });
  };

  const setDownvote = () => {
    setDownVoteStatus({
      ...downVoteStatus,
      selected: !downVoteStatus.selected
    });
    setUpVoteStatus({
      ...upVoteStatus,
      selected: false
    });
  };

  const upVotes = 126;

  return (
    <Row>
      <Col className="buildTitleCol" span={24} offset={0}>
        <div className="buildInfoContainer">
          <div className="buildInfoLeft">
            <div className="buildInfoRight">
              <i
                onMouseOver={() => {
                  setUpVoteStatus({ ...upVoteStatus, hovered: true });
                }}
                onMouseOut={() => {
                  setUpVoteStatus({ ...upVoteStatus, hovered: false });
                }}
                onClick={() => {
                  setUpvote();
                }}
                className={`upvote ${
                  upVoteStatus.hovered || upVoteStatus.selected ? "fas" : "far"
                } fa-caret-square-up`}
              />
              <span
                className="buildRating"
                style={{
                  marginLeft: `${upVotes !== 0 ? "-8px" : "0px"}`,
                  color: `${
                    upVotes > 0
                      ? "rgb(111, 219, 132)"
                      : upVotes < 0
                      ? "rgb(232, 100, 100)"
                      : "rgb(189, 182, 170)"
                  }`
                }}
              >
                {upVotes > 0 ? "+" : ""}
                {upVotes}
              </span>
              <i
                onMouseOver={() => {
                  setDownVoteStatus({ ...downVoteStatus, hovered: true });
                }}
                onMouseOut={() => {
                  setDownVoteStatus({ ...downVoteStatus, hovered: false });
                }}
                onClick={() => {
                  setDownvote();
                }}
                className={`downvote ${
                  downVoteStatus.hovered || downVoteStatus.selected
                    ? "fas"
                    : "far"
                } fa-caret-square-down`}
              />
            </div>
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
                <span className={"authorName"}>
                  {userExists() ? (
                    <Link to={`/users/user/${getUserID()}`}>
                      {getUserName()}
                    </Link>
                  ) : (
                    "Anonymous"
                  )}
                </span>
                . Last updated 10 days ago.
              </span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BuildTitle;
