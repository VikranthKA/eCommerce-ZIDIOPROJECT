import {  SET_ALL_ORDERS_FOR_ADMIN, SET_ALL_USERS_FOR_ADMIN, SET_UPDATED_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN } from "../../constants/constantTypes";

const initialState = {
    allUser: [],
    analytics: [],
    orders: []
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
            return {
                ...state,
                orders: action.payload
            }
        case SET_UPDATED_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN:
            console.log(action.payload,"pay")
            return {
                ...state,
                orders: state.orders.map((order) => {
                    if (order._id === action.payload.orderId) {
                        return {
                            ...order,
                            deliveryStatus: action.payload.deliveryType
                        }
                    }
                    return order

                })
            }
        default:
            return state;
    }
};

export default adminReducer;
