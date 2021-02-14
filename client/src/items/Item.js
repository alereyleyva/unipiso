import React from "react";
import { deleteItem } from "items/itemsActions";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Item({ item }) {
  return (
    <div id="item">
      <h3>{item.name}</h3>
      <Button onClick={deleteItem(item._id)}>
        <DeleteOutlined />
      </Button>
    </div>
  );
}
