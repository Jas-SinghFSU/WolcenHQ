import React from "react";
import { Avatar, Card } from "antd";

import "./style.css";

const CommentElement = () => {
  return (
    <div className="commentElementContainer">
      <div className="commentAvatarContainer">
        <Avatar
          className="commentAvatar"
          shape="square"
          size="large"
          icon="user"
        />
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
              <span className="controlsLeft">Like Dislike Reply</span>
              <span className="controlsRight">Report</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommentElement;
