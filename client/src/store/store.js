import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "auth/authReducer";
import { GastosReducer } from "gastos/gastosReducer";
import { UsersReducer } from "users/usersReducer";
import { ItemsReducer } from "items/itemsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const AppReducers = combineReducers({
  auth: AuthReducer,
  gastos: GastosReducer,
  users: UsersReducer,
  items: ItemsReducer,
});

export const store = createStore(
  AppReducers,
  composeEnhancers(applyMiddleware(thunk))
);
