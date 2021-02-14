import React from "react";

function CuentaUser({ user }) {
  const total = user.faltan - user.debe;
  return (
    <div className={"cuentas__user"}>
      <h2>{user.username}</h2>
      <h4>Debe: {user.debe.toFixed(2)}€</h4>
      <h4>Faltan: {user.faltan.toFixed(2)}€</h4>
      <h3 className={total >= 0 ? "positive" : "negative"}>
        ±: {total.toFixed(2)}€
      </h3>
    </div>
  );
}

export default CuentaUser;
