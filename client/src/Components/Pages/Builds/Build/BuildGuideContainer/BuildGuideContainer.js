import React, { Fragment } from "react";
import { Row, Col } from "antd";
import sanitizeHtml from "sanitize-html";
import "react-quill/dist/quill.snow.css";

import "./style.css";

const defaultDescription = require("../../../../Constants/constants")
  .buildDescription.default;

const BiuldDescriptionHeader = () => {
  return (
    <Row className="statPointsRow">
      <Col className="statPointsCol" span={24} offset={0}>
        <span className="sectionLabel">Build Guide</span>
      </Col>
    </Row>
  );
};

const BuildGuideBody = ({ buildDescription, buildVideo }) => {
  const allowedHTMLTags = ["h1", "h2", "u", "span", "s"];
  return (
    <Fragment>
      <div
        className="buildDescriptionBody ql-editor"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(
            `${
              buildDescription !== defaultDescription
                ? buildDescription
                : "<span style='color: rgba(218, 218, 218, 0.32); font-style: italic'>There seems to be nothing here...<span>"
            }`,
            {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(
                allowedHTMLTags
              ),
              allowedAttributes: false
            }
          )
        }}
      ></div>
    </Fragment>
  );
};

const BuildGuideContainer = props => {
  return (
    <Fragment>
      <BiuldDescriptionHeader />
      <BuildGuideBody {...props} />
    </Fragment>
  );
};

export default BuildGuideContainer;
