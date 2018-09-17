import ReactDOM from 'react-dom';
import React from "react";
import {AppContainer} from "react-hot-loader";
import App from "./APP.js";
import 'scss/index.scss';

ReactDOM.render(
    <AppContainer><App/></AppContainer>,
    document.getElementById('root')
);

//react-hot-loader热更新使用
if (module.hot) {
    module.hot.accept()
}