import {ERROR_IN_PRODUCTS, SET_ALL_PRODUCTS, SET_CREATED_PRODUCT, SET_CREATED_REVIEW_FOR_PRODUCT, SET_DELETED_PRODUCT, SET_UPDATED_PRODUCT, SET_UPDATED_REVIEW_FOR_PRODUCT} from "../../constants/constantTypes"



const initialState = {
    products:[{
        reviews:[]
    }

    ],
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
                        return {
                            ...product,
                            ...action.payload.data
                        }
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
            case SET_CREATED_REVIEW_FOR_PRODUCT:
                return {
                    ...state,
                    products: state.products.map((product) => {
                        if (product._id === action.payload.productId) {
                            return {
                                ...product,  
                                reviews: action.payload.reviews 
                            };
                        } else {
                            return product;
                        }
                    })
                };
            

        case SET_UPDATED_REVIEW_FOR_PRODUCT:
            return{
                ...state,
                products:state.products.map((product)=>{
                    if(product._id===action.payload.productId){
                        return{
                            ...product,
                            reviews:product.reviews.map((review)=>{
                                console.log(review.reviewId._id,action.payload.review._id,"review")
                                if(review.reviewId._id===action.payload.review._id){
                                    console.log( action.payload.review,"BE")
                                    
                                    return action.payload.review
                                }else{
                                    console.log(review,"FE")
                                    return review
                                }
                        })
                        }

                        
                    }else{
                        return product;
                    }
                })

            }
        
        default:
            return state;
    }

}

export default productReducers