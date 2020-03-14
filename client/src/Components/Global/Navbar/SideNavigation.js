import React, { useState } from "react";
import { Menu, Icon, Layout } from "antd";
import { useHistory } from "react-router-dom";
import { sideNavSize } from "../../Constants/constants";

import "antd/dist/antd.css";
import "./style.css";

const { Sider, Content } = Layout;

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
    <Layout
      style={{
        maxWidth: navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded,
        minWidth: navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded,
        backgroundColor: "rgb(23, 23, 27)",
        transition: `min-width 0.2s, max-width 0.2s`,
        zIndex: 2
      }}
    >
      <Sider className="sideNavContainer" collapsed={navCollapsed}>
        <Menu mode="inline" theme="dark" selectable={false}>
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
      </Sider>
    </Layout>
  );
};

export default SideNavigation;
