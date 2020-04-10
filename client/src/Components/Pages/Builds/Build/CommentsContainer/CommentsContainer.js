import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Button, Pagination } from "antd";
import _ from "lodash";

import CustomQuill from "../../../../Shared/CustomQuill/CustomQuill";
import CommentElement from "../../../../Shared/CommentElement/CommentElement";

import "antd/dist/antd.css";
import "./style.css";
import axios from "axios";

const CommentsSectionHeader = (props) => {
  const { totalComments } = props;

  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Comments ({totalComments})</span>
      </Col>
    </Row>
  );
};

const CommentInput = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [emptyBoxError, setEmptyBoxError] = useState(false);
  const [postError, setPostError] = useState("");

  const handleSubmitComment = async () => {
    try {
      const payload = {
        commentInfo: commentInput,
      };

      const commentRes = await axios.post(
        `/api/builds/build/${props.buildId}/comment`,
        payload
      );
      props.getComments();
      props.setCommentContainer(false);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setPostError("You must be logged in to post a comment.");
      }
    }
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
          onChange={(e) => {
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
              handleSubmitComment();
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

const Comments = (props) => {
  const [commentContainer, setCommentContainer] = useState(false);

  return (
    <div className="commentsContainer">
      {!commentContainer ? (
        <div className="newCommentButtonContainer">
          <Button
            className={`newCommentButton${
              _.isEmpty(props.user) ? "-disabled" : ""
            }`}
            type="primary"
            onClick={() => {
              if (!_.isEmpty(props.user)) {
                setCommentContainer(true);
              }
            }}
          >
            <i className="fas fa-plus"></i> New Comment
          </Button>
        </div>
      ) : (
        <CommentInput
          user={props.user}
          buildId={props.buildId}
          setCommentContainer={setCommentContainer}
          getComments={props.getComments}
        />
      )}
      <span></span>
    </div>
  );
};

const CommentItems = (props) => {
  const { comments, getUserData, user } = props;
  return (
    <div className="commentItemsContainer">
      <div className="commentPaginationContainer">
        <Pagination
          className="commentPagination"
          defaultCurrent={1}
          total={500}
        />
      </div>
      {comments.comments.length > 0 ? (
        comments.comments.map((comment) => {
          return (
            <CommentElement
              key={comment._id}
              comment={comment}
              getUserData={getUserData}
              currentUser={user}
              getComments={props.getComments}
              total={props.comments.total}
            />
          );
        })
      ) : (
        <div className="emptyCommentsContainer">
          <span>No Comments... Yet</span>
        </div>
      )}
    </div>
  );
};

const CommentsContainer = (props) => {
  const [comments, setComments] = useState({
    comments: [],
    total: 0,
  });

  const getComments = async () => {
    try {
      const commentRes = await axios.get(
        `/api/builds/build/${props.buildId}/comment`
      );
      setComments({
        comments: commentRes.data.comments,
        total: commentRes.data.total,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Fragment>
      <CommentsSectionHeader totalComments={comments.total} />
      <Comments {...props} getComments={getComments} />
      <CommentItems
        comments={comments}
        getUserData={props.getUserData}
        user={props.user}
        getComments={getComments}
      />
    </Fragment>
  );
};

export default CommentsContainer;
