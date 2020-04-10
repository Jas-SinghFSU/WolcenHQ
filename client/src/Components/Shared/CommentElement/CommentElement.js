import React, { useEffect, useState, Fragment } from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import sanitizeHtml from "sanitize-html";
import Moment from "react-moment";
import _ from "lodash";
import axios from "axios";

import "react-quill/dist/quill.snow.css";
import "./style.css";
import { useHistory } from "react-router-dom";

const CommentElement = (props) => {
  const { getUserData, currentUser, getComments } = props;

  const [userData, setUserData] = useState("");
  const [deleteCommentPrompt, setDeleteCommentPrompt] = useState(false);
  const [commentData, setCommentData] = useState(props.comment);
  const [votes, setVotes] = useState({
    likes: props.comment.likes.map((vote) => vote.userID),
    dislikes: props.comment.dislikes.map((vote) => vote.userID),
  });

  const { body, created, updated, user, _id } = commentData;

  const allowedHTMLTags = ["h1", "h2", "u", "span", "s"];
  const history = useHistory();
  let canVote = true;

  const authorExists = () => {
    return !_.isEmpty(userData);
  };

  const getAuthorImage = () => {
    if (authorExists() && !_.isEmpty(userData.image.value)) {
      return userData.image.value;
    }
    return "";
  };

  const deleteComment = async () => {
    try {
      await axios.delete(`/api/builds/build/${_id}/comment`);
      getComments();
    } catch (error) {
      console.error(`Failed to delete comment. ${error.message}`);
    }
  };

  const setUpvote = async () => {
    if (!_.isEmpty(userData) && canVote) {
      canVote = false;
      try {
        const payload = {
          action: "upvote",
        };
        const upvoteResponse = await axios.put(
          `/api/builds/build/${_id}/comment/vote`,
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
    if (!_.isEmpty(userData) && canVote) {
      canVote = false;
      try {
        const payload = {
          action: "downvote",
        };
        const downvoteResponse = await axios.put(
          `/api/builds/build/${_id}/comment/vote`,
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

  useEffect(() => {
    const castUser = async () => {
      const userInfo = await getUserData(user);
      setUserData({ ...userInfo });
    };
    castUser();
  }, []);

  return (
    <div className="commentElementContainer">
      <div className="commentAvatarContainer">
        <div className="commentAvatar">
          <Avatar
            className="commentAvatar"
            shape="square"
            size="large"
            src={getAuthorImage()}
          />
        </div>
      </div>
      <div className="commentContentContainer">
        <Card className="commentCard">
          <div className="commentCardContent">
            <div className="commentCardTop">
              <span
                className="user"
                onClick={() => {
                  history.push(`/users/user/${userData._id}`);
                }}
              >
                {userData.displayName}
              </span>
              <span className="date">
                <Moment format="MMM DD[,] YYYY">{created}</Moment>
              </span>
            </div>
            <div className="commentCardMiddle">
              <div
                className="commentBody ql-editor"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(body, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(
                      allowedHTMLTags
                    ),
                    allowedAttributes: false,
                  }),
                }}
              ></div>
            </div>
            <div className="commentCardBottom">
              <div className="controlsLeft">
                <div className="commentUpvoteContainer">
                  <i
                    className={`fas ${
                      votes.likes.includes(currentUser && currentUser._id)
                        ? "fa-angle-double-up"
                        : "fa-chevron-up"
                    } commentUpvoteButton noSelectText`}
                    onClick={() => {
                      setUpvote();
                    }}
                  />
                  <span className="commentUpvoteCount">
                    {votes.likes.length}
                  </span>
                </div>
                <div className="commentDownvoteContainer">
                  <i
                    className={`fas ${
                      votes.dislikes.includes(currentUser && currentUser._id)
                        ? "fa-angle-double-down"
                        : "fa-chevron-down"
                    } commentDownvoteButton noSelectText`}
                    onClick={() => {
                      setDownvote();
                    }}
                  />
                  <span className="commentDownvoteCount">
                    {votes.dislikes.length}
                  </span>
                </div>
              </div>
              <div className="controlsRight">
                {!_.isEmpty(currentUser) && user === currentUser._id && (
                  <span className="commentControls edit noSelectText">
                    Edit
                  </span>
                )}
                {!_.isEmpty(currentUser) && user !== currentUser._id && (
                  <span className="commentControls reply noSelectText">
                    Reply
                  </span>
                )}
                {_.isEmpty(currentUser) || user !== currentUser._id ? (
                  <span className="commentControls report noSelectText">
                    Report
                  </span>
                ) : (
                  <></>
                )}
                {!_.isEmpty(currentUser) &&
                  user === currentUser._id &&
                  (deleteCommentPrompt ? (
                    <div className="deletePromptContainer">
                      Delete (
                      <span
                        onClick={() => {
                          deleteComment();
                        }}
                        className="commentControls deletePrompt yes noSelectText"
                      >
                        Yes
                      </span>
                      /
                      <span
                        onClick={() => {
                          setDeleteCommentPrompt(false);
                        }}
                        className="commentControls deletePrompt no noSelectText"
                      >
                        No
                      </span>
                      )
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setDeleteCommentPrompt(true);
                      }}
                      className="commentControls edit noSelectText"
                    >
                      Delete
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommentElement;
