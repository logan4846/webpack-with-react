import ReactDOM from 'react-dom';
import React from "react";
import {AppContainer} from "react-hot-loader";
import { Provider } from "react-redux";
import App from "./APP.js";
import 'scss/index.scss';
import store from "./redux_config/store";

debugger;

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

//react-hot-loader热更新使用
if (module.hot) {
    module.hot.accept()
}