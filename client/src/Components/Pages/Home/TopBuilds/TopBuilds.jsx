import React, { useState, useEffect } from "react";
import { Row, Col, Radio } from "antd";
import axios from "axios";
import Moment from "react-moment";

import BuildTable from "../../../Shared/BuildTable/BuildTable";

import "./style.css";

const TopBuildsHeader = (props) => {
  return (
    <Row>
      <Col span={18} offset={3}>
        <div className="homeSectionLabel topBuilds">Top Builds</div>
      </Col>
    </Row>
  );
};

const TopBuilds = () => {
  const [paging, setPaging] = useState({
    limit: 10,
    page: 1,
    sortBy: "created",
    searchValue: "",
  });
  const [searchParams, setSearchParams] = useState({
    filter: "buildTitle",
    combatType: "all",
    playstyle: "all",
  });
  const [filters, setFilters] = useState({
    sortBy: "votes",
    sortType: "descending",
    timeFilter: "monthly",
  });
  const [builds, setBuilds] = useState(null);
  const [canSort, setCanSort] = useState(false);

  const fetchBuilds = async () => {
    try {
      setCanSort(false);
      const payload = {
        ...paging,
        filter: searchParams.filter,
        combatType: searchParams.combatType,
        playstyle: searchParams.playstyle,
        sortBy: filters.sortBy,
        sortType: filters.sortType,
        timeFilter: filters.timeFilter,
      };
      const buildsRes = await axios.post("/api/builds/fetch", payload);
      setBuilds({
        builds: buildsRes.data.builds,
        total: buildsRes.data.total,
      });
      setCanSort(true);
    } catch (error) {
      setCanSort(true);
      console.error("An error occurred while fetching builds.");
    }
  };

  const getUserData = async (userInfo) => {
    if (userInfo !== null && userInfo !== "Anonymous") {
      try {
        const userData = await axios.get(`/api/users/user/${userInfo}`);
        return userData.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      return {};
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, [filters.timeFilter]);

  const buildSearchProps = {
    setSearchParams,
    searchParams,
    setFilters,
    filters,
    canSort,
    setCanSort,
  };

  return (
    <div className="topBuildsContainer">
      <TopBuildsHeader />
      <Row>
        <Col span={18} offset={3}>
          <Radio.Group
            className="topBuildsButtonContainer"
            value={filters.timeFilter}
            onChange={(e) => {
              setFilters({ ...filters, timeFilter: e.target.value });
            }}
          >
            <Radio.Button className="customRadioButton" value="daily">
              Daily
            </Radio.Button>
            <Radio.Button className="customRadioButton" value="weekly">
              Weekly
            </Radio.Button>
            <Radio.Button className="customRadioButton" value="monthly">
              Monthly
            </Radio.Button>
            <Radio.Button className="customRadioButton" value="yearly">
              Yearly
            </Radio.Button>
            <Radio.Button className="customRadioButton" value="">
              All Time
            </Radio.Button>
          </Radio.Group>
          <BuildTable
            builds={builds}
            getUserData={getUserData}
            {...buildSearchProps}
            disableSort={true}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TopBuilds;
