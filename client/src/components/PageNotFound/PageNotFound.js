import React from "react";
import { QuestionOutlined } from "@ant-design/icons";

function PageNotFound() {
  return (
    <div className="page404">
      <h1 className="page404__title">Página no encontrada</h1>
      <QuestionOutlined className="page404__icon" />
      <h1 className="page404__title">404</h1>
    </div>
  );
}

export default PageNotFound;
