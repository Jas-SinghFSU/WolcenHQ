import React, { useContext, useState, useEffect } from "react";
import UserProvider from "../../Contexts/UserProvider";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

import "./style.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState(null);
  const userContext = useContext(UserProvider.context);
  useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user]);
  return (
    <Route
      {...rest}
      render={props =>
        user === null ? (
          <div></div>
        ) : _.isEmpty(user) ? (
          <Redirect to="/auth/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
