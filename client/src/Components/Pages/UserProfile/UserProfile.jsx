import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Row, Col, Avatar, Pagination } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CenteredLoader from "../../Shared/CenteredLoader/CenteredLoader";
import BuildTable from "../../Shared/BuildTable/BuildTable";
import axios from "axios";

import "./style.css";

const UserBanner = (props) => {
  if (!props.user) {
    return <></>;
  }
  return (
    <div className="userBannerContainer">
      <Row>
        <Col span={20} offset={2}>
          <div className="bannerBackdrop">
            <div className="avatarContainer">
              <Avatar
                className="userBannerAvatar"
                size={128}
                shape="square"
                icon={<UserOutlined />}
                src={props.user.image.value}
              />
              <span className="avatarUserName">{props.user.displayName}</span>
              <div className="userStatisticsContent">
                <div className="userStatisticsContainer">
                  <span className="statisticLabel">Created</span>
                  <span className="statisticValue">
                    <Moment format="MMM DD[,] YYYY">
                      {props.user.created}
                    </Moment>
                  </span>
                </div>
                <div className="userStatisticsContainer">
                  <span className="statisticLabel">Builds Created</span>
                  <span className="statisticValue">{props.totalBuilds}</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UserProfile = (props) => {
  const [paging, setPaging] = useState({
    limit: 15,
    page: 1,
    sortBy: "created",
    searchValue: "",
  });
  const [searchParams] = useState({
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
        buildType: "created",
      };
      const buildsRes = await axios.post(
        `/api/builds/user/${props.match.params.id}`,
        payload
      );
      setBuilds({
        builds: buildsRes.data.builds,
        total: buildsRes.data.total,
        user: buildsRes.data.user,
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

  const buildSearchProps = {
    paging,
    setPaging,
    searchParams,
    setFilters,
    filters,
    canSort,
    setCanSort,
  };

  if (builds === null) {
    return <CenteredLoader />;
  } else if (builds.user === null) {
    return (
      <div className="userNotFoundError">
        <span className="userNotFoundText">User not found.</span>
      </div>
    );
  }

  return (
    <div className="myAccountContainer">
      <UserBanner user={builds.user} totalBuilds={builds.total} />
      <Row>
        <Col span={20} offset={2}>
          <div className="userProfileContent">
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
