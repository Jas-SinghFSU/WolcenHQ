import React, { useEffect, useState } from "react";
import BuildTable from "../../../Shared/BuildTable/BuildTable";
import axios from "axios";
import CenteredLoader from "../../../Shared/CenteredLoader/CenteredLoader";
import { Pagination } from "antd";

import "./style.css";

const CreatedBuilds = (props) => {
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
      const buildsRes = await axios.post("/api/users/self", payload);
      setBuilds({
        builds: buildsRes.data.builds,
        total: buildsRes.data.total,
      });
      setPageLoaded(true);
      setCanSort(true);
      props.setUserData(buildsRes.data);
    } catch (error) {
      setCanSort(true);
      console.error("An error occurred while fetching builds.");
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
  }

  return (
    <div>
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
  );
};

export default CreatedBuilds;
