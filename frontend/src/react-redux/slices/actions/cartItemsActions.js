import { EMPTY_USER_CART, GET_ALL_CARTITEMS_SAGA, REMOVE_PRODUCT_FROM_CART_SAGA, SET_CARTITEMS, SET_REMOVED_PRODUCT_FROM_CART, SET_UPDATED_USER_PROFILE, UPDATE_CART_ITEMS_SAGA } from "../../constants/constantTypes";

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

export const removeProductFromCart = (productId)=>{
    console.log(productId,"pid")
    return{
    type:REMOVE_PRODUCT_FROM_CART_SAGA,
    payload:productId 
    
}
}

export const setRemovedProductFromCart =(data)=>({
    type:SET_REMOVED_PRODUCT_FROM_CART,
    payload:data
})

export const emptyUserCart = ()=>({
    type:EMPTY_USER_CART
})




