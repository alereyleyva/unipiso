import React from "react";

// Components
import Gasto from "../components/Gasto/Gasto";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function GastosList() {
  const { gastos, loading } = useSelector((state) => state.gastos);

  return (
    <div id={"gastoslist"}>
      <h2>Lista de Gastos</h2>
      <div id="gastoslist__list">
        {loading && gastos.length === 0 ? <LoadingOutlined /> : null}
        {gastos.length === 0 && !loading ? (
          <Empty description="Sin gastos" />
        ) : null}
        {!loading &&
          gastos.map((gasto, key) => <Gasto gasto={gasto} key={key} />)}
      </div>
    </div>
  );
}

export default GastosList;
