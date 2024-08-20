import { CREATE_REVIEW_FOR_PRODUCT_SAGA, DELETE_REVIEW_FOR_PRODUCT_SAGA, SET_CREATED_REVIEW_FOR_PRODUCT, SET_DELETED_REVIEW_FOR_PRODUCT, SET_UPDATED_REVIEW_FOR_PRODUCT, UPDATE_REVIEW_FOR_PRODUCT_SAGA } from "../../constants/constantTypes"


export const createReviewForProductAction=(formData,productId)=>({
    type:CREATE_REVIEW_FOR_PRODUCT_SAGA,
    payload:{
        formData,
        productId
    }
})


export const setCreatedReviewForProduct=(reviews,productId)=>({
    type:SET_CREATED_REVIEW_FOR_PRODUCT,
    payload:{
        reviews,
        productId
    }
})




export const updateReviewForProductAction=(formData,productId,reviewId)=>({
    type:UPDATE_REVIEW_FOR_PRODUCT_SAGA,
    payload:{
        formData,
        productId,
        reviewId
    }
})

export const setUpdatedReviewForProduct=(review,productId,reviewId)=>({
    type:SET_UPDATED_REVIEW_FOR_PRODUCT,
    payload:{
        review,
        productId,
        reviewId
    }
})





export const deleteReviewForProductAction=(productId,reviewId)=>({
    type:DELETE_REVIEW_FOR_PRODUCT_SAGA,
    payload:{
        productId,
        reviewId
    }
})

export const setDeletedReviewForProduct=(productId,reviewId)=>({
    type:SET_DELETED_REVIEW_FOR_PRODUCT,
    payload:{
        productId,
        reviewId
    }
})



