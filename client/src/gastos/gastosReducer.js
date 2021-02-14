import {
  GASTOS_ACTION_FAIL,
  GASTOS_ACTION_STARTED,
  ADD_GASTO_SUCCESS,
  SET_GASTOS_SUCCESS,
} from "actions/types";

const initialState = {
  gastos: [],
  loading: false,
  error: null,
};

export const GastosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_GASTO_SUCCESS:
      return {
        loading: false,
        error: null,
        gastos: [payload, ...state.gastos],
      };

    case SET_GASTOS_SUCCESS:
      return {
        loading: false,
        error: null,
        gastos: payload,
      };

    case GASTOS_ACTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GASTOS_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
