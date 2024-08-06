import { combineReducers } from "redux";
import countReducers from "../slices/reducers/countReducers";
import userReducers from "../slices/reducers/userReducer";
import categoryReducers from "../slices/reducers/categoryReducer";
import productReducers from "../slices/reducers/productReducers";


const rootReducer = combineReducers({
    count : countReducers,
    user:userReducers,
    categories:categoryReducers,
    products:productReducers
    
})

export default rootReducer