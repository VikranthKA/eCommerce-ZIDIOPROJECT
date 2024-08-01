import { CATEGORY_ERROR, GET_ALL_CATEGORY } from "../../constants/constantTypes";

export const getAllCategory=()=>({
    type:GET_ALL_CATEGORY,
})

export const  fetchCategoriesFailure=(error)=>({
    type:CATEGORY_ERROR,
    payload:error
})

