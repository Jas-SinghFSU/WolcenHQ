import React from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import sanitizeHtml from "sanitize-html";
import Moment from "react-moment";

import "react-quill/dist/quill.snow.css";
import "./style.css";

const CommentElement = props => {
  const { body, created, dislikes, likes, updated, user } = props.comment;

  const allowedHTMLTags = ["h1", "h2", "u", "span", "s"];

  return (
    <div className="commentElementContainer">
      <div className="commentAvatarContainer">
        <div className="commentAvatar">
          <Avatar
            className="commentAvatar"
            shape="square"
            size="large"
            icon={<UserOutlined />}
          />
        </div>
      </div>
      <div className="commentContentContainer">
        <Card className="commentCard">
          <div className="commentCardContent">
            <div className="commentCardTop">
              <span className="user">Guko</span>
              <span className="date">
                <Moment format="MMM DD[,] YYYY">{props.created}</Moment>
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
                    allowedAttributes: false
                  })
                }}
              ></div>
            </div>
            <div className="commentCardBottom">
              <div className="controlsLeft">
                <div className="commentUpvoteContainer">
                  <i className="fas fa-chevron-up commentUpvoteButton noSelectText" />
                  <i
                    className="fas fa-angle-double-up commentUpvoteButton noSelectText"
                    style={{ display: "none" }}
                  />
                  <span className="commentUpvoteCount">142</span>
                </div>
                <div className="commentDownvoteContainer">
                  <i className="fas fa-chevron-down commentDownvoteButton noSelectText" />
                  <i
                    className="fas fa-angle-double-down commentDownvoteButton noSelectText"
                    style={{ display: "none" }}
                  />
                  <span className="commentDownvoteCount">25</span>
                </div>
              </div>
              <div className="controlsRight">
                <span className="commentControls edit noSelectText">Edit</span>
                <span className="commentControls reply noSelectText">
                  Reply
                </span>
                <span className="commentControls report noSelectText">
                  Report
                </span>
                <span className="commentControls delete noSelectText">
                  Delete
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommentElement;
