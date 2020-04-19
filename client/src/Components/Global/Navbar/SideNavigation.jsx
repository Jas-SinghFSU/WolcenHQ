import React, { useState, useContext, useEffect } from "react";
import UserProvider from "../../../Contexts/UserProvider";
import axios from "axios";
import { Menu, Icon, Layout } from "antd";
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  HomeOutlined,
  ContainerOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { sideNavSize } from "../../Constants/constants";
import _ from "lodash";
import GenericContext from "../../../Contexts/GenericContext";
import WolcenLogo from "../../../images/WolcenHQ_T.png";

import "antd/dist/antd.css";
import "./style.css";

const { Sider } = Layout;

const SideNavigation = () => {
  const history = useHistory();
  const userContext = useContext(UserProvider.context);
  const { sidebarWidth, setSidebarWidth } = useContext(GenericContext.context);

  const [navCollapsed, setNavCollapsed] = useState(false);
  const [user, setUser] = useState({});
  const toggleNavCollapsed = () => {
    setNavCollapsed(!navCollapsed);
  };

  const handleBuildClick = (buildID) => {
    history.push(`${buildID}`);
  };

  useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user]);

  useEffect(() => {
    if (navCollapsed) {
      setSidebarWidth("80px");
    } else {
      setSidebarWidth("20%");
    }
  }, [navCollapsed]);

  return (
    <Layout
      style={{
        width: navCollapsed ? sideNavSize.collapsed : sideNavSize.expanded,
        minWidth: !navCollapsed ? 200 : "unset",
        maxWidth: 330,
        backgroundColor: "rgb(23, 23, 27)",
        transition: `min-width 0.2s, max-width 0.2s`,
        WebkitTransition: "min-width 0.2s, max-width 0.2s",
        zIndex: 2,
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
            {navCollapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            <span className="sideNavMenuLabel"> Collapse Menu </span>
          </Menu.Item>
          <div className="navLogoContainer">
            <img src={WolcenLogo} alt="Wolcen Logo" className="wolcenNavLogo" />
          </div>
          <Menu.Item
            className="antdMenuItem menuHome"
            key="2"
            onClick={() => {
              handleBuildClick("/");
            }}
          >
            <HomeOutlined />
            <span className="sideNavMenuLabel">Home</span>
          </Menu.Item>
          <Menu.Item
            className="antdMenuItem menuCreate"
            key="3"
            onClick={() => {
              handleBuildClick("/builds/create");
            }}
          >
            <FileAddOutlined />
            <span className="sideNavMenuLabel">Create a Build</span>
          </Menu.Item>
          <Menu.Item
            className="antdMenuItem menuBuilds"
            key="4"
            onClick={() => {
              handleBuildClick("/builds");
            }}
          >
            <ContainerOutlined />
            <span className="sideNavMenuLabel">Builds</span>
          </Menu.Item>
          <Menu.Item
            className="antdMenuItem menuCharacters"
            key="5"
            onClick={() => {
              handleBuildClick("/characters");
            }}
          >
            <UserOutlined />
            <span className="sideNavMenuLabel">Characters</span>
          </Menu.Item>
          <Menu.Item
            className="antdMenuItem menuAuth"
            key="6"
            onClick={() => {
              _.isEmpty(user)
                ? handleBuildClick("/auth/login")
                : userContext.logout();
            }}
          >
            {_.isEmpty(user) ? <LoginOutlined /> : <LogoutOutlined />}
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
