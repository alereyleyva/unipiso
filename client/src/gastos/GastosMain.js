import React from "react";

// Components
import GastoForm from "./GastoForm";
import GastosList from "./GastosList";

export default function GastosMain() {
  return (
    <div id={"gastos"}>
      <GastoForm />
      <GastosList />
    </div>
  );
}
