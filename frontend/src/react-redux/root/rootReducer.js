import { combineReducers } from "redux";
import countReducers from "../slices/reducers/countReducers";
import userReducers from "../slices/reducers/userReducer";
import categoryReducers from "../slices/reducers/categoryReducer";
import productReducers from "../slices/reducers/productReducers";
import profileReducers from "../slices/reducers/profileReducer";


const rootReducer = combineReducers({
    count : countReducers,
    user:userReducers,
    profile:profileReducers,
    categories:categoryReducers,
    products:productReducers
    
})

export default rootReducer