// actions/adminActions.js

import { GET_ALL_ORDERS_FOR_ADMIN, GET_ALL_USERS_FOR_ADMIN, SET_ALL_ORDERS_FOR_ADMIN, SET_ALL_USERS_FOR_ADMIN, SET_UPDATED_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN, UPDATE_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN } from "../../constants/constantTypes";
//users
export const fetchAllUsersForAdmin = () => ({
  type: GET_ALL_USERS_FOR_ADMIN
});

export const setAllUsersForAdmin = (users) => {
  console.log(users, "users action")
  return {

    type: SET_ALL_USERS_FOR_ADMIN,
    payload: users
  }
};

//order get
export const fetchAllOrdersforAdmin = () => ({
  type: GET_ALL_ORDERS_FOR_ADMIN
});

export const setAllOrdersforAdmin = (orders) => {

  return {

    type: SET_ALL_ORDERS_FOR_ADMIN,
    payload: orders
  }
};

//order deliveryStatusUpdate

export const fetchUpdateDeliveryStatus = (orderId,deliveryStatus) =>{
  
   return{
  type: UPDATE_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN,
  payload:{orderId,deliveryStatus}
};
}

export const setUpdateDeliveryOrderForCustomerByAdmin = (orderId,deliveryType) => {
   return {
    
  type: SET_UPDATED_DELIVERY_ORDER_FOR_CUSTOMER_BY_ADMIN,
  payload:{
    orderId,
    deliveryType
  }
}};
