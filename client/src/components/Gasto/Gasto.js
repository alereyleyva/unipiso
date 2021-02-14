import React from "react";
import { deleteGasto } from "gastos/gastosActions";
import { Button, message } from "antd";
import { useSelector } from "react-redux";

function Gasto({ gasto }) {
  const { loading } = useSelector((state) => state.gastos);
  function info() {
    let mensaje = "";
    if (gasto.type === "Comun") mensaje = "Todos los usuarios";
    else {
      gasto.deben.forEach((user) => {
        mensaje += user.username + " ";
      });
    }
    message.info(mensaje);
  }
  return (
    <div className={"gasto"}>
      <span className="gasto__type">{gasto.type}</span>
      <span className="gasto__date">{gasto.date}</span>
      <div className={"gasto__content"}>
        <h4>
          {gasto.concept} {gasto.price}€
        </h4>
        <p>{gasto.paga.username}</p>
      </div>
      <div className={"gasto__btns"}>
        <Button
          type="primary"
          htmlType="button"
          onClick={deleteGasto(gasto._id)}
          disabled={loading}
        >
          Pagado
        </Button>
        <Button htmlType="button" onClick={info}>
          Afecta a...
        </Button>
      </div>
    </div>
  );
}

export default Gasto;
