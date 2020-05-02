import React, { useState, useEffect, Fragment } from "react";
import BuildSearch from "./BuildSearch/BuildSearch";
import BuildTable from "../../../Shared/BuildTable/BuildTable";
import CenteredLoader from "../../../Shared/CenteredLoader/CenteredLoader";

import { Row, Col, Pagination } from "antd";

import "./style.css";
import axios from "axios";

const BuildsHomeTitle = (props) => {
  return (
    <Row>
      <Col className="buildTitleCol" span={22} offset={1}>
        <div className="createBuildTitle">SEARCH BUILDS</div>
      </Col>
    </Row>
  );
};

const BuildsHome = () => {
  const [paging, setPaging] = useState({
    limit: 15,
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
    sortBy: "created",
    sortType: "descending",
  });

  const [builds, setBuilds] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [pageLoaded, setPageLoaded] = useState(false);
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
      };
      const buildsRes = await axios.post("/api/builds/fetch", payload);
      setBuilds({
        builds: buildsRes.data.builds,
        total: buildsRes.data.total,
      });
      setPageLoaded(true);
      setCanSort(true);
    } catch (error) {
      setCanSort(true);
      console.error(
        `An error occurred while fetching builds. ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, [paging, searchParams]);

  useEffect(() => {
    if (pageLoaded) {
      fetchBuilds();
    }
  }, [filters]);

  if (!builds) {
    return <CenteredLoader />;
  }

  const buildSearchProps = {
    paging,
    setPaging,
    setSearchParams,
    searchParams,
    setFilters,
    filters,
    canSort,
    setCanSort,
  };

  return (
    <Fragment>
      <div className="buildsHomeContainer">
        <BuildsHomeTitle />
        <Row className="buildsHomeRow">
          <Col span={20} offset={2}>
            <BuildSearch {...buildSearchProps} />
            {builds.total !== 0 && (
              <Pagination
                className="customPagination buildTablePaginationTop"
                current={curPage}
                total={builds ? builds.total : 0}
                pageSize={paging.limit}
                onChange={(page) => {
                  setPaging({
                    ...paging,
                    page,
                  });
                  setCurPage(page);
                }}
              />
            )}
            <BuildTable builds={builds} {...buildSearchProps} />
            {builds.total !== 0 && (
              <Pagination
                className="customPagination buildTablePaginationBottom"
                current={curPage}
                total={builds ? builds.total : 0}
                pageSize={paging.limit}
                onChange={(page) => {
                  setPaging({
                    ...paging,
                    page,
                  });
                  setCurPage(page);
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default BuildsHome;
