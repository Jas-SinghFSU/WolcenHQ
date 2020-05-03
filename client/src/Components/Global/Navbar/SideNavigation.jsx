import React, { useState, useContext, useEffect, Fragment } from "react";
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
  TeamOutlined,
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
        transition: "all 0.1s",
        WebkitTransition: "all 0.1s",
        backgroundColor: "rgb(23, 23, 27)",
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
            className="antdMenuItem myAccount"
            key="5"
            onClick={() => {
              _.isEmpty(user)
                ? handleBuildClick("/auth/login")
                : history.push("/myaccount");
            }}
          >
            {_.isEmpty(user) ? <LoginOutlined /> : <UserOutlined />}
            <span className="sideNavMenuLabel">{`${
              _.isEmpty(user) ? "Login/Register" : user.displayName
            }`}</span>
          </Menu.Item>
          {!_.isEmpty(user) && (
            <Menu.Item
              className="antdMenuItem menuAuth"
              key="6"
              onClick={() => {
                userContext.logout();
              }}
            >
              <Fragment>
                <LogoutOutlined />
                <span className="sideNavMenuLabel">Logout</span>
              </Fragment>
            </Menu.Item>
          )}
          <Menu.Item className="antdMenuItem menuQuickLinks" key="7" title={""}>
            <div
              className="quickLinksContainer"
              style={{ flexDirection: `${navCollapsed ? "column" : "row"}` }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/YN5CAy3"
              >
                <i class="fab fa-discord fa-2x" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeJMtbJEggXrWNkGXlxxdbqkcza1mFhi3yayWRa2s7pLsxOdQ/viewform"
              >
                <i
                  class="fas fa-bug fa-2x"
                  style={{ marginLeft: `${navCollapsed ? "0px" : "15px"}` }}
                />
              </a>
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SideNavigation;
