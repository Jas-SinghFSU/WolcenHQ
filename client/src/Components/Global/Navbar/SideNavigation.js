import React, { useState, useContext, useEffect } from "react";
import UserProvider from "../../../Contexts/UserProvider";
import axios from "axios";
import { Menu, Icon, Layout } from "antd";
import { useHistory } from "react-router-dom";
import { sideNavSize } from "../../Constants/constants";
import _ from "lodash";

import "antd/dist/antd.css";
import "./style.css";

const { Sider } = Layout;

const SideNavigation = () => {
  const history = useHistory();
  const userContext = useContext(UserProvider.context);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [user, setUser] = useState({});
  const toggleNavCollapsed = () => {
    setNavCollapsed(!navCollapsed);
  };

  const handleBuildClick = buildID => {
    history.push(`${buildID}`);
  };

  useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user]);

  return (
    <Layout
      style={{
        maxWidth: navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded,
        minWidth: navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded,
        backgroundColor: "rgb(23, 23, 27)",
        transition: `min-width 0.2s, max-width 0.2s`,
        WebkitTransition: "min-width 0.2s, max-width 0.2s",
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
          <Menu.Item
            className="antdMenuItem"
            key="5"
            onClick={() => {
              _.isEmpty(user)
                ? handleBuildClick("/auth/login")
                : userContext.logout();
            }}
          >
            <Icon type={`${_.isEmpty(user) ? "login" : "logout"}`} />
            <span className="sideNavMenuLabel">{`${
              _.isEmpty(user)
                ? "Login/Register"
                : `${user.displayName} (Logout)`
            }`}</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SideNavigation;
