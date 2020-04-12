import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Button, Pagination } from "antd";
import _ from "lodash";
import ReactTooltip from "react-tooltip";

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

      await axios.post(`/api/builds/build/${props.buildId}/comment`, payload);
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
          className="newCommentButton customDefault cancel"
          onClick={() => {
            props.setCommentContainer(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="newCommentButton customPrimary submit"
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
            data-tip
            data-for={"disabledCommentTooltip"}
            className={`newCommentButton${
              _.isEmpty(props.user) ? "-disabled" : ""
            } customPrimary${_.isEmpty(props.user) ? "-disabled" : ""}`}
            type="primary"
            onClick={() => {
              if (!_.isEmpty(props.user)) {
                setCommentContainer(true);
              }
            }}
          >
            <i className="fas fa-plus"></i> New Comment
            {_.isEmpty(props.user) && (
              <ReactTooltip
                id="disabledCommentTooltip"
                effect="float"
                place="top"
              >
                <span>Please log in to comment.</span>
              </ReactTooltip>
            )}
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
  const [curPage, setCurPage] = useState(1);

  return (
    <div className="commentItemsContainer">
      {comments.comments.length > 0 && (
        <div className="commentPaginationContainer">
          <Pagination
            className="customPagination"
            current={curPage}
            total={props.comments.total}
            onChange={(page) => {
              props.getComments(page);
              setCurPage(page);
            }}
          />
        </div>
      )}
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
              setCurPage={setCurPage}
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

  const getComments = async (page = 1) => {
    try {
      const commentRes = await axios.post(
        `/api/builds/build/${props.buildId}/comment/page`,
        { page }
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
