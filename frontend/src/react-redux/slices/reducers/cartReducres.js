import { SET_CARTITEMS, SET_UPDATED_CART_ITEMS } from "../../constants/constantTypes"



const initialState ={
    cartItems:[]
}


const cartReducers =(state=initialState,action)=>{
    switch(action.type){
        case SET_CARTITEMS:
            return {
                ...state,
                cartItems:action.payload
            }
        // case SET_UPDATED_CART_ITEMS:
        //     return{
        //         ...state,
        //         cartItems:state.cartItems.products.map((product)=>{
        //             if(product.productId._id===action.payload.updatedproductItem._id){
        //                 if(product.quantity.sc_id===action.payload.quantity.sc._id){
        //                     return product.quantity.count += action.payload.quantity.count
        //                 }else{
        //                     return product.quantity={
        //                         sc_id:action.payload.quantity.sc._id,
        //                         count:action.payload.quantity.count
        //                     }
        //                 }
                        
        //             }else{
        //                 return product
                        
        //             }
        //         })
        //     }
        
        default:
            return state;
    }

}

export default cartReducers