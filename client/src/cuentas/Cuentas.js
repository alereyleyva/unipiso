import React from "react";
import { useSelector } from "react-redux";

// Components
import CuentaUser from "./CuentaUser";

export default function Cuentas() {
  const { users, loading } = useSelector((state) => state.users);

  return (
    <div className={"cuentas"}>
      {loading ? (
        <span style={{ textAlign: "center" }}>Calculando Cuentas...</span>
      ) : null}
      {users.map((user, key) => {
        return <CuentaUser key={key} user={user} />;
      })}
    </div>
  );
}
