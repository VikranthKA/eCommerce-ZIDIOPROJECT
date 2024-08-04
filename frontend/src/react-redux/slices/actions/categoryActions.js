import {CREATE_CATEGORY, EDIT_CATEGORY_ID, FETCH_CATEGORIES_FAILURE, GET_ALL_CATEGORY, REMOVE_CATEGORY_EDIT_ID, SET_CATEGORIES, SET_CREATED_CATEGORIES } from "../../constants/constantTypes";

export const getAllCategory = () => {
    return {
        type: GET_ALL_CATEGORY
    };
};

export const createCategory = (data) => {
    return {
        type: CREATE_CATEGORY,
        payload:data
    }
}

export const setCreatedData = (data)=>{
    return{
        type:SET_CREATED_CATEGORIES,
        payload:data
    }
}



export const setCategories=(categories)=>{
    console.log("in set Category",categories)
   return {
    type:SET_CATEGORIES,
    payload:categories
}
}

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

