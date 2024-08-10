import { SET_CARTITEMS } from "../../constants/constantTypes"



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
        
        default:
            return state;
    }

}

export default cartReducers