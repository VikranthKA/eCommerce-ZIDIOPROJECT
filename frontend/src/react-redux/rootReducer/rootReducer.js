import { combineReducers } from "redux";
import countReducers from "../slices/reducers/countReducers";
import userReducers from "../slices/reducers/userReducer";


const rootReducer = combineReducers({
    count : countReducers,
    user:userReducers
    
})

export default rootReducer