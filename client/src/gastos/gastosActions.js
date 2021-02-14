import {
  ADD_GASTO_SUCCESS,
  GASTOS_ACTION_FAIL,
  GASTOS_ACTION_STARTED,
  SET_GASTOS_SUCCESS,
} from "../actions/types";
import API from "api";
import { store } from "store/store";
import { getAccessToken } from "auth/authService";
import { notification } from "antd";
import { fetchUsers } from "users/usersActions";

export const addGastoSuccess = (gasto) => {
  return {
    type: ADD_GASTO_SUCCESS,
    payload: gasto,
  };
};

export const setGastosSuccess = (gastos) => {
  return {
    type: SET_GASTOS_SUCCESS,
    payload: gastos,
  };
};

export const gastosActionFail = (message) => {
  return {
    type: GASTOS_ACTION_FAIL,
    payload: message,
  };
};

export const gastosActionStarted = () => {
  return {
    type: GASTOS_ACTION_STARTED,
  };
};

export const deleteGasto = (id) => {
  return async () => {
    store.dispatch(gastosActionStarted());
    const response = await API.delete(`/gastos/${id}`, {
      headers: {
        authorization: getAccessToken(),
      },
    });
    if (response.data.error) {
      store.dispatch(gastosActionFail(response.data.error));
    } else {
      const { gastos } = store.getState().gastos;
      const newGastos = gastos.filter((gasto) => gasto._id !== id);
      store.dispatch(setGastosSuccess(newGastos));
      store.dispatch(fetchUsers);
    }
  };
};

export const addGasto = (gasto, e, setEspecifico) => {
  return async () => {
    store.dispatch(gastosActionStarted());
    const response = await API.post(`/gastos`, gasto, {
      headers: { authorization: getAccessToken() },
    });
    if (!response.data.gasto) {
      store.dispatch(gastosActionFail(response.data.message));
      notification["error"]({
        description: response.data.message,
      });
    } else {
      store.dispatch(addGastoSuccess(response.data.gasto));
      store.dispatch(fetchUsers);
      e.target.reset();
      setEspecifico(false);
    }
  };
};

// Thunk function
export async function fetchGastos(dispatch) {
  dispatch(gastosActionStarted());
  const response = await API.get("/gastos");
  if (response.data.message) {
    dispatch(gastosActionFail(response.data.message));
  } else {
    dispatch(setGastosSuccess(response.data));
  }
}
