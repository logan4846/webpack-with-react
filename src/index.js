import ReactDOM from 'react-dom';
import React from "react";
import App from "./APP.js";
import 'scss/index.scss';
import { Provider } from "react-redux";
import store from "./redux_config/store";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);