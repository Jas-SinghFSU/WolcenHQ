import React from "react";

import "./style.css";

const CommentElement = () => {
  return (
    <div className="commentElementContainer">
      <div className="commentAvatar">
        <span>avatar</span>
      </div>
      <div className="commentContent">
        <span>content</span>
      </div>
    </div>
  );
};

export default CommentElement;
