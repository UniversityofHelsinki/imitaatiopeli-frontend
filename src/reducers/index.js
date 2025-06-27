import { combineReducers } from 'redux';
import playerReducer from "./playerReducer.js";
import userReducer from "./userReducer.js";

const reducers = {
    users: userReducer,
    players: playerReducer,
};

export default combineReducers(reducers);
