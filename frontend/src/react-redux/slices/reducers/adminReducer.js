import { GET_ALL_USERS_FOR_ADMIN, SET_ALL_ORDERS_FOR_ADMIN, SET_ALL_USERS_FOR_ADMIN } from "../../constants/constantTypes";

const initialState = {
    allUser: [],
    analytics: [],
    orders:[]
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ALL_USERS_FOR_ADMIN:
            console.log(action.payload, "set pay")
            return {
                ...state,
                allUser: action.payload,
            };
        case SET_ALL_ORDERS_FOR_ADMIN:
            return{
                ...state,
                orders:action.payload
            }
        default:
            return state;
    }
};

export default adminReducer;
