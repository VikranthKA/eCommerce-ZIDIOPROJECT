import { GET_ALL_CARTITEMS_SAGA, SET_CARTITEMS } from "../../constants/constantTypes";

export const getAllCartItems=()=>({
    type:GET_ALL_CARTITEMS_SAGA
})

export const setAllCartItems=(cartItems)=>({
    type:SET_CARTITEMS,
    payload:cartItems
})