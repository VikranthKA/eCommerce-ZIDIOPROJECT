import {ERROR_IN_PRODUCTS, SET_ALL_PRODUCTS, SET_CREATED_PRODUCT, SET_DELETED_PRODUCT, SET_UPDATED_PRODUCT} from "../../constants/constantTypes"



const initialState = {
    products:[],
    productError:null,
    productEditId:null,

}


const productReducers =(state=initialState,action)=>{
    switch(action.type){
        case ERROR_IN_PRODUCTS:
            return{
                ...state,
                productError:action.payload
            }
        case SET_ALL_PRODUCTS:
            return{
                ...state,
                products:action.payload
            }
        case SET_CREATED_PRODUCT:
            return {
                ...state,
                products:[action.payload,...state.products]
            }
        case SET_UPDATED_PRODUCT:
            return {
                ...state,
                products:state.products.map((product)=>{
                    if(product._id===action.payload.data._id){
                        return product
                    }else{
                        return product
                    }
                }),
                productEditId:null
            }
        case SET_DELETED_PRODUCT:
            return {
                ...state,
                products:state.products.filter((product)=>product._id!==action.payload.product._id),
                
            }
        default:
            return state;
    }

}

export default productReducers