import React, { useState, useEffect, Fragment } from "react";
import BuildTable from "../../../Shared/BuildTable/BuildTable";
import CenteredLoader from "../../../Shared/CenteredLoader/CenteredLoader";

import { Row, Col, Pagination } from "antd";

import "./style.css";
import axios from "axios";

const BuildsHome = () => {
  const [paging, setPaging] = useState({
    limit: 10,
    page: 1,
    sortBy: "created",
  });

  const [builds, setBuilds] = useState(null);
  const [curPage, setCurPage] = useState(1);

  const fetchBuilds = async () => {
    try {
      const buildsRes = await axios.post("/api/builds/fetch", paging);
      setBuilds({
        builds: buildsRes.data.builds,
        total: buildsRes.data.total,
      });
    } catch (error) {
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
  }, [paging]);

  if (!builds) {
    return <CenteredLoader />;
  }

  return (
    <div className="buildsHomeContainer">
      <Row className="buildsHomeRow">
        <Col span={22} offset={1}>
          <Pagination
            className="customPagination buildTablePaginationTop"
            current={curPage}
            total={builds ? builds.total : 0}
            onChange={(page) => {
              setPaging({
                ...paging,
                page,
              });
              setCurPage(page);
            }}
          />
          <BuildTable builds={builds} getUserData={getUserData} />
          <Pagination
            className="customPagination buildTablePaginationBottom"
            current={curPage}
            total={builds ? builds.total : 0}
            onChange={(page) => {
              setPaging({
                ...paging,
                page,
              });
              setCurPage(page);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BuildsHome;
