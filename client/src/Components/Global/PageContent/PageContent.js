import React from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Home from "../../../Components/Pages/Home/Home";
import Routes from "../../../Components/Routing/Routes";
import { sideNavSize } from "../../Constants/constants";

const PageContent = () => {
  return (
    <div
      className="pageContentContainer"
      style={{ width: `calc(100% - ${sideNavSize.expanded}px)` }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Routes} />
      </Switch>
    </div>
  );
};

export default PageContent;
