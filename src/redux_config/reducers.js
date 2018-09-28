import { combineReducers } from "redux";
import Login from './reducers/Login';
import Home from './reducers/Home';

export default combineReducers({ Login,Home });