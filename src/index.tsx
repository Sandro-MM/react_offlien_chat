import* as React from "react";
import * as ReactDOM from "react-dom/client";
import "./styles/index.css";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

