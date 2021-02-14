import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "items/Item";
import { useForm } from "react-hook-form";
import { addItem } from "items/itemsActions";
import { Button, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ItemList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);
  const { register, handleSubmit } = useForm();

  const saveItem = async (data, e) => {
    e.preventDefault();
    dispatch(addItem(data, e));
  };

  const ShowList = items.map((i, key) => <Item key={key} item={i} />);

  return (
    <div id={"items"}>
      <div id="items__form">
        <h1>Crea Item</h1>
        <form onSubmit={handleSubmit(saveItem)} autoComplete="off">
          <input name="name" ref={register} />
          <Button type={"primary"} htmlType="submit">
            Guardar Item
          </Button>
        </form>
      </div>
      <div id="items__list">
        <h1>Lista de Items</h1>
        {loading && items.length === 0 ? <LoadingOutlined /> : null}
        {items.length === 0 && !loading ? (
          <Empty description="Sin items" />
        ) : (
          ShowList
        )}
      </div>
    </div>
  );
}

export default ItemList;
