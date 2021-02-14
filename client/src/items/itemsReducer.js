import {
  ADD_ITEM_SUCCESS,
  SET_ITEMS_SUCCESS,
  ITEMS_ACTION_FAIL,
  ITEMS_ACTION_STARTED,
} from "actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const ItemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_SUCCESS:
      return {
        loading: false,
        error: null,
        items: [...state.items, payload],
      };

    case SET_ITEMS_SUCCESS:
      return {
        items: payload,
        loading: false,
        error: null,
      };

    case ITEMS_ACTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ITEMS_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
