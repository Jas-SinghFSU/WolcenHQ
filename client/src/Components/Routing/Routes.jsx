import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import BuildsHome from "../Pages/Builds/BuildsHome/BuildsHome";
import CreateBuild from "../Pages/Builds/CreateBuild/CreateBuild";
import Build from "../Pages/Builds/Build/Build";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import MyAccount from "../Pages/Account/MyAccount";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/builds" component={BuildsHome} />
      <Route exact path="/builds/build/:id" component={Build} />
      <Route exact path="/builds/create" component={CreateBuild} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <PrivateRoute exact path="/characters" component={CreateBuild} />
      <PrivateRoute exact path="/myaccount" component={MyAccount} />
    </Switch>
  );
};

export default Routes;
