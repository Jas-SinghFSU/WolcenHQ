import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateBuild from "../Pages/Builds/CreateBuild/CreateBuild";
import Register from "../Pages/Authentication/Register";

const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path="/builds" component={BuildsMain} /> */}
      {/* <Route exact path="/builds/build/:id" component={Build} />  */}
      <Route exact path="/builds/build/create" component={CreateBuild} />
      <Route exact path="/auth/login" component={Register} />
      <Route exact path="/auth/register" component={Register} />
    </Switch>
  );
};

export default Routes;
