import React from "react";
import { useDispatch } from "react-redux";
import { login } from "auth/authActions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

function Login() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    dispatch(login(data, history, e));
  };

  return (
    <div id={"login"}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"username"}>
          Nombre de Usuario
          <input type="text" name={"username"} ref={register} />
        </label>

        <label htmlFor={"password"}>
          Contraseña
          <input type="password" name={"password"} ref={register} />
        </label>
        <Button type="primary" htmlType={"submit"}>
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}
export default Login;
