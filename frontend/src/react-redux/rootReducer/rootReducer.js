import { combineReducers } from "redux";
import countReducers from "../slices/reducers/countReducers";


const rootReducer = combineReducers({
    count : countReducers
    
})

export default rootReducer