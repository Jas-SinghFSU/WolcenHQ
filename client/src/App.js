import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNavigation from "./Components/Global/Navbar/SideNavigation";
import Home from "./Components/Pages/Home/Home";
import Routes from "./Components/Routing/Routes";
import { sideNavSize } from "./Components/Constants/constants";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="contentContainer">
          <SideNavigation />
          <Switch>
            <div
              className="pageContentContainer"
              style={{ width: `calc(100% - ${sideNavSize.expanded}px)` }}
            >
              <Route exact path="/" component={Home} />
              <Route component={Routes} />
            </div>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
