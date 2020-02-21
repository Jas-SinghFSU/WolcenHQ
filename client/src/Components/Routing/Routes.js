import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateBuild from "../Pages/Builds/CreateBuild/CreateBuild";

const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path="/builds" component={BuildsMain} /> */}
      {/* <Route exact path="/builds/build/:id" component={Build} />  */}
      <Route exact path="/builds/build/create" component={CreateBuild} />
    </Switch>
  );
};

export default Routes;
