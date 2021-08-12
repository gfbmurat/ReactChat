import { combineReducers } from "redux";
import counterReducer from './counterReducer'
import userReducer from './userReducer'
import channelReducer from "./channelReducer";
import { reducer as firebase } from 'react-redux-firebase'

const rootReducer = combineReducers({
    firebase,
    counterReducer,
    userReducer,
    channelReducer
})

export default rootReducer;