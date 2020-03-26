import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CreateBuild from "../Pages/Builds/CreateBuild/CreateBuild";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";

const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path="/builds" component={BuildsMain} /> */}
      {/* <Route exact path="/builds/build/:id" component={Build} />  */}
      <Route exact path="/builds/build/create" component={CreateBuild} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <PrivateRoute exact path="/characters" component={CreateBuild} />
    </Switch>
  );
};

export default Routes;
