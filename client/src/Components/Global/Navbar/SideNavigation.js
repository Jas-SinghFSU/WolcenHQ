import React, { useEffect, useState } from "react";
import { Menu, Icon, Button } from "antd";
import { sideNavSize } from "../../Constants/constants";

import "antd/dist/antd.css";
import "./style.css";

const { SubMenu } = Menu;

const SideNavigation = () => {
  const [navCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = () => {
    setNavCollapsed(!navCollapsed);
  };

  return (
    <div
      className="sideNavContainer"
      style={{
        width: navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded
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
          className="antdMenuItem"
          key="0"
          className="navCollapseToggler"
          onClick={toggleNavCollapsed}
        >
          <Icon type={navCollapsed ? "double-right" : "double-left"} />
          {!navCollapsed ? (
            <span className="sideNavMenuLabel"> Hide </span>
          ) : (
            <span> Show Menu </span>
          )}
        </Menu.Item>
        <Menu.Item className="antdMenuItem" key="1">
          <Icon type="home" />
          <span className="sideNavMenuLabel">Home</span>
        </Menu.Item>
        <Menu.Item className="antdMenuItem" key="2">
          <Icon type="container" />
          <span className="sideNavMenuLabel">Builds</span>
        </Menu.Item>
        <Menu.Item className="antdMenuItem" key="3">
          <Icon type="user" />
          <span className="sideNavMenuLabel">Characters</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNavigation;
