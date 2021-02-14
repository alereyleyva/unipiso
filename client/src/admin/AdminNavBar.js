import React from "react";
import { Link } from "react-router-dom";

function AdminNavBar() {
  return (
    <div className={"navbar"}>
      <h1>UniPiso</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/admin/users"} className={"nav-link"}>
              Usuarios
            </Link>
          </li>
          <li>
            <Link to={"/admin/cuentas"} className={"nav-link"}>
              Cuentas
            </Link>
          </li>
          <li>
            <Link to="/" className={"nav-link"}>
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default AdminNavBar;
