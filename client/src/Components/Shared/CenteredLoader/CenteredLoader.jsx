import React from "react";

import { Spin } from "antd";

import "./style.css";

const CenteredLoader = () => {
  return (
    <div className="customLoader">
      <Spin size="large"></Spin>
    </div>
  );
};

export default CenteredLoader;
