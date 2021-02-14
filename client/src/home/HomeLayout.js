import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import NavBar from "components/NavBar/NavBar";

function HomeLayout() {
  return (
    <div id={"layout-home"}>
      <NavBar />
      <>
        <Switch>
          <Route exact path={"/home/login"} component={Login} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path={"/home/register"} component={Register} />
        </Switch>
      </>
    </div>
  );
}

export default HomeLayout;
