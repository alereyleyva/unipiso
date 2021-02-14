import React from "react";
import AppRouter from "routing/AppRouter";
import { Provider } from "react-redux";
import { fetchGastos } from "gastos/gastosActions";
import { fetchItems } from "items/itemsActions";
import { fetchUsers } from "users/usersActions";
import { checkAuth, loadAuth } from "auth/authActions";
import { store } from "store/store";

// Loading initial state
let auth = checkAuth();
store.dispatch(loadAuth(auth));
store.dispatch(fetchGastos);
store.dispatch(fetchItems);
store.dispatch(fetchUsers);

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
