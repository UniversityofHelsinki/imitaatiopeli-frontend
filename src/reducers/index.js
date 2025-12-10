import { combineReducers } from 'redux';
import playerReducer from "./playerReducer.js";
import userReducer from "./userReducer.js";
import promptTemplatesReducer from "./promptTemplatesReducer.js";

const reducers = {
    users: userReducer,
    players: playerReducer,
    promptTemplates: promptTemplatesReducer
};

export default combineReducers(reducers);
