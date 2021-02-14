import {
  ADD_ITEM_SUCCESS,
  ITEMS_ACTION_FAIL,
  ITEMS_ACTION_STARTED,
  SET_ITEMS_SUCCESS,
} from "../actions/types";
import API from "api";
import { store } from "store/store";
import { getAccessToken } from "auth/authService";
import { notification } from "antd";

export const addItemSuccess = (item) => {
  return {
    type: ADD_ITEM_SUCCESS,
    payload: item,
  };
};

export const setItemsSuccess = (items) => {
  return {
    type: SET_ITEMS_SUCCESS,
    payload: items,
  };
};

export const itemsActionFail = (message) => {
  return {
    type: ITEMS_ACTION_FAIL,
    payload: message,
  };
};

export const itemsActionStarted = () => {
  return {
    type: ITEMS_ACTION_STARTED,
  };
};

export const deleteItem = (id) => {
  return async () => {
    store.dispatch(itemsActionStarted());
    const response = await API.delete(`/items/${id}`, {
      headers: {
        authorization: getAccessToken(),
      },
    });
    if (!response.data.item) {
      store.dispatch(itemsActionFail(response.data.message));
    } else {
      const { items } = store.getState().items;
      const newItems = items.filter((item) => item._id !== id);
      store.dispatch(setItemsSuccess(newItems));
    }
  };
};

export const addItem = (item, e) => {
  return async () => {
    store.dispatch(itemsActionStarted());
    const response = await API.post(`/items`, item, {
      headers: { authorization: getAccessToken() },
    });
    if (!response.data.item) {
      store.dispatch(itemsActionFail(response.data.message));
      notification["error"]({
        message: response.data.message,
      });
    } else {
      store.dispatch(addItemSuccess(response.data.item));
      e.target.reset();
    }
  };
};

// Thunk function
export async function fetchItems(dispatch) {
  dispatch(itemsActionStarted());
  const response = await API.get("/items");
  if (response.data.message) {
    dispatch(itemsActionFail(response.data.message));
  } else {
    dispatch(setItemsSuccess(response.data));
  }
}
