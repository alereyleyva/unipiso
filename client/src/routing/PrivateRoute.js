import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { logged } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      component={(props) =>
        logged ? <Component {...props} /> : <Redirect to={"/home/login"} />
      }
    />
  );
}

export default PrivateRoute;
