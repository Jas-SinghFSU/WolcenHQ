import React, { Fragment, useState } from "react";
import { Row, Col, Button, Skeleton } from "antd";
import _ from "lodash";

import CustomQuill from "../../../../Shared/CustomQuill/CustomQuill";
import CommentElement from "../../../../Shared/CommentElement/CommentElement";

import "antd/dist/antd.css";
import "./style.css";

const CommentsSectionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Comments (127)</span>
      </Col>
    </Row>
  );
};

const CommentInput = props => {
  const [commentInput, setCommentInput] = useState("");
  const [emptyBoxError, setEmptyBoxError] = useState(false);
  const [postError, setPostError] = useState("");

  const handleSubmitComment = () => {
    return;
  };

  const isCommentEmpty = () => {
    const parser = new DOMParser();

    const { textContent } = parser.parseFromString(
      commentInput,
      "text/html"
    ).documentElement;
    return !textContent.trim();
  };

  return (
    <Fragment>
      <div className="commentInputContainer">
        <CustomQuill
          className="commentQuill"
          value={commentInput}
          onChange={e => {
            setCommentInput(e);
            setEmptyBoxError(false);
          }}
        />
        <span
          className="inputError buildComment"
          style={{ display: `${!emptyBoxError ? "none" : "inline"}` }}
        >
          A comment must contain some text.
        </span>
        <span
          className="inputError buildComment"
          style={{ display: `${_.isEmpty(postError) ? "none" : "inline"}` }}
        >
          {postError}
        </span>
      </div>
      <div className="commentInputButtons">
        <Button
          className="newCommentButton submit"
          type="primary"
          onClick={() => {
            if (isCommentEmpty()) {
              setEmptyBoxError(true);
            } else {
              props.setCommentContainer(false);
            }
          }}
        >
          Submit
        </Button>
        <Button
          className="newCommentButton cancel"
          type="primary"
          onClick={() => {
            props.setCommentContainer(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </Fragment>
  );
};

const Comments = props => {
  const [commentContainer, setCommentContainer] = useState(false);

  return (
    <div className="commentsContainer">
      {!commentContainer ? (
        <div className="newCommentButtonContainer">
          <Button
            className="newCommentButton"
            type="primary"
            onClick={() => {
              setCommentContainer(true);
            }}
          >
            <i className="fas fa-plus"></i> New Comment
          </Button>
        </div>
      ) : (
        <CommentInput setCommentContainer={setCommentContainer} />
      )}
      <span></span>
    </div>
  );
};

const CommentItems = props => {
  return (
    <div className="commentItemsContainer">
      <CommentElement />
    </div>
  );
};

const CommentsContainer = props => {
  return (
    <Fragment>
      <CommentsSectionHeader />
      <Comments {...props} />
      <CommentItems />
    </Fragment>
  );
};

export default CommentsContainer;
