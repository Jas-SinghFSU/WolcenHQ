import React from "react";
import { Row, Col } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import "./style.css";
const ListHeader = (props) => {
  const { setFilters, filters, canSort } = props;
  const { sortBy, sortType } = filters;

  const renderArrowFor = (sortByVal) => {
    if (sortByVal === sortBy) {
      if (sortType === "ascending") {
        return <CaretUpOutlined />;
      } else if (sortType === "descending") {
        return <CaretDownOutlined />;
      }
    }
  };

  const handleHeaderClickFor = (sortByVal) => {
    if (!canSort) {
      return;
    }
    // If first click (set to ascending)
    if (sortByVal !== sortBy) {
      setFilters({
        ...filters,
        sortBy: sortByVal,
        sortType: "ascending",
      });
    } else {
      if (sortType === "") {
        setFilters({
          ...filters,
          sortType: "ascending",
        });
      }
      // If currently set to ascending, the set to descending
      else if (sortType === "ascending") {
        setFilters({
          ...filters,
          sortType: "descending",
        });
        // If currently set to descending, the set to clear
      } else {
        setFilters({
          ...filters,
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
        <span className="headerTitle noSelectText">Likes</span>
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
