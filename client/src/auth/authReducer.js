import {
  LOAD_AUTH,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ACTION_STARTED,
  AUTH_ACTION_FAIL,
} from "actions/types";

const initialState = {
  user: null,
  logged: false,
  loading: false,
  error: null,
};

export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        user: payload,
        logged: true,
        loading: false,
        error: null,
      };

    case LOGOUT:
      return {
        user: null,
        logged: false,
        loading: false,
        error: null,
      };

    case LOAD_AUTH:
      return {
        user: payload.user,
        logged: payload.logged,
        loading: false,
        error: false,
      };

    case AUTH_ACTION_STARTED:
      return {
        ...state,
        loading: true,
      };

    case AUTH_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
