import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./Contexts/UserProvider";
import SideNavigation from "./Components/Global/Navbar/SideNavigation";
import Home from "./Components/Pages/Home/Home";
import Routes from "./Components/Routing/Routes";
import { sideNavSize } from "./Components/Constants/constants";

import "./App.css";
import "./antdCustoms.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <Fragment>
          <div className="contentContainer">
            <SideNavigation />
            <Switch>
              <Fragment>
                <div
                  className="pageContentContainer"
                  style={{ width: `calc(100% - ${sideNavSize.expanded}px)` }}
                >
                  <Route exact path="/" component={Home} />
                  <Route component={Routes} />
                </div>
              </Fragment>
            </Switch>
          </div>
        </Fragment>
      </UserProvider>
    </Router>
  );
}

export default App;
