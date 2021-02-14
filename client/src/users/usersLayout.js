import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import GastosMain from "../gastos/GastosMain";
import Cuentas from "../cuentas/Cuentas";
import ItemList from "../items/ItemList";
import NavBar from "../components/NavBar/NavBar";

function UserLayout() {
  return (
    <>
      <NavBar />
      <div>
        <Switch>
          <Route path={"/user/gastos"} exact component={GastosMain} />
          <Route path={"/user/cuentas"} exact component={Cuentas} />
          <Route path={"/user/items"} exact component={ItemList} />

          <Redirect from={"/user"} to={"/user/gastos"} />
        </Switch>
      </div>
    </>
  );
}

export default UserLayout;
