import React, { useState } from "react";
import { addGasto } from "gastos/gastosActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { Checkbox } from "antd";

function GastoForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { users } = state.users;
  const { loading } = state.gastos;

  const types = ["Comun", "Especifico", "Personal"];
  const [especifico, setEspecifico] = useState(false);
  const [deben, setDeben] = useState([]);
  const checkEspecifico = (value) => {
    if (value === "Especifico" || value === "Personal") {
      setEspecifico(true);
    } else {
      setEspecifico(false);
      setDeben([]);
    }
  };
  let checkboxOptions = [];
  users.forEach((user) => {
    checkboxOptions.push({
      label: user.username,
      value: user._id,
    });
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    var finalData;
    if (data.type === "Comun") {
      let debenComun = users.map((user) => user._id);
      debenComun = debenComun.filter((id) => id !== data.paga);
      finalData = {
        ...data,
        deben: debenComun,
      };
    } else {
      finalData = {
        ...data,
        deben: deben,
      };
    }
    dispatch(addGasto(finalData, e, setEspecifico));
  };

  return (
    <div id={"gastosform"}>
      <h2>Crea tu Gasto</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="concept">
          Concepto
          <input type="text" name="concept" ref={register} />
        </label>

        <label htmlFor="price">
          Precio
          <input
            type={"number"}
            step={"0.01"}
            min={0}
            ref={register}
            name={"price"}
          />
        </label>

        <label htmlFor="type">
          Tipo de Gasto
          <select
            name="type"
            ref={register}
            onChange={(e) => checkEspecifico(e.target.value)}
          >
            {types.map((type, key) => (
              <option key={key} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {especifico && (
          <label htmlFor="deben">
            Deben
            <Checkbox.Group
              onChange={(checkedValues) => setDeben(checkedValues)}
              options={checkboxOptions}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "6px 0",
                fontSize: "50px",
              }}
            />
          </label>
        )}

        <label htmlFor="paga">
          Paga
          <select ref={register} name="paga">
            <option value="Random">Elige persona</option>
            {users.map((user, key) => (
              <option key={key} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>

        <Button type="primary" htmlType="submit" loading={loading}>
          Crear Gasto
        </Button>
      </form>
    </div>
  );
}

export default GastoForm;
