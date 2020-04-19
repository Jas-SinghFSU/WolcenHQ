import React from "react";
import { Row, Col } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import "./style.css";
const ListHeader = (props) => {
  const renderArrowFor = (sortByVal) => {
    if (props.disableSort) {
      return;
    }
    if (sortByVal === props.filters.sortBy) {
      if (props.filters.sortType === "descending") {
        return <CaretUpOutlined className="tUpArrow" />;
      } else if (props.filters.sortType === "ascending") {
        return <CaretDownOutlined className="tDownArrow" />;
      }
    }
  };

  const handleHeaderClickFor = (sortByVal) => {
    if (!props.canSort || props.disableSort) {
      return;
    }
    // If first click (set to ascending)
    if (sortByVal !== props.filters.sortBy) {
      props.setFilters({
        ...props.filters,
        sortBy: sortByVal,
        sortType: "ascending",
      });
    } else {
      if (props.filters.sortType === "") {
        props.setFilters({
          ...props.filters,
          sortType: "ascending",
        });
      }
      // If currently set to ascending, the set to ascending
      else if (props.filters.sortType === "ascending") {
        props.setFilters({
          ...props.filters,
          sortType: "descending",
        });
        // If currently set to ascending, the set to clear
      } else {
        props.setFilters({
          ...props.filters,
          sortType: "",
        });
      }
    }
  };

  return (
    <Row>
      <Col className="buildsListHeader" span={7} offset={0}>
        <span
          className="headerTitle tBuildName noSelectText"
          onClick={() => {
            handleHeaderClickFor("buildTitle");
          }}
        >
          Build Name{renderArrowFor("buildTitle")}
        </span>
      </Col>
      <Col className="buildsListHeader" span={4} offset={0}>
        <span className="headerTitle noSelectText">Type</span>
      </Col>
      <Col className="buildsListHeader" span={8} offset={0}>
        <span className="headerTitle noSelectText">Spells</span>
      </Col>
      <Col className="buildsListHeader" span={2} offset={0}>
        <span
          className="headerTitle noSelectText"
          onClick={() => {
            handleHeaderClickFor("votes");
          }}
        >
          Likes{renderArrowFor("votes")}
        </span>
      </Col>
      <Col className="buildsListHeader" span={3} offset={0}>
        <span
          className="headerTitle noSelectText"
          onClick={() => {
            handleHeaderClickFor("lastUpdated");
          }}
        >
          Last Updated{renderArrowFor("lastUpdated")}
        </span>
      </Col>
    </Row>
  );
};

export default ListHeader;
