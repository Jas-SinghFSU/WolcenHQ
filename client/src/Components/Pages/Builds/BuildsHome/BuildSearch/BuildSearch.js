import React from "react";
import { Input, Dropdown, Button, Menu } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import "./style.css";

const { Search } = Input;

const BuildSearch = ({ paging, setPaging, searchParams, setSearchParams }) => {
  const handleMenuClick = (e) => {
    setSearchParams({ ...searchParams, filter: e.key });
  };
  const handlePlaystyleClick = (e) => {
    setSearchParams({ ...searchParams, playstyle: e.key });
  };
  const handleCombatTypeClick = (e) => {
    setSearchParams({ ...searchParams, combatType: e.key });
  };
  const searchByMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="buildTitle">Build Title</Menu.Item>
      <Menu.Item key="author">Author</Menu.Item>
    </Menu>
  );

  const playstyleMenu = (
    <Menu onClick={handlePlaystyleClick}>
      <Menu.Item key="all">All Playstyles</Menu.Item>
      <Menu.Item key="Solo">Solo</Menu.Item>
      <Menu.Item key="Group">Group</Menu.Item>
      <Menu.Item key="Solo + Group">Solo + Group</Menu.Item>
    </Menu>
  );

  const combatTypeMenu = (
    <Menu onClick={handleCombatTypeClick}>
      <Menu.Item key="all">All Combat Types</Menu.Item>
      <Menu.Item key="Melee">Melee</Menu.Item>
      <Menu.Item key="Caster">Caster</Menu.Item>
      <Menu.Item key="Ranged">Ranged</Menu.Item>
      <Menu.Item key="Tank">Tank</Menu.Item>
    </Menu>
  );

  return (
    <div className="buildSearchContainer">
      <Dropdown overlay={playstyleMenu}>
        <Button className="buildFilterButton">
          {searchParams.playstyle === "all"
            ? "Playstyle"
            : searchParams.playstyle}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown overlay={combatTypeMenu}>
        <Button className="buildFilterButton">
          {searchParams.combatType === "all"
            ? "Combat Type"
            : searchParams.combatType}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown overlay={searchByMenu}>
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
