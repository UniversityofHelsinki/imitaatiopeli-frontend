import { combineReducers } from 'redux';
import userReducer from "./userReducer.js";

const reducers = {
    users: userReducer,
};

export default combineReducers(reducers);
