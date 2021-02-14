import {
  LOAD_USERS_SUCCESS,
  REGISTER_USER_SUCCESS,
  USERS_ACTION_FAIL,
  USERS_ACTION_STARTED,
} from "actions/types";
import { store } from "store/store";
import API from "api";
import { notification } from "antd";

export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };
};

export const loadUsersSuccess = (users) => {
  return {
    type: LOAD_USERS_SUCCESS,
    payload: users,
  };
};

export const usersActionStarted = () => {
  return {
    type: USERS_ACTION_STARTED,
  };
};

export const usersActionFail = (message) => {
  return {
    type: USERS_ACTION_FAIL,
    payload: message,
  };
};

export const registerUser = (data, e) => {
  return async () => {
    store.dispatch(usersActionStarted());
    const response = await API.post("/users/register", data);
    if (response.data.user) {
      store.dispatch(registerUserSuccess(response.data.user));
      e.target.reset();
      notification["success"]({
        message: response.data.message,
      });
    } else {
      store.dispatch(usersActionFail(response.data.message));
      notification["error"]({
        message: response.data.message,
      });
    }
  };
};

// Thunk function
export async function fetchUsers(dispatch) {
  dispatch(usersActionStarted());
  const response = await API.get("/users");
  if (response.data.message) {
    dispatch(usersActionFail(response.data.message));
  } else {
    dispatch(loadUsersSuccess(response.data));
  }
}
