import ReactDOM from 'react-dom';
import React from "react";
import APP from "./APP.js";
import 'scss/index.scss';
import printMe from './config/tools';

printMe();

ReactDOM.render(
    <APP/>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./config/tools', function () {
        console.log('Accepting...........................');
        printMe();
    })
}