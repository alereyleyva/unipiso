import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser } from "users/usersActions";
import { Button } from "antd";

function Register() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    dispatch(registerUser(data, e));
  };

  return (
    <div id={"register"}>
      <h2>Registra tu Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre y Apellidos
          <input type="text" name={"name"} ref={register} />
        </label>
        <label>
          Nombre de Usuario
          <input type="text" name={"username"} ref={register} />
        </label>
        <label>
          Email
          <input type="email" name={"email"} ref={register} />
        </label>
        <label>
          Password
          <input type="password" name={"password"} ref={register} />
        </label>

        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </form>
    </div>
  );
}
export default Register;
