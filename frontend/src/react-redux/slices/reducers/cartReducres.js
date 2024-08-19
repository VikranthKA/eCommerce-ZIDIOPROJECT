import { EMPTY_USER_CART, SET_CARTITEMS, SET_REMOVED_PRODUCT_FROM_CART, SET_UPDATED_CART_ITEMS } from "../../constants/constantTypes"



const initialState ={
    cartItems:{
        _id:"",
        userId:null,
        updatedAt:"",
        createdAt:"",



    }
}


const cartReducers =(state=initialState,action)=>{
    switch(action.type){
        case SET_CARTITEMS:
            return {
                ...state,
                cartItems:{
                    ...state.cartItems,
                    ...action.payload
                }
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
        case SET_REMOVED_PRODUCT_FROM_CART:
            console.log(action.payload.productId
                ,"reducer")
            return {
                ...state,
                cartItems:{
                    ...state.cartItems,
                   products: state.cartItems.products.filter(product=>product.productId._id!==action.payload.productId)

                }
            }
        case EMPTY_USER_CART:
            return {
                ...state,
                cartItems:[]
            }
        
        default:
            return state;
    }

}

export default cartReducers