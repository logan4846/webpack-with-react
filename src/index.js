import ReactDOM from 'react-dom';
import React from "react";
import App from "./APP.js";
import 'scss/index.scss';
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider>
        <App/>
    </Provider>,
    document.getElementById('root')
);