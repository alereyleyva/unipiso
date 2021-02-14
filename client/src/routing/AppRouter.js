import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PageNotFound from "components/PageNotFound/PageNotFound";
import HomeLayout from "home/HomeLayout";
import UserLayout from "users/usersLayout";
import AdminLayout from "admin/AdminLayout";
import PrivateRoute from "routing/PrivateRoute";
import PublicRoute from "routing/PublicRoute";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <PublicRoute path={"/home"} component={HomeLayout} />
        <PrivateRoute path={"/user"} component={UserLayout} />
        <PrivateRoute path={"/admin"} component={AdminLayout} />

        <Redirect exact from={"/"} to={"/home"} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
