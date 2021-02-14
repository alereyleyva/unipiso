import {
  USERS_ACTION_STARTED,
  USERS_ACTION_FAIL,
  LOAD_USERS_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "actions/types";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const UsersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        users: [...state.users, payload],
      };
    case LOAD_USERS_SUCCESS:
      return {
        users: payload,
        loading: false,
        error: null,
      };
    case USERS_ACTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case USERS_ACTION_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
