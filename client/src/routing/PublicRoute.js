import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  const { logged } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      component={(props) =>
        logged ? <Redirect to={"/user"} /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
