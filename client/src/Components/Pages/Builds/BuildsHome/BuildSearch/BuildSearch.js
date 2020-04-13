import React from "react";
import { Input, Dropdown, Button, Menu } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import "./style.css";

const { Search } = Input;

const BuildSearch = ({ paging, setPaging, searchParams, setSearchParams }) => {
  const handleMenuClick = (e) => {
    setSearchParams({ ...searchParams, filter: e.key });
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="buildTitle">Build Title</Menu.Item>
      <Menu.Item key="author">Author</Menu.Item>
    </Menu>
  );

  return (
    <div className="buildSearchContainer">
      <Dropdown overlay={menu}>
        <Button className="buildFilterButton">
          {searchParams.filter === "author" ? "Author" : "Build Name"}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
      <Search
        className="buildSearchComponent"
        placeholder="Search builds..."
        enterButton="Search"
        size="large"
        onSearch={(value) => {
          setPaging({ ...paging, searchValue: value });
        }}
      />
    </div>
  );
};

export default BuildSearch;
