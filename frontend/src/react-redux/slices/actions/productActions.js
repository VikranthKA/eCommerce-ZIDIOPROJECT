import { ADD_CREATE_PRODUCT_SAGA, DELETE_PRODUCT_SAGA, EDIT_CREATED_PRODUCT_ID, ERROR_IN_PRODUCTS, GET_ALL_PRODUCTS, REMOVE_EDIT_PRODUCT_ID, SET_ALL_PRODUCTS, SET_CREATED_PRODUCT, SET_DELETED_PRODUCT, SET_UPDATED_PRODUCT, UPDATE_CREATED_PRODUCT_SAGA } from "../../constants/constantTypes"


export const getAllProducts = () => ({
    type: GET_ALL_PRODUCTS
})


export const setAllProducts = (data) => ({
    type: SET_ALL_PRODUCTS,
    payload: data
})

export const errorInProduct = (error) => ({
    type: ERROR_IN_PRODUCTS,
    payload: error
})

export const createNewProduct = (product)=>({
    type:ADD_CREATE_PRODUCT_SAGA,
    payload:product
})

export const setCreatedProduct = (product)=>({
    type:SET_CREATED_PRODUCT,
    payload:product
})

export const productEditId = (_id)=>({
    type:EDIT_CREATED_PRODUCT_ID,
    payload:_id
})

export const removeProductEditId = ()=>({
    type:REMOVE_EDIT_PRODUCT_ID,

})

export const updateProductSaga=(product,_id)=>({
    type:UPDATE_CREATED_PRODUCT_SAGA,
    payload:{
        product,
        _id
    }
})

export const setUpdatedProduct=(product)=>({
    type:SET_UPDATED_PRODUCT,
    payload:product
})

export const deleteProduct=(productId)=>({
    type:DELETE_PRODUCT_SAGA
})

export const removeDeleteProduct=(productId)=>({
    type:SET_DELETED_PRODUCT
})



