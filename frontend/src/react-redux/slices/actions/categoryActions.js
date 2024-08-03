import {FETCH_CATEGORIES_FAILURE, GET_ALL_CATEGORY, SET_CATEGORIES } from "../../constants/constantTypes";

export const getAllCategory=()=>({
    type:GET_ALL_CATEGORY,
})


export const setCategories=(categories)=>({
    type:SET_CATEGORIES,
    payload:categories
})

export const  fetchCategoriesFailure=(error)=>({
    type:FETCH_CATEGORIES_FAILURE,
    payload:error
})

