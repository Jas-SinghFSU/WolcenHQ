import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import Moment from "react-moment";
import _ from "lodash";

import "./style.css";

const buildsRoute = "/api/builds/build";

const combatTagColors = {
  caster: "rgb(102, 84, 153)",
  ranged: "rgb(93, 132, 82)",
  melee: "rgb(153, 87, 87)",
  tank: "rgb(34, 94, 130)",
};

const BuildTitle = (props) => {
  const { _id } = props;
  const history = useHistory();

  const [votes, setVotes] = useState({
    likes: null,
    dislikes: null,
  });

  const [upVoteStatus, setUpVoteStatus] = useState({
    hovered: false,
    selected: !_.isEmpty(props.user)
      ? props.likes.map((like) => like.userID).includes(props.user._id)
      : false,
  });

  const [downVoteStatus, setDownVoteStatus] = useState({
    hovered: false,
    selected: !_.isEmpty(props.user)
      ? props.dislikes.map((dislike) => dislike.userID).includes(props.user._id)
      : false,
  });

  const [voteSum, setVoteSum] = useState(
    props.likes.length - props.dislikes.length
  );

  useEffect(() => {
    if (votes.likes && votes.dislikes) {
      setUpVoteStatus({
        ...upVoteStatus,
        selected: !_.isEmpty(props.user)
          ? votes.likes.includes(props.user._id)
          : false,
      });

      setDownVoteStatus({
        ...downVoteStatus,
        selected: !_.isEmpty(props.user)
          ? votes.dislikes.includes(props.user._id)
          : false,
      });

      setVoteSum(votes.likes.length - votes.dislikes.length);
    }
  }, [votes]);

  let canVote = true;

  const authorExists = () => {
    return !_.isEmpty(props.author);
  };

  const getAuthorImage = () => {
    if (authorExists() && !_.isEmpty(props.author.image.value)) {
      return props.author.image.value;
    }
    return "";
  };

  const getAuthorName = () => {
    if (authorExists()) {
      return props.author.displayName;
    }
  };

  const getAuthorID = () => {
    if (authorExists()) {
      return props.author._id;
    }
  };

  const setUpvote = async () => {
    if (!_.isEmpty(props.user) && canVote) {
      canVote = false;
      try {
        const payload = {
          action: "upvote",
        };
        const upvoteResponse = await axios.put(
          `${buildsRoute}/vote/${_id}`,
          payload
        );
        canVote = true;
        setVotes({
          likes: upvoteResponse.data.likes.map((like) => like.userID),
          dislikes: upvoteResponse.data.dislikes.map(
            (dislike) => dislike.userID
          ),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setDownvote = async () => {
    if (!_.isEmpty(props.user) && canVote) {
      canVote = false;
      try {
        const payload = {
          action: "downvote",
        };
        const downvoteResponse = await axios.put(
          `${buildsRoute}/vote/${_id}`,
          payload
        );
        canVote = true;
        setVotes({
          likes: downvoteResponse.data.likes.map((like) => like.userID),
          dislikes: downvoteResponse.data.dislikes.map(
            (dislike) => dislike.userID
          ),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

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
                } fa-caret-square-up noSelectText`}
              />
              <span
                className="buildRating"
                style={{
                  marginLeft: `${voteSum !== 0 ? "-8px" : "0px"}`,
                  color: `${
                    voteSum > 0
                      ? "rgb(111, 219, 132)"
                      : voteSum < 0
                      ? "rgb(232, 100, 100)"
                      : "rgb(189, 182, 170)"
                  }`,
                }}
              >
                {voteSum > 0 ? "+" : ""}
                {voteSum}
              </span>
              <i
                onMouseOver={() => {
                  setDownVoteStatus({ ...downVoteStatus, hovered: true });
                }}
                onMouseLeave={() => {
                  setDownVoteStatus({ ...downVoteStatus, hovered: false });
                }}
                onClick={() => {
                  setDownvote();
                }}
                className={`downvote ${
                  downVoteStatus.hovered || downVoteStatus.selected
                    ? "fas"
                    : "far"
                } fa-caret-square-down noSelectText`}
              />
            </div>
            <div className="buildInfoPicture">
              <Avatar
                size={64}
                icon={<UserOutlined />}
                shape="square"
                src={getAuthorImage()}
              />
            </div>
            <div className="buildInfoDetails">
              <span className="buildInfoTitleContainer">
                <span className="buildInfoTitle">{props.buildTitle}</span>
                {!_.isEmpty(props.user) && props.user._id === props.author._id && (
                  <span className="buildInfoTitleEditButton">
                    <i
                      className="fas fa-pencil-alt fa-2x"
                      onClick={() => {
                        history.push(`/builds/edit/${props._id}`);
                      }}
                    />
                  </span>
                )}
              </span>
              <div className="buildInfoDescriptionContainer">
                <span className="buildInfoDescription">
                  by{" "}
                  <span className={"authorName"}>
                    {authorExists() ? (
                      <Link to={`/users/user/${getAuthorID()}`}>
                        {getAuthorName()}
                      </Link>
                    ) : (
                      "Anonymous"
                    )}
                  </span>
                  . Last updated{" "}
                  <Moment format="MMM DD[,] YYYY">{props.lastUpdated}</Moment>.
                </span>
                <span className="buildInfoTags">
                  <Tag color="rgb(61, 127, 142)">{props.playstyle}</Tag>
                  <Tag color={combatTagColors[props.combatType.toLowerCase()]}>
                    {props.combatType}
                  </Tag>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BuildTitle;
