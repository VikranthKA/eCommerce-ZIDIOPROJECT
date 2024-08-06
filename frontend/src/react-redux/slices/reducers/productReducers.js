import {SET_ALL_PRODUCTS} from "../../constants/constantTypes"



const initialState ={
    products:[],
    productError:null,
    productEditId:null,

}


const productReducers =(state=initialState,action)=>{
    switch(action.type){
        case SET_ALL_PRODUCTS:
            return{
                ...state,
                products:action.payload
            }

        default:
            return state;
    }

}

export default productReducers