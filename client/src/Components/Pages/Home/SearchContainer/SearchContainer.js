import React from "react";
import { Input } from "antd";

import "./style.css";

const { Search } = Input;

const SearchContainer = () => {
  return (
    <div className="searchBuildContainer">
      <span className="searchBuildLabel">Search for a build</span>
      <Search
        placeholder="Build name..."
        enterButton="Search"
        size="large"
        onSearch={value => console.log(value)}
        style={{ width: 400 }}
      />
    </div>
  );
};

export default SearchContainer;
