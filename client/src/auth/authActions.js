import { AccessToken } from "users/userConstants";
import API from "api";
import { store } from "store/store";
import {
  LOGOUT,
  AUTH_ACTION_STARTED,
  AUTH_ACTION_FAIL,
  LOAD_AUTH,
  LOGIN_SUCCESS,
} from "../actions/types";
import { decodeToken, getAccessToken } from "auth/authService";
import { notification } from "antd";

export const loginSuccess = (tokens) => {
  localStorage.setItem(AccessToken, tokens.AccessToken);
  const user = decodeToken(tokens.AccessToken);
  return {
    payload: user,
    type: LOGIN_SUCCESS,
  };
};

export const login = (values, history, e) => {
  return async () => {
    store.dispatch(authActionStarted());
    const response = await API.post("/users/login", values);
    if (!response.data.message) {
      store.dispatch(loginSuccess(response.data));
      history.replace("/user");
      e.target.reset();
    } else {
      store.dispatch(authActionFail(response.data.message));
      notification["error"]({
        message: response.data.message,
      });
    }
  };
};

export const authActionFail = (message) => {
  return {
    type: AUTH_ACTION_FAIL,
    payload: message,
  };
};

export const authActionStarted = () => {
  return {
    type: AUTH_ACTION_STARTED,
  };
};

export const logout = () => {
  localStorage.removeItem(AccessToken);
  return {
    type: LOGOUT,
  };
};

export const loadAuth = (auth) => {
  return {
    payload: auth,
    type: LOAD_AUTH,
  };
};

export const checkAuth = () => {
  let AccessToken = getAccessToken();
  if (!AccessToken) {
    return { user: null, logged: false };
  } else {
    return {
      user: decodeToken(AccessToken),
      logged: true,
    };
  }
};
