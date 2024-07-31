import { combineReducers } from "redux";
import countReducers from "../slices/reducers/countReducers";
import userReducers from "../slices/reducers/userReducer";
import categoryReducers from "../slices/reducers/categoryReducer";


const rootReducer = combineReducers({
    count : countReducers,
    user:userReducers,
    category:categoryReducers
    
})

export default rootReducer