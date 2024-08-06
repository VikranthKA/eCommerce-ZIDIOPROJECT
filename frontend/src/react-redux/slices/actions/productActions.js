import { ERROR_IN_PRODUCTS, GET_ALL_PRODUCTS, SET_ALL_PRODUCTS } from "../../constants/constantTypes"


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



