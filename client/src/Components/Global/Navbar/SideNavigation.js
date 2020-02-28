import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { useHistory } from "react-router-dom";
import { sideNavSize } from "../../Constants/constants";

import "antd/dist/antd.css";
import "./style.css";

const SideNavigation = () => {
  const history = useHistory();

  const [navCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = () => {
    setNavCollapsed(!navCollapsed);
  };

  const handleBuildClick = buildID => {
    history.push(`${buildID}`);
  };

  return (
    <div
      className="sideNavContainer"
      style={{
        "min-width": navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded
      }}
    >
      <Menu
        className="antdMenu"
        mode="inline"
        theme="dark"
        inlineCollapsed={navCollapsed}
        selectable={false}
      >
        <Menu.Item
          className="navCollapseToggler"
          key="1"
          onClick={toggleNavCollapsed}
          title={"Expand"}
        >
          <Icon type={navCollapsed ? "double-right" : "double-left"} />
          <span className="sideNavMenuLabel"> Collapse Menu </span>
        </Menu.Item>
        <Menu.Item
          className="antdMenuItem"
          key="2"
          onClick={() => {
            handleBuildClick("/");
          }}
        >
          <Icon type="home" />
          <span className="sideNavMenuLabel">Home</span>
        </Menu.Item>
        <Menu.Item
          className="antdMenuItem"
          key="3"
          onClick={() => {
            handleBuildClick("/builds/build/create");
          }}
        >
          <Icon type="container" />
          <span className="sideNavMenuLabel">Builds</span>
        </Menu.Item>
        <Menu.Item
          className="antdMenuItem"
          key="4"
          onClick={() => {
            handleBuildClick("/characters");
          }}
        >
          <Icon type="user" />
          <span className="sideNavMenuLabel">Characters</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNavigation;
