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

//不带参数使用    applyMiddleware(thunk)
//带额外参数使用  applyMiddleware(thunk.withExtraArgument(api))