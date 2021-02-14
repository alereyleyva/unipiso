import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "auth/authActions";
import { UserOutlined } from "@ant-design/icons";

export default function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, logged, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/home");
  };

  return (
    <div className="navbar">
      <h1 className="navbar__title">UniPiso</h1>
      <nav>
        {!loading && logged ? (
          <>
            <div className="navbar__user">
              <h4 className="navbar__user__username">{user.username}</h4>
              <UserOutlined className="navbar__user__icon" />
            </div>
            <ul>
              <li>
                <Link to={"/user/items"} className={"navbar__nav-link"}>
                  Items
                </Link>
              </li>
              <li>
                <Link to={"/user/gastos"} className={"navbar__nav-link"}>
                  Gastos
                </Link>
              </li>
              <li>
                <Link to={"/user/cuentas"} className={"navbar__nav-link"}>
                  Cuentas
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  to="/"
                  className={"navbar__nav-link"}
                >
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <ul>
            <li>
              <Link to={"/home/login"} className={"navbar__nav-link"}>
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to={"/home/register"} className={"navbar__nav-link"}>
                Registrarse
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
