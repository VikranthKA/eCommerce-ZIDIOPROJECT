import { combineReducers } from "redux";
import countReducers from "../slices/reducers/countReducers";
import userReducers from "../slices/reducers/userReducer";
import categoryReducers from "../slices/reducers/categoryReducer";
import productReducers from "../slices/reducers/productReducers";
import profileReducers from "../slices/reducers/profileReducer";
import cartReducers from "../slices/reducers/cartReducres";
import adminReducer from "../slices/reducers/adminReducer";


const rootReducer = combineReducers({
    count: countReducers,
    user: userReducers,
    profile: profileReducers,
    cart: cartReducers,
    categories: categoryReducers,
    products: productReducers,
    admin: adminReducer

})

export default rootReducer