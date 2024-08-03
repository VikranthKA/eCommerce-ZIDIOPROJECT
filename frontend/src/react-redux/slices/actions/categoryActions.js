import {EDIT_CATEGORY_ID, FETCH_CATEGORIES_FAILURE, GET_ALL_CATEGORY, REMOVE_CATEGORY_EDIT_ID, SET_CATEGORIES } from "../../constants/constantTypes";

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

export const getCategoryIdForEdit = (_id)=>({
    type:EDIT_CATEGORY_ID,
    payload:_id
})

export const removeCategoryIdForEdit =()=>({
    type:REMOVE_CATEGORY_EDIT_ID,
    
})

