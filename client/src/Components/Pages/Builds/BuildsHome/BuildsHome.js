import React, { useState, useEffect } from "react";
import BuildTable from "../../../Shared/BuildTable/BuildTable";

import { Row, Col } from "antd";

import "./style.css";
import axios from "axios";

const BuildsHome = () => {
  const [paging, setPaging] = useState({
    limit: 10,
    page: 1,
    sortBy: "created",
  });

  const [builds, setBuilds] = useState(null);

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

  useEffect(() => {
    fetchBuilds();
  }, []);
  return (
    <div className="buildsHomeContainer">
      <Row className="buildsHomeRow">
        <Col span={22} offset={1}>
          <BuildTable builds={builds} />
        </Col>
      </Row>
    </div>
  );
};

export default BuildsHome;
