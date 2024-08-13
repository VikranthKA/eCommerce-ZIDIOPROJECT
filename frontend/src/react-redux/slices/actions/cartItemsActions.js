import { GET_ALL_CARTITEMS_SAGA, SET_CARTITEMS, UPDATE_CART_ITEMS_SAGA } from "../../constants/constantTypes";

export const getAllCartItems=()=>({
    type:GET_ALL_CARTITEMS_SAGA
})

export const setAllCartItems=(cartItems)=>({
    type:SET_CARTITEMS,
    payload:cartItems
})

export const updateCartItems = (productId,sc_id,count)=>{
    return {
        type:UPDATE_CART_ITEMS_SAGA,
        payload:{
            productId,sc_id,count
        }
    }

}
