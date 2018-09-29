import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import log from './logMiddleware';

export default createStore(
    rootReducer,
    applyMiddleware(log,thunk.withExtraArgument({
        getUsers:'http://localhost:3000/users/1'
    }))
);

//createStore(reducer,preloadState,enhancer)
/*
reducer : 使用的reducers
preloadState:初始时的state，*****可选
enhancer:是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。
当preloadState不指定时，第二个参数为enhancer
下面是createStore源码片段：
 if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
* */

//不带参数使用    applyMiddleware(thunk)
//带额外参数使用  applyMiddleware(thunk.withExtraArgument(api))