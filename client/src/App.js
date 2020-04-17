import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./Contexts/UserProvider";
import GenericContext from "./Contexts/GenericContext";
import SideNavigation from "./Components/Global/Navbar/SideNavigation";
import Home from "./Components/Pages/Home/Home";
import Routes from "./Components/Routing/Routes";
import { sideNavSize } from "./Components/Constants/constants";

import "./App.css";
import "./antdCustoms.css";

const RouterData = () => {
  const { sidebarWidth } = useContext(GenericContext.context);

  return (
    <Fragment>
      <div
        className="pageContentContainer"
        style={{
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <Route exact path="/" component={Home} />
        <Route component={Routes} />
      </div>
    </Fragment>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <GenericContext>
          <Fragment>
            <div className="contentContainer">
              <SideNavigation />
              <Switch>
                <RouterData />
              </Switch>
            </div>
          </Fragment>
        </GenericContext>
      </UserProvider>
    </Router>
  );
}

export default App;
