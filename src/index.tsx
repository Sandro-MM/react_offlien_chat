import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store';

import { HashRouter } from 'react-router-dom';
import App from "./App";

const rootElement = document.getElementById('root');

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <HashRouter>
                    <App />
                </HashRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    rootElement
);
