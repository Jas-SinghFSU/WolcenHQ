import React from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./style.css";

const CommentElement = () => {
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
              <span className="date">Mar 31, 2020</span>
            </div>
            <div className="commentCardMiddle">
              <span>Comment body.</span>
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
